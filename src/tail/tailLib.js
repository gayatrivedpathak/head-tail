const tailLines = (content, count) => {
  const lines = content.split('\n');
  const position = lines.length - count;
  return lines.slice(position).join('\n');
};

const tailCharacters = (content, count) => {
  const position = content.length - count;
  return content.slice(position);
};

const tail = (content, { option, value }) => {
  const operation = option === 'lines' ? tailLines : tailCharacters;
  return operation(content, value);
};

exports.tail = tail;
exports.tailLines = tailLines;
exports.tailCharacters = tailCharacters;
