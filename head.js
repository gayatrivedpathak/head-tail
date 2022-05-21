// console.log('usage: head [-n lines | -c bytes] [file ...]');
const fs = require('fs');
const { headMain } = require('./src/headLib.js');

console.log(headMain(fs.readFileSync, ...process.argv.slice(2)));
