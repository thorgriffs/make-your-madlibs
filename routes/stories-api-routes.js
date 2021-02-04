const db = require('../models');

// Routes
module.exports = (app) => {
  // Get route for retrieving all stories  
  app.get('/api/stories', (req, res) => {
    db.Stories.findAll()

    .then((dbStories) => res.json(dbStories));
  });

  // Get route for retrieving a single story
  app.get('/api/stories/:id', (req, res) => {
    db.Stories.findOne({
      where: {
        id: req.params.id,
      },
    }).then((dbStories) => res.json(dbStories));
  });

  // POST route for saving a new story
  app.post('/api/stories', (req, res) => {
    db.Stories.create(req.body).then((dbStories) => res.json(dbStories));
  });

  // PUT route for updating stories (upvoting??)
  app.put('/api/stories', (req, res) => {
    db.Stories.update(req.body, {
      where: {
        id: req.body.id,
      },
    }).then((dbStories) => res.json(dbStories));
  });
};