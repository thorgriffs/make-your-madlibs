const express = require("express");
const exphbs = require("express-handlebars");

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



// // Handlebars
// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

// Serve static content from the "public" directory
app.use(express.static("public"));

// // Invoke routes
require("./routes/html-routes.js")(app);
// templatesRouter(app);
// storiesRouter(app);

// Start server listening
app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});