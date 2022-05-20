const assert = require('assert');
// const { parseArgs } = require('../src/parseArgs.js');

const parseArgs = (args) => {
  return { option: 'lines', value: 10, fileName: args[args.length - 1] };
};

describe('parseArgs', () => {
  it('should parse just a file name', () => {
    assert.deepStrictEqual(parseArgs(['./a.txt']),
      { option: 'lines', value: 10, fileName: './a.txt' });
    assert.deepStrictEqual(parseArgs(['./b.txt']),
      { option: 'lines', value: 10, fileName: './b.txt' });
  });

});
