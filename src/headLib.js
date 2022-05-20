const NEWLINE = '\n';
const splitLines = (content) => content.split(NEWLINE);
const joinLines = (content) => content.join(NEWLINE);
const headLine = (lines) => lines.slice(0, 10);

const head = (content) => {
  const lines = splitLines(content);
  const firstLines = headLine(lines);
  return joinLines(firstLines);
};

exports.head = head;
exports.headLine = headLine;
