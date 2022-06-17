const IO = require("socket.io")
let io;
module.exports.init = (server) => {
  io = IO(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
      optionSuccessStatus: 200,
    },
  });
};

function getSocket() {
  return io;
}

module.exports.getSocket = getSocket;
