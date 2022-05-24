const { structArgs } = require('./restructArgs.js');

const isOption = (text) => {
  return text.startsWith('-');
};

const getOptionName = (text) => {
  const validOptions = ['-n', '-c'];
  if (validOptions.includes(text)) {
    const keys = { '-n': 'lines', '-c': 'character' };
    return keys[text] || keys['-n'];
  }
  throw {
    message: `head: illegal option -- ${text.slice(1, 2)}
usage: head[-n lines | -c bytes][file ...]`
  };
};

const getValue = (arg) => {
  const value = +arg;
  if (value === 0) {
    throw { message: 'head: illegal line count -- 0' };
  }
  return value;
};

const assertArgs = (args) => {
  if (args.includes('-c') && args.includes('-n')) {
    throw combinedOptionError();
  }
};

const combinedOptionError = () => {
  return { message: 'head: can\'t combine line and byte counts' };
};

const option = (arg, nextArg) => {
  return {
    option: getOptionName(arg),
    value: getValue(nextArg)
  };
};

const parseArgs = (args) => {
  const structuredArgs = structArgs(args);
  assertArgs(structuredArgs);
  let parsedArgs = { option: 'lines', value: 10, fileNames: [] };
  let index = 0;
  while (isOption(structuredArgs[index])) {
    parsedArgs = option(structuredArgs[index], structuredArgs[index + 1]);
    index += 2;
  }
  parsedArgs.fileNames = structuredArgs.slice(index);
  return parsedArgs;
};

exports.parseArgs = parseArgs;
exports.isOption = isOption;
exports.getOptionName = getOptionName;
exports.getValue = getValue;
