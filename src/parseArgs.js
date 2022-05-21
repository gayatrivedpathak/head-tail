const isOption = (text) => {
  const optionRegex = /^-./;
  return optionRegex.test(text);
};

const getOptionName = (text) => {
  const keys = { '-n': 'lines', '-c': 'character' };
  return keys['-' + `${text.match(/[nc]/)}`] || keys['-n'];
};

const getValue = (arg, nextArg) => {
  return +nextArg || +`${arg.match(/\d/)}`;
};

const isNotValidArgs = (args) => {
  return args.includes('-c') && args.includes('-n');
};

// eslint-disable-next-line complexity
const parseArgs = (args) => {
  if (isNotValidArgs(args)) {
    throw { message: 'head: can\'t combine line and byte counts' };
  }
  const parsedArgs = { option: 'lines', value: 10, fileNames: [] };
  for (let index = 0; index < args.length; index++) {
    const arg = args[index];
    if (isOption(arg)) {
      parsedArgs.option = getOptionName(arg);
      parsedArgs.value = getValue(arg, args[index + 1]);
    } else if (!isFinite(arg)) {
      parsedArgs.fileNames.push(arg);
    }
  }
  return parsedArgs;
};

exports.parseArgs = parseArgs;
exports.isOption = isOption;
