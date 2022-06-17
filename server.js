const express = require("express");
// const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
const cors = require("cors");

const http = require("http");

const app = express();
const server = http.createServer(app);

require("./socket").init(server);

// const port = 8001;
const port = process.env.PORT || 8001;
const corsOptions = {
  origin: [
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "https://eyesave.netlify.app",
    "https://eyesave.herokuapp.com",
  ],
  credentials: true,
  optionSuccessStatus: 200,
};

require("./models");

app.use(cors(corsOptions));
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "public")));
}

app.use(express.json());
app.use("/", require("./router"));

server.listen(port, () => console.log(`Server is running on port ${port}`));
