const assert = require('assert');
const { head, headLines } = require('../src/headLib');

describe('head', () => {
  it('should give a line', () => {
    assert.deepStrictEqual(head('hello', 1), 'hello');
    assert.deepStrictEqual(head('bye', 1), 'bye');
  });

  it('should give two lines', () => {
    assert.deepStrictEqual(head('hello\nbye', 2), 'hello\nbye');
    assert.deepStrictEqual(head('hello\nbye', 2), 'hello\nbye');
  });

  it('should give first 10 lines', () => {
    assert.deepStrictEqual(head('a\nb\nc\nd\ne\nf\ng\nh\ni\nj', 10),
      'a\nb\nc\nd\ne\nf\ng\nh\ni\nj');
    assert.deepStrictEqual(head('a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk', 10),
      'a\nb\nc\nd\ne\nf\ng\nh\ni\nj');
  });

  it('should give the given number of lines', () => {
    assert.deepStrictEqual(head('a\nb', 1), 'a');
    assert.deepStrictEqual(head('a\nb', 2), 'a\nb');
  });

  it('should give empty string for empty lines', () => {
    assert.deepStrictEqual(head('', 2), '');
  });
});

describe('headLine', () => {
  it('should give first 10 lines', () => {
    assert.deepStrictEqual(
      headLines(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'], 10),
      ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']);
  });

  it('should give first 2 lines', () => {
    assert.deepStrictEqual(
      headLines(['a', 'b', 'c'], 2), ['a', 'b']);
  });
});
