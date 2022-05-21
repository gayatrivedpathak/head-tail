const parseArgs = (args) => {
  const optionRegex = /^-./;
  const keys = { '-n': 'lines', '-c': 'character' };
  const parsedArgs = { option: 'lines', value: 10 };

  for (let index = 0; index < args.length; index++) {
    if (optionRegex.test(args[index])) {
      parsedArgs.option = keys[args[index]];
      parsedArgs.value = +args[index + 1];
    } else {
      parsedArgs.fileName = args[index];
    }
  }
  return parsedArgs;
};

exports.parseArgs = parseArgs;
