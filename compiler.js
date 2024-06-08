var _ = require('lodash');

const ID = 0
const PADDING = 5
const SPACING = 2

const heading = ["50", "40", "30", "20", "10", "5"]
const tags = ["!", "!!", "!!!", "!!!!", "!!!!!", "!!!!!!"]
const text = "! Hello.\n !!! Solo."
console.log(_.split(text, "\n "))