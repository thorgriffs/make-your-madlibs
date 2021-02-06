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
    try {
      const templates = await db.Templates.findAll({});
      res.render("index", { templates });
    } catch (err) {
      console.log('An error occurred:', err);
    }
  });

  // GET route on create page to display form for user input
  app.get("/create/:id", async (req, res) => {
    try {
      const template = await db.Templates.findByPk(req.params.id);
      const blanks = madlibs.getBlanks(template);
      res.render("create", { blanks, id: req.params.id });
    } catch (err) {
      console.log('An error occurred:', err);
    }
  });

  //try catch statement

  // Render the blanks in a form via handlebars (each helper)
  // template.then((blanks) => {  dont need


  // POST route for creating story and create in db
  app.post("/create/:id", async (req, res) => { //id?
    // req.body.... with the field names attached
    // need the logic to get the blanks in order
    // Read the blanks. Fill in the story.
    // Save the story.

    req.body // { "1": "word", "2": "formId"}
    let templateId;
    let blanks = [];
    for (const field in req.body) {
      const number = Number(field);
      if (isNaN(number)) {
        templateId = req.body[field];
      } else {
        blanks[number] = req.body[field];
      }
    }
    // use form story function here with blanks and id
    // gives us back the string to make the storyBody

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
    try {
      const story = await db.Stories.findByPk({ id });
      res.render("result", { story });
    } catch (err) {
      console.log('An error occurred:', err);
    } // Fill in a handlebars template, add in handlebars file name
  });

  // GET route to render all stories
  app.get("/stories", async (req, res) => {
    try {
      const stories = await db.Stories.findAll({});
      res.render("stories", { stories });
    } catch (err) {
      console.log('An error occurred:', err);
    }
  })
};