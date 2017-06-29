const expect = require('chai').expect;
const cellModel = require('../../src/models/cellModel');

describe('Cell', () => {
  it('has type', () => {
    const cell = cellModel.buildCell({ pos: 1 });
    expect(cell.type).to.equal(3);
  });
});
