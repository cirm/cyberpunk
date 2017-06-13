const expect = require('chai').expect;
const gridModel = require('../../src/models/gridModel');

describe('Grid', () => {
  it('Has 400 cells, when building without specific', () => {
    const grid = gridModel.buildGrid();
    expect(gridModel.getCells(grid).length).to.equal(400);
  });
});
