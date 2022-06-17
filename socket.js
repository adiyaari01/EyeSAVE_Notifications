const {Server} = require("socket.io")
let io;
module.exports.init = (server) => {
  io = new Server(server, {
    cors: {
      origin: "https://eyesave.netlify.app",
      credentials: true,
      allowedHeaders: ['my-header']
    },
  });
};

function getSocket() {
  return io;
}

module.exports.getSocket = getSocket;
