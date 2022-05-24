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

const formatOutput = (fileName, headContent) => {
  return `==> ${fileName} <==\n${headContent}`;
};

const readFileError = (fileName) => {
  return { message: `head: ${fileName}: No such file or directory` };
};

const readFile = (fileReader, fileName) => {
  try {
    return fileReader(fileName, 'utf8');
  } catch (error) {
    throw readFileError(fileName);
  }
};

const headFile = (fileReader, fileName, subOptions, errlogger) => {
  try {
    const content = readFile(fileReader, fileName);
    return head(content, subOptions);
  } catch (error) {
    errlogger(error.message);
  }
};

const headMain = (fileReader, logger, errlogger, ...args) => {
  let parsedArgs = {};
  try {
    parsedArgs = parseArgs(args);
  } catch (error) {
    errlogger(error.message);
  }
  const { fileNames, ...subOptions } = parsedArgs;
  if (fileNames.length <= 1) {
    const content = headFile(fileReader, fileNames[0], subOptions, errlogger);
    content && logger(content);
    return;
  }
  fileNames.forEach((fileName) => {
    const headContent = headFile(fileReader, fileName, subOptions, errlogger);
    headContent && logger(formatOutput(fileName, headContent));
  });
};

exports.head = head;
exports.headLines = headLines;
exports.headCharacters = headCharacters;
exports.headMain = headMain;
exports.headMultiFiles = headMultiFiles;
exports.formatOutput = formatOutput;
exports.headFile = headFile;
exports.readFile = readFile;
