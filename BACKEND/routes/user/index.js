const express = require("express");
const route = express.Router();

// Register router : /blog/api/register
route.post("/register", require("./register"));

// Login router : /blog/api/login
route.post("/login", require("./login"));


module.exports = route;
