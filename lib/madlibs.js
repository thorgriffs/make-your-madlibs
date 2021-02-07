const db = require("../models");
const mtp = require("madlibs-template-parser");
//const apiRoutes = require('../routes/api-routes');

// Get all parts of a templateBody using the madlibs-template-body
function getStoryParts(templateBody) {
  console.log("Attempting to parse: " + templateBody);
  const paragraphs = mtp(templateBody);
  const firstParagraph = paragraphs[0];
  const parts = [];

  for (let i = 0; i < firstParagraph.length; i++) {
    const word = firstParagraph[i];
    parts.push({
      category: word.category,
      variant: word.variant,
      type: word.type,
      text: word.text,
    });
  }

  return parts;
}

// Filter out the blanks
function getBlanks(templateBody) {
  const allParts = getStoryParts(templateBody);
  const blanks = [];
  for (let i = 0; i < allParts.length; i++) {
    const part = allParts[i];
    if (part.type === "blank") {
      blanks.push({ index: i, category: part.category, variant: part.variant });
    }
  }
  return blanks;
}

// var response = {
//     templateId: 3,
//     blanks: ['cat', 'dog', 'bird']
// }
// var story = formStory(response).then(console.log);

// Piece the completed story back together by inserting the blanks
//{ response: { templateId: 12, blanks: [ { index: 0, word: 'cat' }, { index: 1, word: 'dog' }] }
async function formStory(templateId, blanks) {
  const template = await db.Templates.findByPk(templateId);
  const parts = getStoryParts(template.templateBody);
  const story = [];
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].type === "blank") {
      story.push(blanks[i]);
    } else {
      story.push(parts[i].text);
    }
  }

  const completeStory = story.join(" ");
  // const addStory = await db.Stories.create({ title: template.title, storyBody: completeStory });
  return completeStory;
}

// Export the blanks and the completed story functions
module.exports = {
  getBlanks,
  formStory,
};
