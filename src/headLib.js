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

const headMultiFiles = (fileContents, subOptions) => {
  return fileContents.map(({ fileName, content }) => {
    const headContent = head(content, subOptions);
    return { fileName, headContent };
  });
};

const formatOutput = (headContents) => {
  if (headContents.length <= 1) {
    return headContents[0].headContent;
  }
  return headContents.map(({ fileName, headContent }) => {
    return `==> ${fileName} <==\n${headContent}`;
  }).join('\n\n');
};

const headMain = (readFile, ...args) => {
  const { fileNames, ...subOptions } = parseArgs(args);
  const fileContents = fileNames.map((fileName) => {
    const content = readFile(fileName, 'utf8');
    return { fileName, content };
  });
  const headContents = headMultiFiles(fileContents, subOptions);
  return formatOutput(headContents);
};

exports.head = head;
exports.headLines = headLines;
exports.headCharacters = headCharacters;
exports.headMain = headMain;
exports.headMultiFiles = headMultiFiles;
exports.formatOutput = formatOutput;
