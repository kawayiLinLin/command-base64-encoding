# 命令行编码转换器

A node based command line coding tool

## 安装

```shell
npm install command-base64-encoding -g
```

## 基本用法

### 编码

你可以使用 `cbe encode` 命令对文件或字符串进行编码，如

```shell
cbe encode -i "这是被编码的字符串"
command-base64-encoding encode -i "这是被编码的字符串"
```

```shell
# 解析当前目录下的 test.png 文件为 base64 编码并添加前缀，输出到当前目录下的 test.txt 文件中
cbe encode -i ./test.png -w -o ./test.txt
# test.txt 文件中输出 data:image/png;base64,xxxxxxxxxxxx
```

参数

+ `-t`、`--type` 编码类型，默认值 `base64`
+ `-i`、`--input` 要被编码的字符或文件路径，为可以访问的文件路径时，会读取文件内容输出编码
+ `-o`、`--output` 编码结果的输出方式，默认值为 `console`，为默认值时，会直接在控制台打印，否则创建对应路径的文件，在文件中保存输出信息
+ `-w`、`--with-mimetype` 当 `-t` 参数为 `base64` 时，输出增加前缀（Data URL Schema）

### 解码

你可以使用 `cbe decode` 命令对文件或字符串进行解码，如

```shell
cbe decode -i "6L+Z5piv5rWL6K+VYmFzZTY06L2s5o2i"
command-base64-encoding decode -i "6L+Z5piv5rWL6K+VYmFzZTY06L2s5o2i"
# 输出 这是测试base64转换
```

+ `-t`、`--type` 解码类型，默认值 `base64`，暂不支持有前缀的 `base64` 解码
+ `-i`、`--input` 要被解码的字符或文件路径，为可以访问的文件路径时，会读取文件内容输出解码结果
+ `-o`、`--output` 解码结果的输出方式，默认值为 `console`，为默认值时，会直接在控制台打印，否则创建对应路径的文件，在文件中保存输出信息


## 其他

+ cbe encode list

获取可编码列表，当前版本支持 base64、base32、base16

+ cbe decode list

获取可解码列表，当前版本支持 base64、base32、base16

### 获取帮助

```shell
cbe --version # 查看工具版本
cbe --help # 获取帮助
cbe encode --help # 获取某个命令的帮助
```


## type 参数取值

### base64

### base16


### base32