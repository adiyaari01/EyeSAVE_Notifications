const { Server } = require("socket.io");
let io;
module.exports.init = (server) => {
  io = new Server(server,{
    // cors: {
    //     origin: ['*']
    //     // [    
    //     //   "http://127.0.0.1:3000",
    //     //   "http://localhost:3000",
    //     //   "https://eyesave.netlify.app",
    //     // ]
    // },
    allowRequest: (req,callback) => callback(null,true)
  });
};

function getSocket() {
  return io;
}

module.exports.getSocket = getSocket;
