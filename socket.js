const { Server } = require("socket.io");
let io;
module.exports.init = (server) => {
  io = new Server(server,{
    cors: {
        origin: '*'
    }
  });
};

function getSocket() {
  return io;
}

module.exports.getSocket = getSocket;
