const assert = require('assert');
const { tail, tailLines, tailCharacters } = require('../../src/tail/tailLib.js');

describe('tail', () => {
  it('should give the last 1 line', () => {
    const subOption = { flag: 'lines', value: 1, isReverse: false };
    assert.deepStrictEqual(tail('hello\nbye', subOption), 'bye');
    assert.deepStrictEqual(tail('bye', subOption), 'bye');
  });

  it('should give the last 2 lines', () => {
    const subOption = { flag: 'lines', value: 2, isReverse: false };
    assert.deepStrictEqual(tail('hello\nhi\nbye', subOption), 'hi\nbye');
  });

  it('should give last 2 characters', () => {
    const subOption = { flag: 'character', value: 2, isReverse: false };
    assert.deepStrictEqual(tail('hello', subOption), 'lo');
  });
});

describe('tailLines', () => {
  it('should give last two lines', () => {
    assert.deepStrictEqual(tailLines('hello\nhii\nbye', 2), 'hii\nbye');
  });

  it('should give last one line', () => {
    assert.deepStrictEqual(tailLines('hello\nhii', 1), 'hii');
  });

  it('should give all content if line count > number of lines', () => {
    assert.deepStrictEqual(tailLines('hello\nhii', 3), 'hello\nhii');
  });
});

describe('tailCharacters', () => {
  it('should give last 1 characters', () => {
    assert.deepStrictEqual(tailCharacters('hello', 1), 'o');
  });

  it('should give last 3 characters', () => {
    assert.deepStrictEqual(tailCharacters('hello', 3), 'llo');
  });

  it('should give all content if character count > number of character', () => {
    assert.deepStrictEqual(tailLines('hello', 2), 'hello');
  });
});
