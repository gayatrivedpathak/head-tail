const fs = require('fs');
const { headMain } = require('./src/head/headLib.js');

const main = (cmdArgs) => {
  const loggers = { stdOut: console.log, stdErr: console.error };
  const exitCode = headMain(fs.readFileSync, loggers, cmdArgs);
  process.exitCode = exitCode;
};

main(process.argv.slice(2));
