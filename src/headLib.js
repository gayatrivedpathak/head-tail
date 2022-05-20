const NEWLINE = '\n';
const splitLines = (content) => content.split(NEWLINE);
const joinLines = (content) => content.join(NEWLINE);
const headLines = (lines, count) => lines.slice(0, count);

const head = (content, count) => {
  const lines = splitLines(content);
  const firstLines = headLines(lines, count);
  return joinLines(firstLines);
};

exports.head = head;
exports.headLines = headLines;
