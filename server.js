const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 8001;

mongoose.connect("mongodb://localhost:27017/EyeSAVE_DB");
require("./models");

app.use(express.json());
app.use("/",require("./router"));

app.listen(port, ()=>console.log(`Server is running on port ${port}`));