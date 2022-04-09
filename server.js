const express = require("express");
// const mongoose = require("mongoose");
require('dotenv').config()
const path = require('path')

const app = express();
// const port = 8001;
const port = process.env.PORT || 8001 
const corsOptions = {
    origin: [
      "http://127.0.0.1:3000",
      "http://localhost:3000",
      "https://eyesaveserver.herokuapp.com" ,
    ],
    credentials: true,
  };

require("./models");

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, "public")));
    app.use(cors(corsOptions));
}

app.use(express.json());
app.use("/",require("./router"));

app.listen(port, ()=>console.log(`Server is running on port ${port}`));