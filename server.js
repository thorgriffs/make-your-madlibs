const express = require("express");
const path = require("path");
const session = require("express-session");
const mysql = require("mysql");
const exphbs = require("express-handlebars");
const passport = require("./config/passport");
const dotenv = require('dotenv');

dotenv.config({ path: './.env'});


const app = express();
const PORT = process.env.PORT || 8080;

/*

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE
});*/



// We need to use sessions to keep track of our user's login status
// Creating express app and configuring middleware needed for authentication





app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


// Require models for syncing
const db = require("./models");

app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handlebars routes
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars", "hbs");

// Serve static content from the "public" directory
app.use(express.static("public"));

//routes
/*
const routes = require("./routes/api-routes");
//
const routes = require("./routes/html-routes.js");
const routes = require("./routes/api-routes.js");
//
app.use(routes); */

app.use(require("./routes/api-routes"));
app.use(require("./routes/html-routes.js"));
app.use(require("./routes/api-routes.js"));
// Start server listening

// Syncing our database and logging a message to the user upon success

db.sequelize.sync({}).then(() => {
  app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
});

