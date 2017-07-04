
export const loadGrid = () => ({
  meta: { decker: true },
  type: 'GET_GRID_STATE',
});

export const populateGridData = data => ({
  type: 'SET_GRID_STATE',
  data,
});
