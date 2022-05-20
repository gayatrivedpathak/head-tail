const assert = require('assert');
const { head, headLines, headCharacters } = require('../src/headLib');

describe('head', () => {
  it('should give a line', () => {
    const option = { option: 'lines', value: 1 };
    assert.deepStrictEqual(head('hello', option), 'hello');
    assert.deepStrictEqual(head('bye', 1), 'bye');
  });

  it('should give two lines', () => {
    const option = { option: 'lines', value: 2 };
    assert.deepStrictEqual(head('hello\nbye', option), 'hello\nbye');
  });

  it('should give first 10 lines', () => {
    const option = { option: 'lines', value: 10 };
    assert.deepStrictEqual(head('a\nb\nc\nd\ne\nf\ng\nh\ni\nj', option),
      'a\nb\nc\nd\ne\nf\ng\nh\ni\nj');
    assert.deepStrictEqual(head('a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk', option),
      'a\nb\nc\nd\ne\nf\ng\nh\ni\nj');
  });

  it('should give the given number of lines', () => {
    let option = { option: 'lines', value: 1 };
    assert.deepStrictEqual(head('a\nb', option), 'a');
    option = { option: 'lines', value: 2 };
    assert.deepStrictEqual(head('a\nb', option), 'a\nb');
  });

  it('should give empty string for empty lines', () => {
    assert.deepStrictEqual(head('', { option: 'lines', value: 1 }), '');
  });

  it('should give 2 of characters', () => {
    const option = { option: 'character', value: 2 };
    assert.deepStrictEqual(head('a\nb', option), 'a\n');
  });
});

describe('headLines', () => {
  it('should give first 10 lines', () => {
    assert.deepStrictEqual(
      headLines('a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk', 10),
      'a\nb\nc\nd\ne\nf\ng\nh\ni\nj');
  });

  it('should give first 2 lines', () => {
    assert.deepStrictEqual(
      headLines('a\nb\nc', 2), 'a\nb');
  });

  it('should give empty string for empty content', () => {
    assert.deepStrictEqual(
      headLines('', 2), '');
  });
});

describe('headCharacters', () => {
  it('should give first character', () => {
    assert.deepStrictEqual(headCharacters('h', 1), 'h');
  });

  it('should give first two characters', () => {
    assert.deepStrictEqual(headCharacters('a\nb', 2), 'a\n');
  });
});
