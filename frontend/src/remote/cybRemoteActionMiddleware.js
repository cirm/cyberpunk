const tokenKey = 'deckerToken';

export default socket => store => next => action => {
  if (action.meta && action.meta.auth) {
    socket.emit(action.type, action.data);
  } else if (action.meta && action.meta.remote) {
    socket.emit(action.type, action.data);
  } else if (action.meta && action.meta.decker) {
    const token = JSON.parse(localStorage.getItem(tokenKey));
    if (!token) {
      return next(action);
    }
    if (!action.data) {
      action.data = {};
    }
    action.data.token = `Bearer ${token}`;
    socket.emit(action.type, action.data);
  }
  return next(action);
};
