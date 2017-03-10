export function getOnlineDeckers() {
  return {
    type: 'GET_ONLINE',
    meta: { remote: true },
  };
}

export function populateUserList(data) {
  return {
    type: 'POPULATE_ONLINE',
    data,
  };
}