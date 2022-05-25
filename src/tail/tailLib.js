const tailLines = (content, count) => {
  const lines = content.split('\n');
  return lines.slice(-count).join('\n');
};

const tailCharacters = (content, count) => {
  return content.slice(-count);
};

const reverse = (content) => {
  return content.split('\n').reverse().join('\n');
};

const getOperation = (flag) => {
  return flag === 'lines' ? tailLines : tailCharacters;
};

const tail = (content, { flag, value, isReverse }) => {
  const operation = getOperation(flag);
  const tailContent = operation(content, value);
  return isReverse ? reverse(tailContent) : tailContent;
};

const tailMain = (fileReader, ...args) => {
  const fileName = args[args.length - 1];
  const content = fileReader(fileName, 'utf8');
  const flag = 'lines';
  const value = 1;
  return tail(content, { flag, value, isReverse: false });
};

exports.tailLines = tailLines;
exports.tailCharacters = tailCharacters;
exports.tail = tail;
exports.tailMain = tailMain;
