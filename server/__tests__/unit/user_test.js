const expect = require('chai').expect;
const users = require('../../src/models/userModel');
const sinon = require('sinon');

describe('Users', () => {
  it('sanitizeDbUser should handle undefined', () => {
    expect(users.sanitizeDbUser()).to.deep.equal({
      id: '',
      username: '',
      display: '',
      roles: '',
      password: '',
    });
});
it('sanitizeDbUser should handle random data', () => {
  expect(users.sanitizeDbUser({
    random: 'ermgh',
    geerr: 'ddg',
  })).to.deep.equal({
    id: '',
    username: '',
    display: '',
    roles: '',
    password: '',
  });
});
it('populateUser with missing', async () => {
  const db = {
    queryFunction: () => [{ get_player_data: null }],
  };
  try {
    await users.populateUser(undefined, db);
  } catch (e) {
    return expect(e.toString()).to.equal('Error: No record of user: skiddle');
  }
});
it('populateUser with correct data', async () => {
  const db = {
    queryFunction: () => [{ get_player_data: [{ id: 1, username: 2, roles: 3, password: 4 }] }],
  };
  const result = await users.populateUser(undefined, db);
  return expect(result).to.deep.equal({ id: 1, username: 2, display: '', roles: 3, password: '' });
});
it('authenticate with missing user', async () => {
  const result = await users.authenticate();
  return expect(result).to.equal(false);
});
it('authenticate with missing user.username', async () => {
  const result = await users.authenticate({});
  return expect(result).to.equal(false);
});
it('authenticate with missing user.password', async () => {
  const populate = sinon.stub(users, 'populateUser');
  populate.yields({ password: 'whee' });
  const result = await users.authenticate({ username: 'whee', password: 'whee' }, 'whee');
  expect(result).to.equal(false);
  return populate.restore();
});
it('authenticate with missing db', async () => {
  try {
    await users.authenticate({ username: 1 }, 2);
  } catch (e) {
    return expect(e.toString()).to.equal('Error: Missing database');
  }
});
it('authenticate user with wrong PW', async () => {
  const state = await users.authenticate({ username: 'whee', password: 'whee' }, 'whee');
  return expect(state).to.equal(false);
});
})
;
