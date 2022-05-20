const NEWLINE = '\n';
const splitLines = (content) => content.split(NEWLINE);
const joinLines = (content) => content.join(NEWLINE);
const headLines = (lines, count) => lines.slice(0, count);

const head = (content) => {
  const lines = splitLines(content);
  const firstLines = headLines(lines, 10);
  return joinLines(firstLines);
};

exports.head = head;
exports.headLines = headLines;
