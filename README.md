# Lexer4JS

![GitHub top language](https://img.shields.io/github/languages/top/DavidArutiunian/lexer4js.svg)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/DavidArutiunian/lexer4js.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/DavidArutiunian/lexer4js.svg)
[![TLOC](https://tokei.rs/b1/github/DavidArutiunian/lexer4js)](https://github.com/DavidArutiunian/lexer4js)
![Node.js CI](https://github.com/DavidArutiunian/lexer4js/workflows/Node.js%20CI/badge.svg)

## Getting Started

### 📃 Create an input file with some code

You can find code example in `test/test.txt`

```bash
$ cat test/test.txt > input.txt
```

Or you can link the test file

Linux:

```bash
$ ln -s test/test.txt input.txt
```

Windows:

```cmd
$ mklink input.txt test/test.txt
```

### 🚀 Run lexer

Pass the file with code to lexer

```bash
$ yarn build
$ yarn exec input.txt
```

You should get something like this

```
CLASS 'class' [L1:0]
IDENTIFIER 'Foo' [L1:6]
OPENING_CURLY_BRACE '{' [L1:10]
PRIVATE 'private' [L2:4]
DOUBLE 'double' [L2:12]
IDENTIFIER 'big' [L2:19]
ASSIGNMENT '=' [L2:23]
SCIENTIFIC_LITERAL '3.2e+23' [L2:25]
SEMICOLON ';' [L2:32]
PRIVATE 'private' [L3:4]
DOUBLE 'double' [L3:12]
IDENTIFIER 'small' [L3:19]
ASSIGNMENT '=' [L3:25]
SUBTRACTION '-' [L3:27]
SCIENTIFIC_LITERAL '4.70e-9' [L3:28]
SEMICOLON ';' [L3:35]
PRIVATE 'private' [L5:4]
IDENTIFIER 'String' [L5:12]
IDENTIFIER 'message' [L5:19]
ASSIGNMENT '=' [L5:27]
STRING_LITERAL '"FooBarBaz"' [L5:29]
SEMICOLON ';' [L5:40]
PRIVATE 'private' [L6:4]
IDENTIFIER 'char' [L6:12]
IDENTIFIER 'newline' [L6:17]
ASSIGNMENT '=' [L6:25]
CHAR_LITERAL ''\n'' [L6:27]
SEMICOLON ';' [L6:31]
PRIVATE 'private' [L8:4]
INT 'int' [L8:12]
IDENTIFIER 'hex' [L8:16]
ASSIGNMENT '=' [L8:20]
HEX_LITERAL '0x0A0B0C' [L8:22]
SEMICOLON ';' [L8:30]
PRIVATE 'private' [L9:4]
INT 'int' [L9:12]
IDENTIFIER 'octal' [L9:16]
ASSIGNMENT '=' [L9:22]
OCTAL_LITERAL '0737' [L9:24]
SEMICOLON ';' [L9:28]
PRIVATE 'private' [L10:4]
INT 'int' [L10:12]
IDENTIFIER 'binary' [L10:16]
ASSIGNMENT '=' [L10:23]
BINARY_LITERAL '0b01001001110' [L10:25]
SEMICOLON ';' [L10:38]
PRIVATE 'private' [L12:4]
IDENTIFIER 'String' [L12:12]
IDENTIFIER 'multiline' [L12:19]
ASSIGNMENT '=' [L12:29]
MULTILINE_STRING_LITERAL '"""
        Hello, World!
        Who I am?
    """' [L12:31]
SEMICOLON ';' [L15:7]
PUBLIC 'public' [L21:4]
VOID 'void' [L21:11]
IDENTIFIER 'main' [L21:16]
OPENING_BRACE '(' [L21:20]
IDENTIFIER 'String' [L21:21]
OPENING_SQUARE_BRACE '[' [L21:27]
CLOSING_SQUARE_BRACE ']' [L21:28]
IDENTIFIER 'args' [L21:30]
CLOSING_BRACE ')' [L21:34]
OPENING_CURLY_BRACE '{' [L21:36]
INT 'int' [L22:8]
IDENTIFIER 'size' [L22:12]
ASSIGNMENT '=' [L22:17]
INT_LITERAL '3' [L22:19]
SEMICOLON ';' [L22:20]
INT 'int' [L23:8]
OPENING_SQUARE_BRACE '[' [L23:12]
IDENTIFIER 'size' [L23:13]
CLOSING_SQUARE_BRACE ']' [L23:17]
IDENTIFIER 'array' [L23:19]
ASSIGNMENT '=' [L23:25]
OPENING_CURLY_BRACE '{' [L23:27]
INT_LITERAL '1' [L23:29]
COMMA ',' [L23:30]
INT_LITERAL '2' [L23:32]
COMMA ',' [L23:33]
INT_LITERAL '3' [L23:35]
CLOSING_CURLY_BRACE '}' [L23:37]
SEMICOLON ';' [L23:38]
INT 'int' [L24:8]
IDENTIFIER 'index' [L24:12]
ASSIGNMENT '=' [L24:18]
INT_LITERAL '0' [L24:20]
SEMICOLON ';' [L24:21]
FLOAT 'float' [L25:8]
IDENTIFIER 'e' [L25:14]
ASSIGNMENT '=' [L25:16]
DOUBLE_LITERAL '2.73' [L25:18]
SEMICOLON ';' [L25:22]
WHILE 'while' [L26:8]
OPENING_BRACE '(' [L26:14]
IDENTIFIER 'index' [L26:15]
NOT_EQUALS '!=' [L26:21]
INT_LITERAL '0' [L26:24]
CLOSING_BRACE ')' [L26:25]
OPENING_CURLY_BRACE '{' [L26:27]
IDENTIFIER 'index' [L27:12]
ASSIGNMENT '=' [L27:18]
IDENTIFIER 'index' [L27:20]
SUBTRACTION '-' [L27:26]
INT_LITERAL '1' [L27:28]
SEMICOLON ';' [L27:29]
IDENTIFIER 'var' [L28:12]
IDENTIFIER 'coefficient' [L28:16]
ASSIGNMENT '=' [L28:28]
IDENTIFIER 'big' [L28:30]
MULTIPLICATION '*' [L28:34]
IDENTIFIER 'small' [L28:36]
DIVISION '/' [L28:42]
IDENTIFIER 'hex' [L28:44]
SEMICOLON ';' [L28:47]
IDENTIFIER 'println' [L29:12]
OPENING_BRACE '(' [L29:19]
IDENTIFIER 'message' [L29:20]
COMMA ',' [L29:27]
IDENTIFIER 'array' [L29:29]
OPENING_SQUARE_BRACE '[' [L29:34]
IDENTIFIER 'index' [L29:35]
CLOSING_SQUARE_BRACE ']' [L29:40]
MULTIPLICATION '*' [L29:42]
IDENTIFIER 'coefficient' [L29:44]
COMMA ',' [L29:55]
IDENTIFIER 'newline' [L29:57]
CLOSING_BRACE ')' [L29:64]
SEMICOLON ';' [L29:65]
CLOSING_CURLY_BRACE '}' [L30:8]
FOR 'for' [L31:8]
OPENING_BRACE '(' [L31:12]
IDENTIFIER 'var' [L31:13]
IDENTIFIER 'num' [L31:17]
COLON ':' [L31:21]
IDENTIFIER 'array' [L31:23]
CLOSING_BRACE ')' [L31:28]
OPENING_CURLY_BRACE '{' [L31:30]
IDENTIFIER 'var' [L32:12]
IDENTIFIER 'coefficient' [L32:16]
ASSIGNMENT '=' [L32:28]
IDENTIFIER 'big' [L32:30]
MULTIPLICATION '*' [L32:34]
IDENTIFIER 'small' [L32:36]
DIVISION '/' [L32:42]
IDENTIFIER 'hex' [L32:44]
SEMICOLON ';' [L32:47]
IDENTIFIER 'println' [L33:12]
OPENING_BRACE '(' [L33:19]
IDENTIFIER 'message' [L33:20]
COMMA ',' [L33:27]
IDENTIFIER 'num' [L33:29]
MULTIPLICATION '*' [L33:33]
IDENTIFIER 'coefficient' [L33:35]
COMMA ',' [L33:46]
IDENTIFIER 'newline' [L33:48]
CLOSING_BRACE ')' [L33:55]
SEMICOLON ';' [L33:56]
CLOSING_CURLY_BRACE '}' [L34:8]
IDENTIFIER 'var' [L35:8]
IDENTIFIER 'secret' [L35:12]
ASSIGNMENT '=' [L35:19]
IDENTIFIER 'hex' [L35:21]
XOR '^' [L35:25]
IDENTIFIER 'octal' [L35:27]
XOR '^' [L35:33]
IDENTIFIER 'binary' [L35:35]
SEMICOLON ';' [L35:41]
IDENTIFIER 'println' [L36:8]
OPENING_BRACE '(' [L36:15]
IDENTIFIER 'secret' [L36:16]
CLOSING_BRACE ')' [L36:22]
SEMICOLON ';' [L36:23]
CLOSING_CURLY_BRACE '}' [L37:4]
CLOSING_CURLY_BRACE '}' [L38:0]
```
