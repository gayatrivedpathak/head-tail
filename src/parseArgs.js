const isOption = (text) => {
  return text.startsWith('-');
};

const getOptionName = (text) => {
  if (/-[nc\d+]/.test(text)) {
    const keys = { '-n': 'lines', '-c': 'character' };
    return keys['-' + `${text.match(/[nc]/)}`] || keys['-n'];
  }
  throw {
    message: `head: illegal option -- ${text.match(/[a-z]/)}
usage: head[-n lines | -c bytes][file ...]`
  };
};

const getValue = (arg, nextArg) => {
  const value = +`${arg.match(/\d/)}` || +nextArg;
  if (value === 0) {
    throw { message: 'head: illegal line count -- 0' };
  }
  return value;
};

const isNotValidArgs = (args) => {
  return args.includes('-c') && args.includes('-n');
};

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
exports.getOptionName = getOptionName;
exports.getValue = getValue;
