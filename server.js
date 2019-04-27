const express = require('express');
const bodyParser = require('body-parser');
const logger = require("morgan");
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
var io = require('socket.io')(http);

// Require models
const db = require('./models');

// initialize Express
const PORT = process.env.PORT || 3000;
const app = express();
var http = require('http').Server(app);

// Middleware 
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static('public'));

// routes for passing everything in
require('./routes/apiRoutes.js')(app);
require('./routes/htmlRoutes.js')(app);

// Setting up handlebars
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
  );
  app.set("view engine", "handlebars");

//socket io to load content
io.on('connection', () =>{
console.log('a user is connected')
})

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

io.on('connection', () =>{
    console.log('a user is connected')
  })

// start server
app.listen(PORT, ()=> {
    console.log('App running on port ' + PORT);
});