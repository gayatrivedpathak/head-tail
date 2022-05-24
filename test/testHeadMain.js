const assert = require('assert');
const { headMain, headFile, readFile } = require('../src/headLib');

const mockReadFileSync = (files) => {
  return (fileName, encoding) => {
    assert.deepStrictEqual(true, Object.keys(files).includes(fileName));
    assert.deepStrictEqual(encoding, 'utf8');
    return files[fileName];
  };
};

const mockConsole = (inputs, ...expectedArgs) => {
  let index = 0;
  return (arg) => {
    assert.deepStrictEqual(arg, expectedArgs[index]);
    inputs.push(arg);
    index++;
  };
};

describe('headMain', () => {
  it('should print the first 10 lines of given file', () => {
    const fileReader = mockReadFileSync(
      { './a.txt': 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj' }
    );
    const logs = [];
    const logger = mockConsole(logs, 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj');
    const errors = [];
    const errorLogger = mockConsole(errors, []);
    headMain(fileReader, logger, errorLogger, './a.txt');
    assert.deepStrictEqual(logs, ['a\nb\nc\nd\ne\nf\ng\nh\ni\nj']);
    assert.deepStrictEqual(errors, []);
  });

  it('should print the first 2 lines of given file', () => {
    const fileReader = mockReadFileSync({ './a.txt': 'a\nb\nc' });
    const logs = [];
    const logger = mockConsole(logs, 'a\nb');
    const errors = [];
    const errorLogger = mockConsole(errors, []);
    headMain(fileReader, logger, errorLogger, '-n', '2', './a.txt');
    assert.deepStrictEqual(logs, ['a\nb']);
    assert.deepStrictEqual(errors, []);
  });

  it('should print the first 3 characters of given file', () => {
    const fileReader = mockReadFileSync(
      { './a.txt': 'a\nb\nc' }
    );
    const logs = [];
    const logger = mockConsole(logs, 'a\nb');
    const errors = [];
    const errorLogger = mockConsole(errors, []);
    headMain(fileReader, logger, errorLogger, '-c', '3', './a.txt');
    assert.deepStrictEqual(logs, ['a\nb']);
    assert.deepStrictEqual(errors, []);
  });

  it('should print 10 lines for two files', () => {
    const fileReader = mockReadFileSync(
      {
        './a.txt': 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj',
        './b.txt': 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj'
      }
    );
    const logs = [];
    const logger = mockConsole(logs,
      '==> ./a.txt <==\na\nb\nc\nd\ne\nf\ng\nh\ni\nj',
      '==> ./b.txt <==\na\nb\nc\nd\ne\nf\ng\nh\ni\nj');
    const errors = [];
    const errorLogger = mockConsole(errors, []);
    headMain(fileReader, logger, errorLogger, './a.txt', './b.txt');
    const expectedLog = ['==> ./a.txt <==\na\nb\nc\nd\ne\nf\ng\nh\ni\nj',
      '==> ./b.txt <==\na\nb\nc\nd\ne\nf\ng\nh\ni\nj'];
    assert.deepStrictEqual(logs, expectedLog);
    assert.deepStrictEqual(errors, []);
  });

  it('should print 1 line for two files', () => {
    const fileReader = mockReadFileSync({
      './a.txt': 'a\nb\nc', './b.txt': 'a\nb\nc'
    });
    const logs = [];
    const logger = mockConsole(logs,
      '==> ./a.txt <==\na',
      '==> ./b.txt <==\na');
    const errors = [];
    const errorLogger = mockConsole(errors, []);
    headMain(fileReader, logger, errorLogger, '-n', '1', './a.txt', './b.txt');
    const expectedLog = ['==> ./a.txt <==\na',
      '==> ./b.txt <==\na'];
    assert.deepStrictEqual(logs, expectedLog);
    assert.deepStrictEqual(errors, []);
  });

  it('should print error for an unexisting file', () => {
    const fileReader = mockReadFileSync({});
    const logs = [];
    const logger = mockConsole(logs);
    const errors = [];
    const errorLogger = mockConsole(errors,
      'head: ./b.txt: No such file or directory');
    headMain(fileReader, logger, errorLogger, '-n', '1', './b.txt');
    const expectedErrorLog = ['head: ./b.txt: No such file or directory'];
    assert.deepStrictEqual(logs, []);
    assert.deepStrictEqual(errors, expectedErrorLog);
  });

  it('should print 1 line for existing file and an error for unexisting file',
    () => {
      const fileReader = mockReadFileSync({ './a.txt': 'a\nb\nc' });
      const logs = ['==> ./a.txt <==\na'];
      const logger = mockConsole(logs, '==> ./a.txt <==\na');
      const errors = [];
      const errorLogger = mockConsole(errors,
        'head: ./b.txt: No such file or directory');
      headMain(fileReader, logger, errorLogger, '-n', '1', './b.txt');
      const expectedErrorLog = ['head: ./b.txt: No such file or directory'];
      const expectedLog = ['==> ./a.txt <==\na'];
      assert.deepStrictEqual(logs, expectedLog);
      assert.deepStrictEqual(errors, expectedErrorLog);
    });
});

describe('headFile', () => {
  it('should give content of an existing file', () => {
    const fileReader = mockReadFileSync({ './a.txt': 'a\nb\nc' });
    const errors = [];
    const errorLogger = mockConsole(errors, []);
    assert.deepStrictEqual(headFile(
      fileReader, './a.txt', { option: 'lines', value: 2 }, errorLogger), 'a\nb');
    assert.deepStrictEqual(headFile(
      fileReader, './a.txt', { option: 'character', value: 2 }, errorLogger), 'a\n');
  });

  it('should log error if file not exist', () => {
    const mockedFileReader = mockReadFileSync({ './a.txt': 'a\nb\nc' });
    const errors = [];
    const errorLogger = mockConsole(errors, 'head: ./b.txt: No such file or directory');
    headFile(
      mockedFileReader, './b.txt', { option: 'lines', value: 2 }, errorLogger);
    assert.deepStrictEqual(errors, ['head: ./b.txt: No such file or directory']);
  });
});

describe('readFile', () => {
  it('should give content if file is exist', () => {
    const mockedReadFileSync = mockReadFileSync({ './a.txt': 'a\nb\nc', });
    assert.deepStrictEqual(readFile(mockedReadFileSync, './a.txt'), 'a\nb\nc');
  });

  it('should throw error if file not exist', () => {
    const mockedReadFileSync = mockReadFileSync({ './a.txt': 'a\nb\nc', });
    assert.throws(() => readFile(mockedReadFileSync, './b.txt'),
      { message: 'head: ./b.txt: No such file or directory' });
  });
});
