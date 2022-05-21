const isOption = (text) => {
  const optionRegex = /^-./;
  return optionRegex.test(text);
};

const getOption = (text) => {
  const keys = { '-n': 'lines', '-c': 'character' };
  return keys['-' + `${text.match(/[nc]/)}`] || keys['-n'];
};

const getValue = (arg, args) => {
  const argIndex = args.indexOf(arg);
  return +args[argIndex + 1] || +`${args[argIndex].match(/[0-9]/)}`;
};

const parseArgs = (args) => {
  const parsedArgs = { option: 'lines', value: 10 };

  for (let index = 0; index < args.length; index++) {
    if (isOption(args[index])) {
      parsedArgs.option = getOption(args[index]);
      parsedArgs.value = getValue(args[index], args.slice(index));
    } else if (!isFinite(args[index])) {
      parsedArgs.fileName = args[index];
    }
  }
  return parsedArgs;
};

exports.parseArgs = parseArgs;
exports.isOption = isOption;
