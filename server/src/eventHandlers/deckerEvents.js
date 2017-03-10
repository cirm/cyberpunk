const db = require('../db/postgres');
const events = require('../constants');
const sessions = require('../models/sessionModel');
const logger = require('../utilities/winston');

const handleNewMessage = async(textObject, socket) => {
  const data = {};
  data.text = textObject.text;
  data.timestamp = new Date();
  const decker = await sessions.getUserBySocket(socket.id);
  if (decker) {
    try {
      await db.queryFunction(
        'decker.insert_chat_message',
        [data.text, data.timestamp, decker.userId]);
      data.decker = decker.username;
    } catch (e) {
      logger.error(e.stack);
    }
  } else {
    data.decker = 'skiddle';
  }
  return socket.broadcast.emit(events.GET_MESSAGE, data);
};

const queryHistory = async(socket) => {
  const history = await db.queryFunction('decker.get_chat_history');
  return socket.emit(events.SET_CHAT_HISTORY, history[0].get_chat_history);
};

const attachEvents = (socket) => {
  socket.on(events.SEND_MESSAGE, data => handleNewMessage(data, socket));
  socket.on(events.GET_CHAT_HISTORY, () => queryHistory(socket));
};

module.exports = {
  attachEvents,
};
