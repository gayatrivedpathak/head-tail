const sliceAt = (text, position) => {
  return [text.slice(0, position), text.slice(position)];
};

const isOption = (arg) => arg.startsWith('-');

const structArgs = function (args) {
  return args.flatMap(arg => {
    if (isOption(arg)) {
      return sliceAt(arg, 2);
    }
    return arg;
  }).filter(arg => arg.length);
};

exports.structArgs = structArgs;
