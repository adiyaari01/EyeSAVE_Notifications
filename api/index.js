const axios = require("axios");
const baseURI = "http://localhost:8000"

exports.getRequest = suffix =>axios.get(`${baseURI}/${suffix}`);
exports.updateRequest = (suffix, body) =>axios.put(`${baseURI}/${suffix}`,body);

