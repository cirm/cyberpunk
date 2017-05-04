const expect = require('chai').expect;
const _ = require('lodash');
const Promise = require('bluebird');
const sinon = require('sinon');
const sessions = require('../../src/models/sessionModel');

describe('Sessions', () => {
  afterEach((done) => {
    sessions.onlineUsers.length = 0;
    done();
  });
  it('should be able to log new people in', async () => {
    await _.times(10000, n => sessions.addUserOnline(n, n, n));
    return expect(sessions.onlineUsers.length).to.equal(10000);
  });
  it('should be able to get user by socketID', async () => {
    await _.times(10000, n => sessions.addUserOnline(n, n, { id: n }));
    const socketId = 8;
    const user = await sessions.getUserBySocket(socketId);
    return expect(user.userId).to.equal(8);
  });
  it('should be able to update socketId for the same user', async () => {
    await _.times(10000, n => sessions.addUserOnline(n, n, { id: n, emit: () => true }));
    let user = await sessions.getUserBySocket(8);
    const emit = sinon.stub(user.socket, 'emit');
    await sessions.addUserOnline(8, 8, { id: 16, emit: () => true });
    user = await sessions.getUserBySocket(16);
    expect(user.userId).to.equal(8);
    sinon.assert.calledWith(emit, 'LOGOUT');
    return emit.restore();
  });
  it('should be able to sign off user', async () => {
    await _.times(10000, n => sessions.addUserOnline(n, n, { id: n }));
    const socketId = 7;
    const user = await sessions.getUserBySocket(socketId);
    await sessions.userSignOff(user.userId);
    expect(sessions.onlineUsers.length).to.equal(9999);
    const deleted = await _.find(sessions.onlineUsers, { userId: user.userId });
    return expect(deleted).to.equal(undefined);
  });
  it('should be able to show online users', async () => {
    await _.times(10000, n => sessions.addUserOnline(n, n, { id: n }));
    const users = sessions.getOnlineUsers();
    return expect(users.length).to.equal(10000);
  });
});
