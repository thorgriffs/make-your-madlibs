// Currently this file returns an array of the blank fields out of a template that is hardcoded into the "blanks" variable
// To do:
// Need to find a way to pull the templates out of the database, loop over them, and pass them into getBlanks()
// Then return an array of objects that has template title and the blank fields for each template in the db to be rendered on the main page,
// something like:
// [  
// 	{
// 		title: "Template 1 Title",
//     	blanks: [      
// 			{ category: 'Cat1', variant: 'whatever' },
// 			{ category: 'Cat2', variant: 'another' }
//     	]  
// 	},  
// 	{    title: "Template 2 Title",
// 		 blanks: [        
// 			{ category: 'Cat2', variant: '??' },
// 			{ category: 'Cat3', variant: '??' }
// 	      ]
// 	 }
// ]

const mtp = require('madlibs-template-parser')
var blanks = getBlanks("This is some <descriptiveAdjective> <singularNoun> used to <rootVerb> this <singularNoun> using the parser");

function getBlanks(madlib) {
    var paragraphs = mtp(madlib);
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
console.log(blanks);