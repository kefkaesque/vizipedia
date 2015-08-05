var express = require("express");
var app = express();

var configEnv = require("./config/env.js");

// --------------------------------------------------------------------------------

app.use(express.static("public"));


app.listen(configEnv.serverPort, function(){console.log("Server started: listening...");});
