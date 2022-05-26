const assert = require('assert');
const { headMain, headFile, readFile } = require('../../src/head/headLib');

const mockReadFileSync = (files) => {
  return (fileName, encoding) => {
    assert.ok(files[fileName]);
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
    const errors = [];
    const loggers = {
      stdOut: mockConsole(logs, 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj'),
      stdErr: mockConsole(errors)
    };
    assert.strictEqual(headMain(fileReader, loggers, './a.txt'), 0);
  });

  it('should print the first 2 lines of given file', () => {
    const fileReader = mockReadFileSync({ './a.txt': 'a\nb\nc' });
    const logs = [];
    const stdOut = mockConsole(logs, 'a\nb');
    const errors = [];
    const stdErr = mockConsole(errors);
    assert.strictEqual(
      headMain(fileReader, { stdOut, stdErr }, '-n', '2', './a.txt'),
      0);
  });

  it('should print the first 3 characters of given file', () => {
    const fileReader = mockReadFileSync({ './a.txt': 'a\nb\nc' });
    const logs = [];
    const errors = [];
    const loggers = {
      stdOut: mockConsole(logs, 'a\nb'),
      stdErr: mockConsole(errors)
    };
    assert.strictEqual(
      headMain(fileReader, loggers, '-c', '3', './a.txt'), 0);
  });

  it('should print 10 lines for two files', () => {
    const fileReader = mockReadFileSync({
      './a.txt': 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj',
      './b.txt': 'a\nb\nc\nd\ne\nf\ng\nh\ni\nj'
    });
    const logs = [];
    const errors = [];
    const loggers = {
      stdOut: mockConsole(logs, '==> ./a.txt <==\na\nb\nc\nd\ne\nf\ng\nh\ni\nj',
        '==> ./b.txt <==\na\nb\nc\nd\ne\nf\ng\nh\ni\nj'),
      stdErr: mockConsole(errors)
    };
    assert.strictEqual(headMain(fileReader, loggers, './a.txt', './b.txt'), 0);
  });

  it('should print 1 line for two files', () => {
    const fileReader = mockReadFileSync({
      './a.txt': 'a\nb\nc', './b.txt': 'a\nb\nc'
    });
    const logs = [];
    const errors = [];
    const loggers = {
      stdOut: mockConsole(logs, '==> ./a.txt <==\na', '==> ./b.txt <==\na'),
      stdErr: mockConsole(errors)
    };
    assert.strictEqual(
      headMain(fileReader, loggers, '-n', '1', './a.txt', './b.txt'),
      0);
  });

  it('should print error for an unexisting file', () => {
    const fileReader = mockReadFileSync({});
    const logs = [];
    const errors = [];
    const loggers = {
      stdOut: mockConsole(logs),
      stdErr: mockConsole(errors, ['head: ./b.txt: No such file or directory'])
    };
    assert.strictEqual(headMain(fileReader, loggers, '-n', '1', './b.txt'), 1);
  });

  it('should print 1 line for existing file and an error for unexisting file',
    () => {
      const fileReader = mockReadFileSync({ './a.txt': 'a\nb\nc' });
      const logs = [];
      const errors = [];
      const loggers = {
        stdOut: mockConsole(logs, '==> ./a.txt <==\na'),
        stdErr: mockConsole(errors, 'head: ./b.txt: No such file or directory')
      };
      assert.strictEqual(
        headMain(fileReader, loggers, '-n', '1', './b.txt'),
        1);
    });

  it('should print error when -c and -n options combined', () => {
    const fileReader = mockReadFileSync({ './a.txt': 'a\nb\nc' });
    const logs = [];
    const errors = [];
    const loggers = {
      stdOut: mockConsole(logs, '==> ./a.txt <==\na'),
      stdErr: mockConsole(errors, 'head: can\'t combine line and byte counts')
    };
    assert.strictEqual(
      headMain(fileReader, loggers, '-n', '1', '-c1', './b.txt'),
      1);
  });

  it('should print error when value of option is 0', () => {
    const fileReader = mockReadFileSync({ './a.txt': 'a\nb\nc' });
    const logs = [];
    const errors = [];
    const loggers = {
      stdOut: mockConsole(logs, '==> ./a.txt <==\na'),
      stdErr: mockConsole(errors, 'head: illegal line count -- 0')
    };
    assert.strictEqual(
      headMain(fileReader, loggers, '-n', '0', './b.txt'),
      1);
  });

  it('should print error invalid option is provided', () => {
    const fileReader = mockReadFileSync({ './a.txt': 'a\nb\nc' });
    const logs = [];
    const errors = [];
    const loggers = {
      stdOut: mockConsole(logs, '==> ./a.txt <==\na'),
      stdErr: mockConsole(errors,
        'head: illegal option -- q\nusage: head[-n lines | -c bytes][file ...]')
    };
    assert.strictEqual(
      headMain(fileReader, loggers, '-q', '0', './b.txt'),
      1);
  });

  it('should print usage if files not given', () => {
    const fileReader = mockReadFileSync({ './a.txt': 'a\nb\nc' });
    const logs = [];
    const errors = [];
    const loggers = {
      stdOut: mockConsole(logs),
      stdErr: mockConsole(errors,
        'usage: head[-n lines | -c bytes][file ...]')
    };
    assert.strictEqual(
      headMain(fileReader, loggers, '-n', '1'), 1);
  });
});

describe('headFile', () => {
  it('should give 0 as exit code for an existing file', () => {
    const fileReader = mockReadFileSync({ './a.txt': 'a\nb\nc' });
    const errors = [];
    const logs = [];
    const loggers = {
      stdOut: mockConsole(logs, 'a\nb'),
      stdErr: mockConsole(errors)
    };
    const identity = (content) => content;
    const options = { option: 'lines', value: 2 };
    assert.deepStrictEqual(
      headFile(fileReader, './a.txt', options, loggers, identity),
      0);
  });

  it('should give 1 as exit code if file not exist', () => {
    const fileReader = mockReadFileSync({ './a.txt': 'a\nb\nc' });
    const errors = [];
    const logs = [];
    const loggers = {
      stdOut: mockConsole(logs, 'a\nb'),
      stdErr: mockConsole(errors, 'head: ./b.txt: No such file or directory')
    };
    const options = { option: 'lines', value: 2 };
    const identity = (content) => content;
    assert.strictEqual(
      headFile(fileReader, './b.txt', options, loggers, identity),
      1);
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
