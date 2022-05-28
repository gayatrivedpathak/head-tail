# Tail

TODO:
- [ ] Investigate how tail command works
- [ ] Make tail works on file 
- [ ] Make tail work on single file 
- [ ] change the contract of tail function

MAYBE:

DONE:
- [x] Implement reverse option (-r)
- [x] Make tail work on file content instead of file 
- [x] Implement the -n option on file content 
- [x] Implement the -c option on file content
- [x] Write expectations for tail
- [x] Make testTailLib.js and tailLib.js
- [x] Establish contract for tail
- [x] Change directory structure test/head test/tail src/head src/tail

# Head

TODO:

- [ ] Handle error for invalid options
- [ ] Refactor headMain funtion try to seperate forEach loop in seperate function
- [ ] Test print functionality
- [ ] Rethink structure of object returned from readFile function

MAYBE:

DONE:

- [x] Refactor headFile, reduce the parameters
- [x] Handle no files error
~~- [x] Rethink name of headFile~~
- [x] Consider throwing error when option is coming after the file names
- [x] Test the parseArgs branch from the headMain
- [x] Restructure args data in parsArgs
- [x] Seperate the errorMessages from the functions
- [x] Remove regular expressions
- [x] Consider giving exitcodes from the headMain
- [x] Modify the contract of the formatOutput function instead of multiple fileNames will accept single file
- [x] Handle read file error in the head main
- [x] Mock the console.log and console.error
- [x] Seperate testHeadMain in seperate lib
- ~~[x] Extract slice function~~
- [x] Make head work for multiple files
- [x] Rethink on option object 
- [x] Make head work with options from command line
- [x] Extract getOption and getValue functions from parseArgs
- [x] Make parser for fileName and options 
- [x] Connect head.js to command line
- [x] Extract isOptionfunction for parseArgs
- [x] Implement head for a single file
- [x] Make main function for head
- [x] Seperate string functions in seperate lib
- [x] Implement byte option(-c) for a single file 
- [x] Change contract of headLine, accepts content
- [x] Use object as for options 
- [x] Envestigate how head works for line count is zero
- [x] Envestigate how head works for empty file
- [x] Add test case empty file content
- [x] Implement count option (-n) for a single file content
- [x] Change the contract of headLine function
- [x] Make head work for file content instead of file 
- [x] Test headLine function
- [x] Seperate join and split functions
- [x] Make '\n' as constant
- [x] Seperate 'headLine' to get first 10 lines 
- [x] Make head function work for 2 line
- [x] Head function should give first 10 lines if content exceeding more than 10 lines
- [x] Make head function work for 10 line
- [x] Make headlib.js
- [x] Verify 'mocha' exists
- [x] Make head function work for a line 
- [x] Write test for head
- [x] Make testHeadLib.js
- [x] Make src and test directories