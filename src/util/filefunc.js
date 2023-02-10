const fs = require('fs');
const {coicopOptions} = require("../data/coicop");

let data = JSON.stringify(coicopOptions);
fs.writeFileSync('coicop.json', data);