const path = require('path');

// Routes
module.exports = (app) => {
    // Each of the below routes just handles the HTML page that the user gets sent to.
  
    // index route to display templates...?
    app.get('/', (req, res) =>
      res.sendFile(path.join(__dirname, '../public/templates.html'))
    );
  
    // stories route to display completed stories
    app.get('/stories', (req, res) =>
      res.sendFile(path.join(__dirname, '../public/stories.html'))
    );
  
    // not sure if we need another route for user to enter data in the word fields...
  };