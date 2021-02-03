// dependencies
const Filter = require('bad-words');

$(function () {
    //function on filtering the inputs for bad words
    //need to replace :input by grabbing the input id on each word
    let cleanNoun = filter.clean(new Filter(":input"));
    let cleanAdjective = filter.clean(new Filter(":input"));
    let cleanPluralNoun = filter.clean(new Filter(":input"));
    let cleanVerb = filter.clean(new Filter(":input"));



});


