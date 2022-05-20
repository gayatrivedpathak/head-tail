# head 
Usage : head [-n lines | -c bytes] [file ...]

```
head [file...]
    Displays first lines of a file
    default 10 lines.
    If more than a single file is specified, each file is preceded by a header consisting of the string ``==> XXX <=='' where ``XXX'' is the name of the file.

head -n count [file...]
    Displays the first lines of given count for each of the specified files

head -c byte [file...]
    Displays the first bytes of file content for each of the specified file 
    
```