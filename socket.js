const { Server } = require("socket.io");
let io;
module.exports.init = (server) => {
  io = new Server(server, {
    cors: {
      origin: 'https://eyesave.netlify.app',
      methods: ["GET","POST"],
      credentials: true,
      optionSuccessStatus: 200,
    },
  });
};

function getSocket() {
  return io;
}

module.exports.getSocket = getSocket;
