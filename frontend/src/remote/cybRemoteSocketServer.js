import io from 'socket.io-client';

const socketUrl = `${location.protocol}//localhost:4545`;

export const socket = io(socketUrl, { transports: ['websocket'] });
