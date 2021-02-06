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
            blanks.push({ category: word.category, variant: word.variant });
        }
    }
    return blanks;
};

var response = {
    templateId: 3,
    blanks: [
        { index: 0, word: 'cat' },
        { index: 1, word: 'dog' },
        { index: 2, word: 'bird' },
        { index: 3, word: 'climb' },
        { index: 4, word: 'snake' },
        { index: 5, word: 'funnily' },
        { index: 6, word: 'bunny' },
        { index: 7, word: 'llama' },
        { index: 8, word: 'asked' },
        { index: 9, word: 'emu' },
        { index: 10, word: 'cool' },
        { index: 11, word: 'hedgehog' },
        { index: 12, word: 'sleeping' },
        { index: 13, word: 'list' },
        { index: 14, word: 'woohoo' }
    ]
}
var story = formStory(response).then(console.log);

// Piece the completed story back together by inserting the blanks
//{ response: { templateId: 12, blanks: [ { index: 0, word: 'cat' }, { index: 1, word: 'dog' }] }
async function formStory(response) {
    var template = await db.Templates.findByPk(response.templateId);
    var parts = getStoryParts(template.templateBody);
    var story = [];
    var wordIndex = 0;
    for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
        if (part.type === 'blank') {
            var blank = response.blanks.filter(b => b.index === wordIndex)[0];
            story.push(blank.word);
            wordIndex++;
        }
        else {
            story.push(part.text)
        }
    }

    var completeStory = story.join(' ');
    const addStory = await db.Stories.create({ title: template.title, storyBody: completeStory });
    return completeStory;
}

// Export the blanks and the completed story functions
module.exports = {
    getBlanks,
    formStory
};