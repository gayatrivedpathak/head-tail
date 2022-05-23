const assert = require('assert');
const { headMain } = require('../src/headLib');

const mockReadFileSync = (files) => {
  return (fileName, encoding) => {
    assert.deepStrictEqual(true, Object.keys(files).includes(fileName));
    assert.deepStrictEqual(encoding, 'utf8');
    return files[fileName];
  };
};

describe('headMain', () => {
  it('should give the first 10 lines of given file', () => {
    const mockedReadFileSync = mockReadFileSync(
      { './a.txt': 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj' }
    );
    assert.deepStrictEqual(
      headMain(mockedReadFileSync, './a.txt'),
      'a\nb\nc\nd\ne\nf\ng\nh\ni\nj'
    );
  });

  it('should give the first 2 lines of given file', () => {
    const mockedReadFileSync = mockReadFileSync(
      { './a.txt': 'a\nb\nc' }
    );
    assert.deepStrictEqual(
      headMain(mockedReadFileSync, '-n', '2', './a.txt'),
      'a\nb'
    );
  });

  it('should give the first 3 characters of given file', () => {
    const mockedReadFileSync = mockReadFileSync(
      { './a.txt': 'a\nb\nc' }
    );
    assert.deepStrictEqual(
      headMain(mockedReadFileSync, '-c', '3', './a.txt'),
      'a\nb'
    );
  });

  it('should give 10 lines for two files', () => {
    const mockedReadFileSync = mockReadFileSync(
      {
        './a.txt': 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj',
        './b.txt': 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj'
      }
    );
    assert.deepStrictEqual(
      headMain(mockedReadFileSync, './a.txt', './b.txt'),
      '==> ./a.txt <==\na\nb\nc\nd\ne\nf\ng\nh\ni\nj\n\n==> ./b.txt <==\na\nb\nc\nd\ne\nf\ng\nh\ni\nj');
  });

  it('should give 1 line for two files', () => {
    const mockedReadFileSync = mockReadFileSync(
      {
        './a.txt': 'a\nb\nc',
        './b.txt': 'a\nb\nc'
      }
    );
    assert.deepStrictEqual(
      headMain(mockedReadFileSync, './a.txt', './b.txt'),
      '==> ./a.txt <==\na\nb\nc\n\n==> ./b.txt <==\na\nb\nc');
  });
});
