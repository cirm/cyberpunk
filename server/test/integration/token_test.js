const expect = require('chai').expect;
const io = require('socket.io-client');

const socketUrl = 'http://localhost:4545';
const options = {
  transports: ['websocket'],
  'force new connection': true,
};

const authUrl = socketUrl;
const authEvent = 'AUTHENTICATE';
const tokenEvent = 'TOKEN';
const errorEvent = 'ERROR';

describe('Token', () => {
  let token;
  before((done) => {
    const client = io.connect(authUrl, options);
    client.on('connect', () => {
      client.emit(authEvent, { username: 'bakufu', password: 'EndOria' });
      client.on(tokenEvent, response => {
        token = response.token;
        client.disconnect();
        done();
      });
    });
  });
  it('should recognise proper token', (done) => {
    const data = {};
    data.token = `Bearer ${token}`;
    const client1 = io.connect(socketUrl, options);
    client1.on('connect', () => {
      client1.emit('testing', data);
      client1.on('tested', () => {
        client1.disconnect();
        done();
      });
    });
  });
  it('should reject missing token', (done) => {
    const client1 = io.connect(socketUrl, options);
    client1.on('connect', () => {
      client1.emit('testing');
      client1.on(errorEvent, response => {
        expect(response).to.equal('Authentication error');
        client1.disconnect();
        done();
      });
    });
  });

  it('should reject wrong token format', (done) => {
    const data = {};
    data.token = `Bea1rer ${token}`;
    const client1 = io.connect(socketUrl, options);
    client1.on('connect', () => {
      client1.emit('testing', data);
      client1.on(errorEvent, response => {
        expect(response).to.equal('Authentication error');
        client1.disconnect();
        done();
      });
    });
  });
  it('should reject fake token', (done) => {
    const data = {};
    const fakeToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.' +
      'eyJpc3MiOiIiLCJpYXQiOjE0NjM2NTI0MDgsImV4cCI6MTQ5' +
      'NTE4ODQwOCwiYXVkIjoiIiwic3ViIjoiIiwidXNlcm5hbWUiOiJrdW50dW4ifQ.' +
      '24VtIPl03ltB6uFN9tqe3sWJDjApB1jW-Gd9ji5kijo';
    data.token = `Bearer ${fakeToken}`;
    const client1 = io.connect(socketUrl, options);
    client1.on('connect', () => {
      client1.emit('testing', data);
      client1.on(errorEvent, response => {
        expect(response).to.equal('Authentication error');
        client1.disconnect();
        done();
      });
    });
  });
  it('should reject tampered token', (done) => {
    const data = {};
    const tamperedToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.' +
      'eyJ1c2VybmFtZSI6InRzdW5zdW4iLCJkaXNwbGF5IjoiQmFsaXMgQXZhcm9uYSIsInJvbGVzIj' +
      'pbImFkbWluMSIsInBsYXllcjEiXSwiaWF0IjoxNDYzNjUyNTc2LCJleHAiOjE0NjM2NTYxNzZ9.' +
      'QVQqYRvzkwK8LEFbNH28-o7NIivGUZY0geby5ddbnBg';
    data.token = `Bearer ${tamperedToken}`;
    const client1 = io.connect(socketUrl, options);
    client1.on('connect', () => {
      client1.emit('testing', data);
      client1.on(errorEvent, response => {
        expect(response).to.equal('Authentication error');
        client1.disconnect();
        done();
      });
    });
  });
  it('should reject broken algorithm token', (done) => {
    const data = {};
    const tamperedToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIn0.' +
      'eyJ1c2VybmFtZSI6InRzdW5zdW4iLCJkaXNwbGF5IjoiQmFsaXMgQXZhcm9uYSIsInJvbGVzIjpbImF' +
      'kbWluIiwicGxheWVyIl0sImlhdCI6MTQ2MzY1Mjc3NCwiZXhwIjoxNDYzNjU2Mzc0fQ.' +
      '03Pjzrpcr_7mGICLmxa1-Pa6ys_mcnC5AqCJ7id7lkE';
    data.token = `Bearer ${tamperedToken}`;
    const client1 = io.connect(socketUrl, options);
    client1.on('connect', () => {
      client1.emit('testing', data);
      client1.on(errorEvent, response => {
        expect(response).to.equal('Authentication error');
        client1.disconnect();
        done();
      });
    });
  });
});
