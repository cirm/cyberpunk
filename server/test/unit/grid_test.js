const expect = require('chai').expect;
const gridModel = require('../../src/models/gridModel');

describe('Grid', () => {
  it('presents grid state', async() => {
    const grid = await gridModel.createGrid();
    const state = await gridModel.getState();
    //console.log(state);
    //console.log(state);
    console.log(gridModel.gameGrid);
  })
});
