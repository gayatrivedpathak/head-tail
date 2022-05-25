const tail = (content, count) => {
  const lines = content.split('\n');
  const position = lines.length - count;
  return lines.slice(position).join('\n');
};

exports.tail = tail;
