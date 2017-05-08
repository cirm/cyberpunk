const expect = require('chai').expect;
const io = require('socket.io-client');

const socketUrl = 'http://localhost:4545';
const options = {
  transports: ['websocket'],
  'force new connection': true,
};
const authenticationUrl = `${socketUrl}`;
const authEvent = 'AUTHENTICATE';
const tokenEvent = 'TOKEN';
const unauthorized = 'UNAUTHORIZED';

describe('Authentication', () => {
  it('should handle missing username', (done) => {
    const client = io.connect(authenticationUrl, options);
    client.on('connect', () => {
      client.emit(authEvent, { random: 'data' });
      client.on(unauthorized, () => {
        client.disconnect();
        done();
      });
    });
  });

  it('should handle erroneus username', (done) => {
    const client = io.connect(authenticationUrl, options);
    client.on('connect', () => {
      client.emit(authEvent, { username: 12345 });
      client.on(unauthorized, () => {
        client.disconnect();
        done();
      });
    });
  });

  it('should have capability for authentication', (done) => {
    const client = io.connect(authenticationUrl, options);
    client.on('connect', () => {
      client.emit(authEvent, { username: 'bakufu', password: 'EndOria' });
      client.on(tokenEvent, (response) => {
        expect(response).to.be.an('object');
        console.log(response.token.length);
        expect(response.token.length).to.equal(207);
        client.disconnect();
        done();
      });
    });
  });

  it('should return Unauthorized with wrong password', (done) => {
    const client = io.connect(authenticationUrl, options);
    client.on('connect', () => {
      client.emit(authEvent, { username: 'tsunsun', password: 'asd' });
      client.on(unauthorized, () => {
        client.disconnect();
        done();
      });
    });
  });

  it('should return Unauthorized when missing password', (done) => {
    const client = io.connect(authenticationUrl, options);
    client.on('connect', () => {
      client.emit(authEvent, { username: 'tsunsun' });
      client.on(unauthorized, () => {
        client.disconnect();
        done();
      });
    });
  });
});
