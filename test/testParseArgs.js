const assert = require('assert');
const { parseArgs } = require('../src/parseArgs.js');

describe('parseArgs', () => {
  it('should parse just a file name', () => {
    assert.deepStrictEqual(parseArgs(['./a.txt']),
      { option: 'lines', value: 10, fileName: './a.txt' });
    assert.deepStrictEqual(parseArgs(['./b.txt']),
      { option: 'lines', value: 10, fileName: './b.txt' });
  });

  it('should parse file name with -n option', () => {
    assert.deepStrictEqual(parseArgs(['-n', '3', './b.txt']),
      { option: 'lines', value: 3, fileName: './b.txt' });
  });

  it('should parse file name with -c option', () => {
    assert.deepStrictEqual(parseArgs(['-c', '3', './b.txt']),
      { option: 'character', value: 3, fileName: './b.txt' });
  });

  it('should parse file name and duplicate option', () => {
    assert.deepStrictEqual(parseArgs(['-n', '3', '-n', '5', './b.txt']),
      { option: 'lines', value: 5, fileName: './b.txt' });
    assert.deepStrictEqual(parseArgs(['-c', '3', '-c', '5', './b.txt']),
      { option: 'character', value: 5, fileName: './b.txt' });
  });
});
