const express = require("express");
const router = express.Router();
const db = require("../models");
const madlibs = require("../lib/madlibs");
var passport = require("../config/passport");




// Routes
// module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  router.post("/api/login", passport.authenticate("local", {failureRedirect: '/login', failureFlash: true}), function(req, res) {
    res.redirect('/members');
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  router.post("/api/signup", function(req, res) {
    const {email, password, confirmPassword} = req.body;
    if (password === confirmPassword) {
      db.User.create({
        email,
        password,
      })
        .then(function() {
          res.redirect('/members');
        })
        .catch(function(err) {
          res.status(401).json(err);
        })
    } else {
      res.status(400).send({error: 'Invalid password'});
    }
  });

  // Route for logging user out
  router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  router.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });



// GET route on index page to display story title and teaser
router.get("/", async (req, res) => {
  // retrieve all but only display title and teaser
  try {
    const templates = await db.Templates.findAll({ raw: true });

    // render to index handlesbars
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

// POST route for creating story and create in db
router.post("/create/:id/:title", async (req, res) => {
  try {
    // use formStory function from madlibs.js
    const completedStory = await madlibs.formStory(req.params.id, req.body);
    const createStory = await db.Stories.create({
      title: req.params.title,
      storyBody: completedStory,
    });

    // Redirect to show completed story
    res.redirect("/result/" + createStory.id);
  } catch (err) {
    console.log("An error occured:", err);
  }
  return;
});

// GET the completed story from the db
router.get("/result/:id", async (req, res) => {
  try {
    const story = await db.Stories.findByPk(req.params.id);

    res.render("result", {
      title: story.title,
      storyBody: story.storyBody,
    });
  } catch (err) {
    console.log("An error occurred:", err);
  }
});

// GET route to render all stories
router.get("/stories", async (req, res) => {
  try {
    const stories = await db.Stories.findAll({
      raw: true,
      order: [["id", "DESC"]],
    });
    res.render("stories", { stories });
  } catch (err) {
    console.log("An error occurred:", err);
  }
});




module.exports = router