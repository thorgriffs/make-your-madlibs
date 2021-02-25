// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const router = require('express').Router();

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

//module.exports = function(router) {
  

  // router.get("/", function(req, res) {
  //   // If the user already has an account send them to the members page
  //   if (req.user) {
  //     res.redirect("/members");
  //   }
  //   res.sendFile(path.join(__dirname, "../public/signup.html"));
  // });

  router.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
   if (req.user) {
      return res.redirect("/members");
    }
    res.render('login', {error: req.flash('error')})
  });

  router.get("/register", function(req, res) {
    // If the user already has an account send them to the members page
   if (req.user) {
      return res.redirect("/members");
    }
    res.render('register')
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  router.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  module.exports = router;
//};
