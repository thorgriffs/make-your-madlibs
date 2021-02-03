// dependencies
const Filter = require('bad-words');

$(function () {
    //function on filtering the inputs for bad words
    //need to replace :input by grabbing the input id on each word
    let filteredNoun = new Filter(":input");
    let filteredAdjective = new Filter(":input");
    let filteredPluralNoun = new Filter(":input");
    let filteredVerb = new Filter(":input");
});


