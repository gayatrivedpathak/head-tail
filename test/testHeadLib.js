const assert = require('assert');
const { head } = require('../src/headLib');

describe('head', () => {
  it('should give a line ', () => {
    assert.deepStrictEqual(head('hello'), 'hello');
    assert.deepStrictEqual(head('bye'), 'bye');
  });

  it('should give two lines', () => {
    assert.deepStrictEqual(head('hello\nbye'), 'hello\nbye');
    assert.deepStrictEqual(head('hello\nbye'), 'hello\nbye');
  });

  it('should give first 10 lines', () => {
    assert.deepStrictEqual(head('a\nb\nc\nd\ne\nf\ng\nh\ni\nj'),
      'a\nb\nc\nd\ne\nf\ng\nh\ni\nj');
    assert.deepStrictEqual(head('a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk'),
      'a\nb\nc\nd\ne\nf\ng\nh\ni\nj');
  });
});
