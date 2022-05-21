const assert = require('assert');
const { parseArgs, isOption } = require('../src/parseArgs.js');

describe('parseArgs', () => {
  it('should parse just a file name', () => {
    assert.deepStrictEqual(parseArgs(['./a.txt']),
      { option: 'lines', value: 10, fileNames: ['./a.txt'] });
    assert.deepStrictEqual(parseArgs(['./b.txt']),
      { option: 'lines', value: 10, fileNames: ['./b.txt'] });
  });

  it('should parse file name with -n option', () => {
    assert.deepStrictEqual(parseArgs(['-n', '3', './b.txt']),
      { option: 'lines', value: 3, fileNames: ['./b.txt'] });
  });

  it('should parse file name with -c option', () => {
    assert.deepStrictEqual(parseArgs(['-c', '3', './b.txt']),
      { option: 'character', value: 3, fileNames: ['./b.txt'] });
  });

  it('should parse file name and duplicate option', () => {
    assert.deepStrictEqual(parseArgs(['-n', '3', '-n', '5', './b.txt']),
      { option: 'lines', value: 5, fileNames: ['./b.txt'] });
    assert.deepStrictEqual(parseArgs(['-c', '3', '-c', '5', './b.txt']),
      { option: 'character', value: 5, fileNames: ['./b.txt'] });
  });

  it('should parse combined option and value', () => {
    assert.deepStrictEqual(parseArgs(['-n3', './b.txt']),
      { option: 'lines', value: 3, fileNames: ['./b.txt'] });
  });

  it('should parse value without option', () => {
    assert.deepStrictEqual(parseArgs(['-3', './b.txt']),
      { option: 'lines', value: 3, fileNames: ['./b.txt'] });
  });

  it('should parse multiple file names without option', () => {
    assert.deepStrictEqual(parseArgs(['./b.txt', './d.txt']),
      { option: 'lines', value: 10, fileNames: ['./b.txt', './d.txt'] });
  });

  it('should parse multiple file names with option', () => {
    assert.deepStrictEqual(parseArgs(['-n1', './b.txt', './d.txt']),
      { option: 'lines', value: 1, fileNames: ['./b.txt', './d.txt'] });
  });

  it('should throw error -c and -n combined', () => {
    assert.throws(() => parseArgs(['-n', 1, '-c', 2, './b.txt', './d.txt']),
      {
        message: 'head: can\'t combine line and byte counts'
      });
  });
});

describe('isOption', () => {
  it('should verify whether text is option or not', () => {
    assert.deepStrictEqual(isOption('-n'), true);
    assert.deepStrictEqual(isOption('n'), false);
    assert.deepStrictEqual(isOption('-n1'), true);
  });
});
