const express = require("express");
const router = express.Router();
const db = require("../models");
const madlibs = require('../lib/madlibs.js');


// TODO:
// comment back in post route when done

// Routes

// Each of the below routes just handles the HTML page that the user gets sent to.

// GET route on index page to display story title and teaser
router.get('/', async (req, res) => {

  // db.Templates.findAll({}).then(templates => res.render('index', {
  //   title: templates.title,
  //   teaser: templates.teaser
  // }));
  // retrieve all but only display title and teaser


  try {
    console.log("before await");

    const templates = await db.Templates.findAll();
    console.log(templates);

    res.render("index", { templates: templates });



  } catch (err) {
    console.log('An error occurred:', err);
  }
  // return res.redirect(/create/: id);
});

// GET route on create page to display form for user input
router.get("/create/:id", async (req, res) => {
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
// app.post("/create/:id", async (req, res) => { //id?
//   // req.body.... with the field names attached
//   // need the logic to get the blanks in order
//   // Read the blanks. Fill in the story.
//   // Save the story.

//   req.body // { "1": "word", "2": "formId"}
//   let templateId;
//   let blanks = [];
//   for (const field in req.body) {
//     const number = Number(field);
//     if (isNaN(number)) {
//       templateId = req.body[field];
//     } else {
//       blanks[number] = req.body[field];
//     }
//   }
//   // use form story function here with blanks and id
//   // gives us back the string to make the storyBody

//   await db.Stories.create({
//     title: req.body.title,
//     storyBody: req.body.storyBody,
//   }).then((dbStories) => {
//     res.json(dbStories); // created
//   }).catch((err) => {
//     if (err) throw err;
//   });
//   // Redirect to show completed story
//   return res.redirect("/result/:id");
// });

router.get("/result/:id", async (req, res) => {
  // Get the completed story from the db
  try {
    const story = await db.Stories.findByPk({ id });
    res.render("result", { story });
  } catch (err) {
    console.log('An error occurred:', err);
  } // Fill in a handlebars template, add in handlebars file name
});

// GET route to render all stories
router.get("/stories", async (req, res) => {
  try {
    const stories = await db.Stories.findAll({});
    res.render("stories", { stories });
  } catch (err) {
    console.log('An error occurred:', err);
  }
});

module.exports = router;
