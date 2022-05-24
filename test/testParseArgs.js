const assert = require('assert');
const { parseArgs, isOption, getOptionName, getValue } = require('../src/parseArgs.js');

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

  it.skip('should parse value without option', () => {
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
    assert.throws(() => parseArgs(['-n', '1', '-c', '2', './b.txt', './d.txt']),
      {
        message: 'head: can\'t combine line and byte counts'
      });
  });

  it.skip('should throw error if value of any option is 0', () => {
    assert.throws(() => parseArgs(['-n', '0', './b.txt']), {
      message: 'head: illegal line count -- 0'
    });
  });

  it('should throw error if invalid options provided', () => {
    assert.throws(() => parseArgs(['-w', '2', './b.txt']), {
      message: 'head: illegal option -- w\nusage: head[-n lines | -c bytes][file ...]'
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

describe('getOptionName', () => {
  it('should give corresponding optionName for -n', () => {
    assert.deepStrictEqual(getOptionName('-n'), 'lines');
  });

  it('should give corresponding optionName for -c', () => {
    assert.deepStrictEqual(getOptionName('-c'), 'character');
  });

  it('should throw error if option is invalid', () => {
    assert.throws(() => getOptionName('-w'), {
      message: 'head: illegal option -- w\nusage: head[-n lines | -c bytes][file ...]'
    });
    assert.throws(() => getOptionName('-w2'), {
      message: 'head: illegal option -- w\nusage: head[-n lines | -c bytes][file ...]'
    });
  });
});

describe('getValue', () => {
  it('should give value', () => {
    assert.deepStrictEqual(getValue('1', '-n'), 1);
  });

  it('should throw error if option is invalid', () => {
    assert.throws(() => getValue('0'), {
      message: 'head: illegal line count -- 0'
    });
  });
});
