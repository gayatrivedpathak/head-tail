const assert = require('assert');
const { head } = require('../src/headLib');

describe('head', () => {
  it('should give a line ', () => {
    assert.deepStrictEqual(head('hello'), 'hello');
    assert.deepStrictEqual(head('bye'), 'bye');
  });
});
