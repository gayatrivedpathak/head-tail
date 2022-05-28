# head 
Usage : head [-n lines | -c bytes] [file ...]

```
head [file...]
```
* Displays first lines of a file, default 10 lines.
* If more than a single file is specified, each file is preceded by a header consisting of the string "==> XXX <==" where "XXX" is the name of the file.

```
head -n count [file...]
```
* Displays the first lines of given count for each of the specified files

```
head -c byte [file...]
```
* Displays the first bytes of file content for each of the specified file 
    
<br/>

# tail
Usage : tail [ -r] [ -q] [ -c number | -n number] [file ...]

```
tail [file...]
```
* Display the last part of a file
* The default starting location is "-n 10", or the last 10 lines of the input.
* If more than a single file is specified, each file is preceded by a header consisting of the string "==> XXX <==" where ``XXX'' is the name of the file.

```
tail -n number [file...]
```
* Displays the given number of last lines for each of the specified files 

```
tail -n +number [file...]
```
* Displays the lines starting from given number

```
tail -c number [file...]
```
* Displays the given number of last characters for each of the specified files

```
tail -c +number [file...]
```
* Displays the character starting from given number 

```
tail -q [file...]
```
* Suppresses printing of headers when multiple files are being examined.

```
tail -r [file...]
```
* The -r option causes the input to be displayed in reverse order
