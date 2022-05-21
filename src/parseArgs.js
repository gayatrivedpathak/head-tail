const isOption = (text) => {
  const optionRegex = /^-.$/;
  return optionRegex.test(text);
};

const parseArgs = (args) => {
  const keys = { '-n': 'lines', '-c': 'character' };
  const parsedArgs = { option: 'lines', value: 10 };

  for (let index = 0; index < args.length; index++) {
    if (isOption(args[index])) {
      parsedArgs.option = keys[args[index]];
      parsedArgs.value = +args[index + 1];
    } else {
      parsedArgs.fileName = args[index];
    }
  }
  return parsedArgs;
};

exports.parseArgs = parseArgs;
exports.isOption = isOption;
