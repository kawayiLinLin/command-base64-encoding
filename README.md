# 命令行编码转换器

A node based command line coding tool

## 安装

```shell
$ npm install command-base64-encoding -g
```

## 基本用法

### 编码

你可以使用 `cbe encode` 命令对文件或字符串进行编码，如

```shell
$ cbe encode -i "这是被编码的字符串"
$ command-base64-encoding encode -i "这是被编码的字符串"
```

```shell
# 解析当前目录下的 test.png 文件为 base64 编码并添加前缀，输出到当前目录下的 test.txt 文件中
$ cbe encode -i ./test.png -w -o ./test.txt
# test.txt 文件中输出 data:image/png;base64,xxxxxxxxxxxx
```

参数

- `-t`、`--type` 编码类型，默认值 `base64`
- `-i`、`--input` 要被编码的字符或文件路径，为可以访问的文件路径时，会读取文件内容输出编码
- `-o`、`--output` 编码结果的输出方式，默认值为 `console`，为默认值时，会直接在控制台打印，否则创建对应路径的文件，在文件中保存输出信息
- `-w`、`--with-mimetype` 当 `-t` 参数为 `base64` 时，输出增加前缀（Data URL Schema）

### 解码

你可以使用 `cbe decode` 命令对文件或字符串进行解码，如

```shell
$ cbe decode -i "6L+Z5piv5rWL6K+VYmFzZTY06L2s5o2i"
$ command-base64-encoding decode -i "6L+Z5piv5rWL6K+VYmFzZTY06L2s5o2i"
# 输出 这是测试base64转换
```

- `-t`、`--type` 解码类型，默认值 `base64`
- `-i`、`--input` 要被解码的字符或文件路径，为可以访问的文件路径时，会读取文件内容输出解码结果
- `-o`、`--output` 解码结果的输出方式，默认值为 `console`，为默认值时，会直接在控制台打印，否则创建对应路径的文件，在文件中保存输出信息

*有前缀的 base64 编码，其前缀中 mimetype 对应的文件后缀名必须与 `-o` 参数中路径的文件后缀一致，其对应关系可通过 `cbe decode mime-type-list` 命令查阅，当解码带前缀的 base64 编码（Data URL Schema）时，`-o` 参数不支持 `console` 值，请设置一个符合规则的文件路径。该操作可由 Data URL Schema 直接创建文件*

### 在 node 中使用

暂不支持在浏览器应用中使用

- 安装

```shell
$ npm install command-base64-encoding -s
```

- 代码示例

```js
const commandBase64Encoding = require("command-base64-encoding");

commandBase64Encoding.base64.encoding("这是测试编码"); // return: 6L+Z5piv5rWL6K+V57yW56CB
commandBase64Encoding.base64.decoding("6L+Z5piv5rWL6K+V57yW56CB"); // return: Buffer<xxxx>

commandBase64Encoding.base32.encoding("这是测试编码"); // return: 5C7ZTZUYV7TLLC7IV6K6PPEW46QIC
```

### 其他

- cbe encode list

获取可编码列表，当前版本支持 base64、base32、base16

- cbe decode list

获取可解码列表，当前版本支持 base64、base32、base16

## 获取帮助

```shell
$ cbe --version # 查看工具版本
$ cbe --help # 获取帮助
$ cbe encode --help # 获取某个命令的帮助
```

## 可编码解码类型说明

### base64

+ **支持编码、解码**

+ 原理

  + 编码原理

    将输入转换为由每字节 8 位二进制（不满 8 位向前面补 0 ）拼接成的长字符串，从索引位 0 开始，每次截取 6 位（最后不满 6 位向后面补 0 ），因为 6 位二进制数最大可表示的十进制数为 63，没有超过 64，并将其（截取的 6 位二进制数）转换为十进制，以这个十进制为索引，在 base64 编码表 （大写字母`A`-`Z`小写字母`a`-`z`，`0`-`9`以及`+`和`\`）中找出对应字符，拼成新字符串

  + 解码原理

    根据 base64 编码表将编码后的字符串转换为十进制数，再由十进制数转换为二进制数 （不足 6 位在前面补 0），并将转换后的二进制数拼接成长字符串，从索引位 0 开始，每次截取 8 位，并转换为 8 位二进制数，再将其转换为其他编码

  + data url 

    格式：`data:[<mime type>]/[charset=<charset>][;base64],<encoded data>`

### base16

+ **支持编码、解码**

+ 原理

  + 编码原理

    同 base64，其每次截取的二进制数为 5，编码表为 `0123456789ABCDEF` 对应十进制的 0 到 15

  + 解码原理

    同 base64

### base32

+ **支持编码、解码**

+ 原理

  + 编码原理

    同 base64，其每次截取的二进制数为 6，编码表为 `ABCDEFGHIJKLMNOPQRSTUVWXYZ234567` 对应十进制的 0 到 31

  + 解码原理

    同 base64
