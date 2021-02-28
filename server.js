require('dotenv').config({ path: './.env'});
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const flash = require('connect-flash');
const passport = require("./config/passport");


const app = express();
const PORT = process.env.PORT || 8080;




// We need to use sessions to keep track of our user's login status
// Creating express app and configuring middleware needed for authentication




app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


// Require models for syncing
const db = require("./models");


// Handlebars routes
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars", "hbs");


app.use(require("./routes/html-routes.js"));
app.use(require("./routes/api-routes.js"));
// Start server listening


// Syncing our database and logging a message to the user upon success

db.sequelize.sync({}).then(() => {
  app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
});

