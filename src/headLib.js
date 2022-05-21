const { splitLines, joinLines } = require('../src/strUtils.js');
const { parseArgs } = require('./parseArgs.js');

const headLines = (content, count) => {
  const lines = splitLines(content);
  return joinLines(lines.slice(0, count));
};

const headCharacters = (content, count) => {
  return content.slice(0, count);
};

const head = (content, { option, value }) => {
  const operation = option === 'lines' ? headLines : headCharacters;
  return operation(content, value);
};

const headMain = (readFile, ...args) => {
  const { option, value, fileName } = parseArgs(args);
  const content = readFile(...fileName, 'utf8');
  return head(content, { option, value });
};

exports.head = head;
exports.headLines = headLines;
exports.headCharacters = headCharacters;
exports.headMain = headMain;
