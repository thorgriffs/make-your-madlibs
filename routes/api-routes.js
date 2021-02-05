const path = require('path');
const db = require("./models");
const madlibs = require('../lib/madlibs');

// Routes
module.exports = (app) => {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route to display story title and teaser
  app.get('/', (req, res) => {
    //retrieve all but only display title and teaser
    const templates = db.Templates.findAll({});
    //add in handlebars name here
    res.render("index", templates);
  });

  app.get("/madlibs/:id", async (req, res) => {
    const template = await db.Templates.findByPk(req.params.id);
    const blanks = madlibs.getBlanks(template);

    // Render the blanks in a form via handlebars (each helper)
    res.render("madlib", { blanks });
  });

  app.post("/madlibs/:id", async (req, res) => {
    // req.body.... with the field names attached
    // need the logic to get the blanks in order
    // Read the blanks. Fill in the story.
    // Save the story.
    // Redirect to /stories/:id
  });

  app.get("/stories/:id", async (req, res) => {
    // Get the completed story from the db
    // Fill in a handlebars template
    // const story = await db.Stories.findByPk(id)
    // res.render('story', { story });
  });
  // not sure if we need another route for user to enter data in the word fields...

};