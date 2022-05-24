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

const formatOutput = (headContent, fileName) => {
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

const headFile = (fileReader, fileName, subOptions, loggers, formatter) => {
  let exitCode = 0;
  try {
    const content = readFile(fileReader, fileName);
    const headContent = head(content, subOptions);
    loggers.stdOut(formatter(headContent, fileName));
  } catch (error) {
    exitCode = 1;
    loggers.stdErr(error.msg);
  } finally {
    return exitCode;
  }
};

const getFormatter = (fileNames) => {
  return isMulipleFiles(fileNames) ? formatOutput : identity;
};

const isMulipleFiles = (files) => files.length > 1;

const identity = (fileContent) => fileContent;

const headMain = (fileReader, loggers, ...args) => {
  let parsedArgs = {};
  try {
    parsedArgs = parseArgs(args);
  } catch (error) {
    loggers.stdErr(error.message);
    return 1;
  }
  const { fileNames, ...subOptions } = parsedArgs;
  const formatter = getFormatter(fileNames);
  let finalExitCode = 0;
  fileNames.forEach((fileName) => {
    const code = headFile(fileReader, fileName, subOptions, loggers, formatter);
    finalExitCode = Math.max(finalExitCode, code);
  });
  return finalExitCode;
};

exports.head = head;
exports.headLines = headLines;
exports.headCharacters = headCharacters;
exports.headMain = headMain;
exports.formatOutput = formatOutput;
exports.headFile = headFile;
exports.readFile = readFile;
