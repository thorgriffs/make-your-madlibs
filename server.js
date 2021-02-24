const express = require("express");
const exphbs = require("express-handlebars");
var session = require("express-session");
var passport = require("./config/passport");

const app = express();
const PORT = process.env.PORT || 8080;


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
app.set("view engine", "handlebars");

// Serve static content from the "public" directory
app.use(express.static("public"));

// Invoke routes
const routes = require("./routes/api-routes");
app.use(routes);

// Start server listening
db.sequelize.sync({}).then(() => {
  app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
});