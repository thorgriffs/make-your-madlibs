const express = require("express");
const router = express.Router();
const db = require("../models");
const madlibs = require("../lib/madlibs");
// const madlibs = require('../lib/madlibs.js');

// TODO:
// comment back in post route when done

// Routes

// Each of the below routes just handles the HTML page that the user gets sent to.

// GET route on index page to display story title and teaser
router.get("/", async (req, res) => {
  // retrieve all but only display title and teaser
  try {
    // console.log("before await");
    const templates = await db.Templates.findAll({ raw: true });
    // console.log(templates);
    res.render("index", { templates });
  } catch (err) {
    console.log("An error occurred:", err);
  }
});

// GET route on create page to display form for user input
router.get("/create/:id/:title", async (req, res) => {
  try {
    const template = await db.Templates.findOne({
      where: {
        title: req.params.title,
      },
    });
    const blanks = madlibs.getBlanks(template.templateBody);
    // console.log(template);
    res.render("create", {
      title: template.title,
      teaser: template.teaser,
      blanks,
      id: req.params.id,
    });
  } catch (err) {
    console.log("An error occurred:", err);
  }
});

// Render the blanks in a form via handlebars (each helper)
// template.then((blanks) => {  dont need

// POST route for creating story and create in db
router.post("/create/:id/:title", async (req, res) => {
  //id?
  // req.body.... with the field names attached
  // need the logic to get the blanks in order
  // Read the blanks. Fill in the story.
  // Save the story.
  console.log("this is the post route...");

  try {
    // req.body // { "1": "word", "2": "formId"}
    console.log(req.body);
    let templateId;
    const blanks = [];
    for (const field in req.body) {
      const number = Number(field);
      if (isNaN(number)) {
        // eslint-disable-next-line no-unused-vars
        templateId = req.body[field];
      } else {
        blanks[number] = req.body[field];
      }
    }

    console.log("id:" + req.params.id);
    console.log("blanks:" + blanks);
    // use form story function here with blanks and id
    const completedStory = await madlibs.formStory(req.params.id, req.body);
    // gives us back the string to make the storyBody

    console.log("story:" + completedStory);

    const createStory = await db.Stories.create({
      title: req.params.title,
      storyBody: completedStory,
    });

    // console.log(create.Story.id);

    res.render("result", createStory); // created
      // Redirect to show completed story
    console.log("redicect");
    res.redirect("/result/" + createStory.id);
  } catch (err) {
    console.log("An error occured:", err);
  }
  return;

});

// GET the completed story from the db
router.get("/result/:id", async (req, res) => {
  console.log("this is the get /result/:id route...");

  try {
    const story = await db.Stories.findByPk(req.params.id);

    console.log(story);

    res.render("result", {
      title: story.title,
      storyBody: story.storyBody,
    });
  } catch (err) {
    console.log("An error occurred:", err);
  } // Fill in a handlebars template, add in handlebars file name
});

// GET route to render all stories
router.get("/stories", async (req, res) => {
  try {
    const stories = await db.Stories.findAll({ raw: true });
    res.render("stories", { stories });
  } catch (err) {
    console.log("An error occurred:", err);
  }
});

module.exports = router;