// Currently this file returns an array of blank fields for templates (var clientData)
// To do:
// Need to find a way to pull the templates out of the database and pass into the loop
const db = require('../models');
const templates = db.Templates.findAll();
const mtp = require('madlibs-template-parser')

function getAllTemplates() {
    var clientData = []

    for (let i = 0; i < templates.length; i++) {
        var template = templates[i];
        var madLibForClient = { id: template.id, title: template.title}  
        // madLibForClient.blanks = getBlanks(template.templateBody);      
        clientData.push(madLibForClient);
    }          
};

function getBlanks(template) {
    var paragraphs = mtp(template);
    var firstParagraph = paragraphs[0];
    var blanks = [];

    for (var i = 0; i < firstParagraph.length; i++) {
        var word = firstParagraph[i];
        if (word.type === 'blank') {
            blanks.push({category: word.category, variant: word.variant});
        }
    }

    return blanks;
};

module.exports = {
    getBlanks,
    getAllTemplates
};

console.log(clientData[0]);
console.log(clientData[1]);