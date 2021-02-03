// dependencies
const Filter = require('bad-words');

$(function () {
    //function on filtering the inputs
    let allInputs = $(":input");
    filter = new Filter(allInputs);
});


