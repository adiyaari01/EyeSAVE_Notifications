const { Server } = require("socket.io");
let io;
module.exports.init = (server) => {
  io = new Server(server, {
    cors: {
      origin: [
        "http://127.0.0.1:3000/",
        "http://localhost:3000/",
        "https://eyesave.netlify.app/",
        "https://eyesave.herokuapp.com/",
        "https://eye-save-noitfications.herokuapp.com/",
      ],
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
