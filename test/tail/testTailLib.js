const assert = require('assert');
const { tail } = require('../../src/tail/tailLib.js');

describe('tail', () => {
  it('should give the last line', () => {
    assert.deepStrictEqual(tail('hello', 1), 'hello');
    assert.deepStrictEqual(tail('bye', 1), 'bye');
  });

  it('should give the last 1 line', () => {
    assert.deepStrictEqual(tail('hello\nbye', 1), 'bye');
  });

  it('should give the last 2 line', () => {
    assert.deepStrictEqual(tail('hello\nhi\nbye', 2), 'hi\nbye');
  });
});
