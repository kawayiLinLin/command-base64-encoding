const { isString, getLowestCommonMultiple } = require('../utils')

/*
 * 声明一个字符串补 0 函数，传入最小位数和当前需要补 0 的字符串
 * 如二进制字符串不满 8 位（min 传 8），只有 7 位，则返回 '0'，如果它只有 6 位，则返回 '00'
 */
const fillStr = (min, str, filledStr = "0") => new Array(min - str.length).fill(filledStr).join("")

/** 计算基准值，定义 baseint 规范的二进制位数，如 base64 其转为 10 进制不得大于 64，最多只能是 63 */
const calcBaseNum = (int, flag = 0, total = 0) => {
    const current = 1 * Math.pow(2, flag ++) + total
    if (int > current)
        return calcBaseNum(int, flag, current)
    else return flag - 1
}


function createEncodingBaseInt(int, chars) {

  const baseNum = calcBaseNum(int)
  // 最大公倍数，lcm / baseNum 得每组多少个 8bit， base64 -> 4 / base32 -> 8 / base16 -> 2
  const lcm = getLowestCommonMultiple(baseNum, 8)
  /**
   * 编码 base x
   * @param {Buffer | string} input buffer 数据或字符串
   */
  return function encode(input) {
    let buffer = input

    // 如果 buffer 不是 buffer 对象，则转为 buffer 对象
    if (!Buffer.isBuffer(buffer)) {
      buffer = Buffer.from(buffer)
    }

    // 将 buffer 对象转为数组
    const _10Arr = Array.from(buffer)
    // 将 bufferOfStr 生成一整个二进制字符串
    let _2Str = _10Arr.reduce((prevTotal, curr) => {
      // 10 进制转为 2 进制
      let _cur2Str = curr.toString(2)

      // 不足 8 位则往前面补 0
      if (_cur2Str.length < 8) {
        _cur2Str = fillStr(8, _cur2Str) + _cur2Str
      }

      return prevTotal + _cur2Str
    }, "")

    // 声明一个结果字符串，encodeBase64 函数最后返回的就是 result
    let result = ""
    let _2CurrentLength = 0

    // 当 _2Str 为空时，停止循环，循环体内操作 _2Str
    while (_2Str) {
      // 将 _2Str 的前面 6 位提取出来
      let current2Str = _2Str.slice(0, baseNum)

      // 如果最后一次不足 6 位，则往后面补 0
      if (current2Str.length < baseNum) {
        current2Str += fillStr(baseNum, current2Str)
      }

      _2CurrentLength += current2Str.length

      // _2Str 赋值为 _2Str 的第6位之后的字符串
      _2Str = _2Str.substr(baseNum, _2Str.length)
      // 将 2 进制的 current2Str 转为 10进制，作为编码字符串的索引，在其中查找字符，然后累加到 result 上
      result += chars[parseInt(current2Str, 2)]
    }

    // 补等号处理
    // 用最大公倍数 求还需要多少字节才能把组分完，然后除以 baseNum 求出需要多少组，就是需要补的等号的数量
    const equalCount = (lcm - ((_2CurrentLength % lcm) || lcm)) / baseNum

    result += fillStr(result.length + equalCount, result, "=")

    // 循环结束，返回生成的 base64 编码
    return result
  }
}

function createDecodingBaseInt(int, charsMap) {
    const baseNum = calcBaseNum(int)
    /**
     * 解码 base x
     */
    return function decode(input) {
        if (!isString(input))
        input = Buffer.from(input).toString()
    
        let _2Str = ""
    
        for (let i = 0; i < input.length; i++) {
            const char = input[i]
            if (char === '=') continue

            const charIndex = charsMap.get(char)

            if (charIndex === undefined) throw new Error('error: unsupport input: ' + char)

            let _current2Str = charIndex.toString(2)
        
            _current2Str.length < baseNum &&
                (_current2Str = fillStr(baseNum, _current2Str) + _current2Str)
            _2Str += _current2Str
        }
        const _10Arr = []
    
        while (_2Str) {
            let current2Str = _2Str.slice(0, 8)
            _10Arr.push(parseInt(current2Str, 2))
        
            _2Str = _2Str.substr(8, _2Str.length)
        }
    
        return Buffer.from(_10Arr)
    }
  
}


module.exports = { 
    createEncodingBaseInt,
    createDecodingBaseInt
}