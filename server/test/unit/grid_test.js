const expect = require('chai').expect;
const gridModel = require('../../src/models/gridModel');

describe('Grid', () => {
  beforeEach((done) => {
    gridModel.resetGrid();
    done();
  });

  it('presents grid state', async () => {
    await gridModel.createGrid();
    const state = gridModel.getState();
    expect(state.side).to.equal(20);
    return expect(state.cells.length).to.equal(400);
  });

  it('createGrid doesn\'t overwrite state', async () => {
    await gridModel.createGrid();
    const state = gridModel.getState();
    expect(state.side).to.equal(20);
    expect(state.cells.length).to.equal(400);
    await gridModel.createGrid([{ id: '123', type: 3 }]);
    return expect(gridModel.getState()).to.equal(state);
  });

  it('createGrid creates given default grid', async () => {
    await gridModel.createGrid([
      { id: '123', type: 3 },
      { id: '124', type: 3 },
      { id: '125', type: 3 },
      { id: '126', type: 3 }]);
    const state = gridModel.getState();
    expect(state.side).to.equal(2);
    return expect(state.cells.length).to.equal(4);
  });

  it('createGrid creates given typed grid', async () => {
    const data = [
      { id: '123', type: 1 },
      { id: '124', type: 2 },
      { id: '125', type: 3 },
      { id: '126', type: 4 }];
    await gridModel.createGrid(data);
    const state = gridModel.getState();
    expect(state.side).to.equal(2);
    expect(state.cells.length).to.equal(4);
    return Object.keys(state.cells).forEach(idx =>
      expect(state.cells[idx].type).to.equal(data[idx].type));
  });

  it('Handles odd nr of data', async () => {
    const data = [
      { id: '123', type: 1 },
      { id: '123', type: 1 },
      { id: '124', type: 2 },
      { id: '125', type: 3 },
      { id: '126', type: 4 }];
    await gridModel.createGrid(data);
    const state = gridModel.getState();
    expect(state.side).to.equal(20);
    return expect(state.cells.length).to.equal(0);
  });

  it('Updates grid properly', async () => {
    const data = [
      { id: '123', type: 1 },
      { id: '124', type: 2 },
      { id: '125', type: 3 },
      { id: '126', type: 4 }];
    await gridModel.createGrid(data);
    gridModel.updateState(2, 'decker')
    const state = gridModel.getState();
    expect(state.side).to.equal(2);
    expect(state.cells.length).to.equal(4);
    expect(state.cells[2].visited).to.equal(1);
    return expect(state.cells[2].lastTracker).to.equal('decker');
  });
});
