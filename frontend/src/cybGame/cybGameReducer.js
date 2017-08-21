
const pickCell = (state, data) => {
  return state.set('loading', true);
};

const gameReducer = (state = new Map(), action) => {
  switch (action.type) {
    case 'PICK_CELL':
      return pickCell(state, action.data);
    default:
      return state;
  }
};

export default gameReducer;
