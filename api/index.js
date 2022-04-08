const axios = require("axios");
const BASE_URL =
  process.env.NODE_ENV === "production" ? "https://eyesaveserver.herokuapp.com" : "http://localhost:8000";

exports.getRequest = suffix =>axios.get(`${BASE_URL}/${suffix}`);
exports.updateRequest = (suffix, body) =>axios.put(`${BASE_URL}/${suffix}`,body);

