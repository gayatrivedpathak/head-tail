const NEWLINE = '\n';
const splitLines = (content) => content.split(NEWLINE);
const joinLines = (content) => content.join(NEWLINE);

const headLines = (content, count) => {
  const lines = splitLines(content);
  return joinLines(lines.slice(0, count));
};

const head = (content, { value }) => {
  return headLines(content, value);
};

exports.head = head;
exports.headLines = headLines;
