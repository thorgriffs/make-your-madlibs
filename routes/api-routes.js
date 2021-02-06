const path = require('path');
const db = require("../models");
const madlibs = require('../lib/madlibs');

// TODO:
// change .catch to display error message instead of crashing server
// fix routes with :id?
// get("/create/:id") route

// Routes
module.exports = (app) => {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  // GET route on index page to display story title and teaser
  app.get('/', async (req, res) => {
    //retrieve all but only display title and teaser
    const templates = await db.Templates.findAll({});

    templates.then((dbTemplates) => res.render("index", { dbTemplates }))
      .catch((err) => {
        if (err) throw err;
      })
  });

  // GET route on create page to display form for user input
  app.get("/create/:id", async (req, res) => {
    const template = await db.Templates.findByPk(req.params.id);
    const blanks = madlibs.getBlanks(template);

    // Render the blanks in a form via handlebars (each helper)
    // ？ where to connec to .then(() => res.render("create", { blanks });
  });

  // POST route for creating story and create in db
  app.post("/create/:id", async (req, res) => { //id?
    // req.body.... with the field names attached
    // need the logic to get the blanks in order
    // Read the blanks. Fill in the story.
    // Save the story.
    await db.Stories.create({
      title: req.body.title,
      storyBody: req.body.storyBody,
    }).then((dbStories) => {
      res.json(dbStories); // created
    }).catch((err) => {
      if (err) throw err;
    });
    // Redirect to show completed story
    return res.redirect("/result/:id");
  });

  app.get("/result/:id", async (req, res) => {
    // Get the completed story from the db
    await db.Stories.findByPk({
      where: { id: req.params.id } // or just id?
    }).then((dbStories) =>
      res.render("result", { dbStories })
    ).catch((err) => {
      if (err) throw err;
    }) // Fill in a handlebars template, add in handlebars file name
  });

  // GET route to render all stories
  app.get("/stories", (req, res) => {
    db.Stories.findAll({})
      .then((dbStories) =>
        res.render("stories", { dbStories }));
  })

};