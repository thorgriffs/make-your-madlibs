const db = require('../models');
const mtp = require('madlibs-template-parser');
//const apiRoutes = require('../routes/api-routes');

// Get all parts of a templateBody using the madlibs-template-body
function getStoryParts(templateBody) {
    console.log('Attempting to parse: ' + templateBody);
    var paragraphs = mtp(templateBody);
    var firstParagraph = paragraphs[0];
    var parts = [];

    for (var i = 0; i < firstParagraph.length; i++) {
        var word = firstParagraph[i];
        parts.push({ category: word.category, variant: word.variant, type: word.type, text: word.text });
    }

    return parts;
};

// Filter out the blanks
function getBlanks(templateBody) {
    var allParts = getStoryParts(templateBody);
    var blanks = [];
    for (var i = 0; i < allParts.length; i++) {
        var part = allParts[i];
        if (part.type === 'blank') {
            blanks.push({ index: i, category: part.category, variant: part.variant });
        }
    }
    return blanks;
};

// var response = {
//     templateId: 3,
//     blanks: ['cat', 'dog', 'bird']
// }
// var story = formStory(response).then(console.log);

// Piece the completed story back together by inserting the blanks
//{ response: { templateId: 12, blanks: [ { index: 0, word: 'cat' }, { index: 1, word: 'dog' }] }
async function formStory(templateId, blanks) {
    var template = await db.Templates.findByPk(templateId);
    var parts = getStoryParts(template.templateBody);
    var story = [];
    for (var i = 0; i < parts.length; i++) {
        if (parts[i].type === 'blank') {
            story.push(blanks[i]);
        }
        else {
            story.push(parts[i].text)
        }
    }

    var completeStory = story.join(' ');
    // const addStory = await db.Stories.create({ title: template.title, storyBody: completeStory });
    return completeStory;
}

// Export the blanks and the completed story functions
module.exports = {
    getBlanks,
    formStory
};