import { Map, fromJS } from 'immutable';

const updateGrid = (state, data) => {
  console.log(data);
  return state
    .set('side', fromJS(data.side))
    .set('cells', fromJS(data.cells));
};

function gridReducer(state = new Map(), action) {
  switch (action.type) {
    case 'SET_GRID_STATE':
      return updateGrid(state, action.data);
    default:
      return state;
  }
}

export default gridReducer;
