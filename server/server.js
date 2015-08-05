var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();

var configEnv = require("./config/env.js");
var routes = require("./controllers/routes.js");

// --------------------------------------------------------------------------------

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.use('/', routes);
app.listen(configEnv.serverPort, function(){console.log("Server started: listening...");});
