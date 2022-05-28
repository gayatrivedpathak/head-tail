const { splitLines, joinLines } = require('./strUtils.js');
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

const multiFileFormatter = (headContent, fileName) => {
  return `==> ${fileName} <==\n${headContent}`;
};

const readFileError = (fileName) => {
  return { message: `head: ${fileName}: No such file or directory` };
};

const readFile = (fileReader, fileName) => {
  try {
    const content = fileReader(fileName, 'utf8');
    return { content };
  } catch (error) {
    return { error: readFileError(fileName) };
  }
};

const headOfFile = (fileName, subOptions, fileReader) => {
  const { content, error } = readFile(fileReader, fileName);
  if (content) {
    const headContent = head(content, subOptions);
    return { fileName, headContent };
  }
  return { error, fileName };
};

const getFormatter = (fileNames) => {
  return isMulipleFiles(fileNames) ? multiFileFormatter : singleFileFormatter;
};

const print = (headResults, { stdOut, stdErr }, formatter) => {
  headResults.forEach(({ headContent, error, fileName }) => {
    if (headContent) {
      stdOut(formatter(headContent, fileName));
      return;
    }
    stdErr(error.message);
  });
};

const isMulipleFiles = (files) => files.length > 1;

const singleFileFormatter = (fileContent) => fileContent;

const successCode = (headResults) => {
  return headResults.some(({ error }) => error) ? 1 : 0;
};

const headMain = (fileReader, loggers, args) => {
  let parsedArgs = {};
  try {
    parsedArgs = parseArgs(args);
  } catch (error) {
    loggers.stdErr(error.message);
    return 1;
  }
  const { fileNames, ...subOptions } = parsedArgs;
  const formatter = getFormatter(fileNames);
  const headOfFiles = fileNames.map((fileName) => {
    return headOfFile(fileName, subOptions, fileReader);
  });
  print(headOfFiles, loggers, formatter);
  return successCode(headOfFiles);
};

exports.head = head;
exports.headLines = headLines;
exports.headCharacters = headCharacters;
exports.headMain = headMain;
exports.multiFileFormatter = multiFileFormatter;
exports.headOfFile = headOfFile;
exports.readFile = readFile;
