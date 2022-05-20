const NEWLINE = '\n';
const splitLines = (content) => content.split(NEWLINE);
const joinLines = (content) => content.join(NEWLINE);

const headLines = (content, count) => {
  const lines = splitLines(content);
  return joinLines(lines.slice(0, count));
};

const headCharacters = (content, count) => {
  return content.slice(0, count);
};

const head = (content, { option, value }) => {
  const operation = option === 'lines' ? headLines : headCharacters;
  return operation(content, value);
};

exports.head = head;
exports.headLines = headLines;
exports.headCharacters = headCharacters;
