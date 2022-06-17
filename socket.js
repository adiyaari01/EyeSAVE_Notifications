const IO = require("socket.io")
let io;
module.exports.init = (server) => {
  io = IO(server, {
    cors: {
      origin: "https://eyesave.netlify.app",
      methods: ["GET", "POST"],
      credentials: false,
      optionSuccessStatus: 200,
    },
  });
  io.use((socket, next) => {
    socket.request.headers["access-control-allow-origin"]='*'
    next()
  });
};

function getSocket() {
  return io;
}

module.exports.getSocket = getSocket;
