const fs = require('fs');
const { headMain } = require('./src/headLib.js');

const main = () => {
  const loggers = { stdOut: console.log, stdErr: console.error };
  const exitCode = headMain(fs.readFileSync, loggers, ...process.argv.slice(2));
  process.exit(exitCode);
};

main();
