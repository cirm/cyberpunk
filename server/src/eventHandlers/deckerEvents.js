const db = require('../db/postgres');
const events = require('../constants');
const sessions = require('../models/sessionModel');
const logger = require('../utilities/winston');

/**
 * On new chat message, handle the propagation to other clients and saving to datastore
 *
 * @param {Object.<string>} textObject - Message from the client w. parameters
 * @param {Socket} socket - Socket connection that sent the message
 * @param {Socket} socket.broadcast - Broadcasts message event to all clients
 */
const handleNewMessage = async (textObject, socket) => {
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
  socket.broadcast.emit(events.GET_MESSAGE, data);
};

/**
 * Event controller for querying general chat history
 *
 * @param {Socket} socket - Socket connection that listening for the response event.
 */
const queryHistory = async (socket) => {
  const history = await db.queryFunction('decker.get_chat_history');
  socket.emit(events.SET_CHAT_HISTORY, history[0].get_chat_history);
};

/**
 * Adds listeners on specific events to the given socket
 *
 * @param {Socket} socket - Socket to add the event listeners
 */
const attachEvents = (socket) => {
  socket.on(events.SEND_MESSAGE, data => handleNewMessage(data, socket));
  socket.on(events.GET_CHAT_HISTORY, () => queryHistory(socket));
};

module.exports = {
  attachEvents,
};
