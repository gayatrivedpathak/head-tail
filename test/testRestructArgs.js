const { standardizeArgs } = require('../src/restructArgs');
const assert = require('assert');

describe('standardizeArgs', () => {
  it('should seperate -n1 option', () => {
    assert.deepStrictEqual(standardizeArgs(['-n1']), ['-n', '1']);
  });

  it('should seperate -1 option', () => {
    assert.deepStrictEqual(standardizeArgs(['-1']), ['-n', '1']);
  });

  it('should seperate -n1 and -n 2 option', () => {
    assert.deepStrictEqual(standardizeArgs(['-n1', '-n', '2']),
      ['-n', '1', '-n', '2']);
  });
});‸
