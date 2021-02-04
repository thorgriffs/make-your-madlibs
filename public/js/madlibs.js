// Currently this file returns an array of blank fields for templates (var clientData)
// To do:
// Need to find a way to pull the templates out of the database and pass into the loop

const mtp = require('madlibs-template-parser')

var blankTemplates = [
    {
        id: 1,
        title: 'Test Madlib 1',
        madLib: 'This is some <descriptiveAdjective> <singularNoun> used'
    },
    { 
        id: 2,
        title: 'Test Madlib 2',
        madLib: 'to <rootVerb> this <singularNoun> using the parser'
    }
] //from database

var clientData = []

for (let i = 0; i < blankTemplates.length; i++) {
    var template = blankTemplates[i];
    var madLibForClient = { id: template.id, title: template.title}  
    madLibForClient.blanks = getBlanks(template.madLib);      
    clientData.push(madLibForClient);
}

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

console.log(clientData[0]);
console.log(clientData[1]);