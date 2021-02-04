const db = require('../models');

// Routes
module.exports = (app) => {
  // Get route for retrieving all templates  
  app.get('/api/templates', (req, res) => {
    db.Templates.findAll()

      .then((dbTemplates) => res.json(dbTemplates));
  });
}
/* Not sure if we code here for rendering the forms for filling
the blank word spaces... or if that is occurring in another file */
