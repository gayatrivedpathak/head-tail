const sliceAt = (text, position) => {
  return [text.slice(0, position), text.slice(position)];
};

const isOption = (arg) => arg.startsWith('-');

const getOption = (arg) => {
  if (isFinite(arg.slice(1))) {
    return ['-n', arg.slice(1)];
  }
  return sliceAt(arg, 2);
};

const standardizeArgs = function (args) {
  return args.flatMap(arg => {
    if (isOption(arg)) {
      return getOption(arg);
    }
    return arg;
  }).filter(arg => arg.length);
};

exports.standardizeArgs = standardizeArgs;
