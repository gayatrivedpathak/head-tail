const assert = require('assert');
const headMainLib = require('../../src/head/headLib');

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
  const { headMain } = headMainLib;
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
    assert.strictEqual(headMain(fileReader, loggers, ['./a.txt']), 0);
  });

  it('should print the first 2 lines of given file', () => {
    const fileReader = mockReadFileSync({ './a.txt': 'a\nb\nc' });
    const logs = [];
    const stdOut = mockConsole(logs, 'a\nb');
    const errors = [];
    const stdErr = mockConsole(errors);
    assert.strictEqual(
      headMain(fileReader, { stdOut, stdErr }, ['-n', '2', './a.txt']),
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
      headMain(fileReader, loggers, ['-c', '3', './a.txt']), 0);
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
    assert.strictEqual(
      headMain(fileReader, loggers, ['./a.txt', './b.txt']),
      0);
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
      headMain(fileReader, loggers, ['-n', '1', './a.txt', './b.txt']),
      0);
  });

  it('should print error for an unexisting file', () => {
    const fileReader = mockReadFileSync({});
    const logs = [];
    const errors = [];
    const loggers = {
      stdOut: mockConsole(logs),
      stdErr: mockConsole(errors, 'head: ./b.txt: No such file or directory')
    };
    assert.strictEqual(
      headMain(fileReader, loggers, ['-n', '1', './b.txt']), 1);
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
        headMain(fileReader, loggers, ['-n', '1', './b.txt']),
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
      headMain(fileReader, loggers, ['-n', '1', '-c1', './b.txt']),
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
      headMain(fileReader, loggers, ['-n', '0', './b.txt']),
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
      headMain(fileReader, loggers, ['-q', '0', './b.txt']),
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
      headMain(fileReader, loggers, ['-n', '1']), 1);
  });
});

describe('headFile', () => {
  const { headOfFile } = headMainLib;

  it('should give headContent of a given file', () => {
    const fileReader = mockReadFileSync({ './a.txt': 'a\nb\nc' });
    const options = { option: 'lines', value: 2 };
    assert.deepStrictEqual(headOfFile('./a.txt', options, fileReader),
      { headContent: 'a\nb', fileName: './a.txt' });
  });

  it('should give error if file not exist', () => {
    const fileReader = mockReadFileSync({ './a.txt': 'a\nb\nc' });
    const options = { option: 'lines', value: 2 };
    assert.deepStrictEqual(headOfFile('./b.txt', options, fileReader),
      {
        error: {
          message: 'head: ./b.txt: No such file or directory',
          fileName: './b.txt',
          name: 'fileReadError'
        },
        fileName: './b.txt'
      });
  });
});

describe('readFile', () => {
  const { readFile } = headMainLib;

  it('should give content if file is exist', () => {
    const mockedReadFileSync = mockReadFileSync({ './a.txt': 'a\nb\nc', });
    assert.deepStrictEqual(readFile(mockedReadFileSync, './a.txt'),
      { content: 'a\nb\nc' });
  });

  it('should throw error if file not exist', () => {
    const mockedReadFileSync = mockReadFileSync({ './a.txt': 'a\nb\nc', });
    assert.deepStrictEqual(readFile(mockedReadFileSync, './b.txt'),
      {
        error: {
          message: 'head: ./b.txt: No such file or directory',
          fileName: './b.txt',
          name: 'fileReadError'
        }
      });
  });
});

describe('print', () => {
  const { print, singleFileFormatter, multiFileFormatter } = headMainLib;

  it('should print the head of single file on output stream', () => {
    const logs = [];
    const errors = [];
    const loggers = {
      stdOut: mockConsole(logs, 'a'),
      stdErr: mockConsole(errors)
    };
    const headOfFiles = [{ headContent: 'a', fileName: './b.txt' }];
    print(headOfFiles, loggers, singleFileFormatter);
    assert.deepStrictEqual(logs, ['a']);
  });

  it('should print the head of multiple files on output stream', () => {
    const logs = [];
    const errors = [];
    const loggers = {
      stdOut: mockConsole(logs, '==> ./b.txt <==\na', '==> ./a.txt <==\nb'),
      stdErr: mockConsole(errors)
    };
    const headOfFiles = [
      { headContent: 'a', fileName: './b.txt' },
      { headContent: 'b', fileName: './a.txt' }
    ];
    print(headOfFiles, loggers, multiFileFormatter);
    const expectedLogs = ['==> ./b.txt <==\na', '==> ./a.txt <==\nb'];
    assert.deepStrictEqual(logs, expectedLogs);
  });

  it('should print the error on error stream', () => {
    const logs = [];
    const errors = [];
    const loggers = {
      stdOut: mockConsole(logs),
      stdErr: mockConsole(errors, 'head: ./b.txt:No such file or directory')
    };
    const headOfFiles = [
      { error: { message: 'head: ./b.txt:No such file or directory' } }
    ];
    print(headOfFiles, loggers, singleFileFormatter);
    assert.deepStrictEqual(
      errors,
      ['head: ./b.txt:No such file or directory']);
  });
});
