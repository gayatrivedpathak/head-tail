const { standardizeArgs } = require('./restructArgs.js');

const invalidValueError = () => {
  return { message: 'head: illegal line count -- 0' };
};

const combinedOptionError = () => {
  return { message: 'head: can\'t combine line and byte counts' };
};

const invalidOptionError = (option) => {
  return {
    message: `head: illegal option -- ${option.slice(1, 2)}
usage: head[-n lines | -c bytes][file ...]`
  };
};

const isOption = (text) => {
  return text.startsWith('-');
};

const getOptionName = (option) => {
  const validOptions = ['-n', '-c'];
  if (validOptions.includes(option)) {
    const keys = { '-n': 'lines', '-c': 'character' };
    return keys[option] || keys['-n'];
  }
  throw invalidOptionError(option);
};

const getValue = (arg) => {
  const value = +arg;
  if (value === 0) {
    throw invalidValueError();
  }
  return value;
};

const assertArgs = (args) => {
  if (args.includes('-c') && args.includes('-n')) {
    throw combinedOptionError();
  }
};

const option = (arg, nextArg) => {
  return {
    option: getOptionName(arg),
    value: getValue(nextArg)
  };
};

const parseArgs = (cmdLineArgs) => {
  const args = standardizeArgs(cmdLineArgs);
  assertArgs(args);
  let parsedArgs = { option: 'lines', value: 10 };
  let index = 0;
  while (isOption(args[index])) {
    parsedArgs = option(args[index], args[index + 1]);
    index += 2;
  }
  parsedArgs.fileNames = args.slice(index);
  return parsedArgs;
};

exports.parseArgs = parseArgs;
exports.isOption = isOption;
exports.getOptionName = getOptionName;
exports.getValue = getValue;
