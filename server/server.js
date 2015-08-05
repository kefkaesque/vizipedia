var express = require("express");
var app = express();

var configEnv = require("./config/env.js");

// --------------------------------------------------------------------------------

app.use(express.static("public"));
app.listen(configEnv.serverPort, configEnv.serverIp, function(){console.log("Server started: listening...");});
