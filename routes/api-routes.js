const path = require('path');
const db = require("../models");
const madlibs = require('../lib/madlibs');

// Routes
module.exports = (app) => {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route to display story title and teaser
  app.get('/', async (req, res) => {
    //retrieve all but only display title and teaser
    await db.Templates.findAll({})
      // .then((dbTemplates) => res.render("index", { dbTemplates })) //add this line after handlebars created

      .then((dbTemplates) => res.json(dbTemplates)); //worked on postman, delete after handlebars created
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
    await db.Stories.create({
      title: req.body.title,
      storyBody: req.body.storyBody,
    }).then((dbStories) => {
      res.json(dbStories); //need to change this line to handlebars after handlebars created
    }).catch((err) => {
      if (err) throw err;
    })
    // Redirect to /stories/:id
    return res.redirect("/stories/:id");
  });

  app.get("/stories/:id", async (req, res) => {
    // Get the completed story from the db
    db.Stories.findByPk({ id });
    // Fill in a handlebars template, add in handlebars file name
    const completedStory = db.Stories.findByPk({ id });
    res.render("", { completedStory });
  });

  // not sure if we need another route for user to enter data in the word fields...

};