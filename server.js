const express = require("express");
const exphbs = require("express-handlebars");
const { Sequelize } = require('sequelize');

// const htmlRouter = require("./routes/html-routes.js");
// const templatesRouter = require("./routes/templates-api-routes.js");
// const storiesRouter = require("./routes/stories-api-routes");

const app = express();
const PORT = process.env.PORT || 8080;

// Require models for syncing
const db = require("./models");

app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handlebars routes
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// app.get('/', function (req, res) {
//     res.render('index');
// });

// app.get('/stories', function (req, res) {
//     res.render('stories');
// });

// app.get('/create', function (req, res) {
//     res.render('create');
// });

// app.get('/result', function (req, res) {
//     res.render('result');
// });

// Serve static content from the "public" directory
app.use(express.static("public"));

// // Invoke routes
const routes = require("./routes/api-routes");
app.use(routes);

// templatesRouter(app);
// storiesRouter(app);

// Start server listening
db.sequelize.sync({}).then(() => {
    app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
});