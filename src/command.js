const mime = require("mime")

const createEncoding = require("./createEncoding")
const createDecoding = require("./createDecoding")
const config = require("../config")

module.exports = {
  encode: createEncoding,
  decode: createDecoding,
  "encode-list": () => {
    console.log(config.getEncodingList())
  },
  "decode-list": () => {
    console.log(config.getDecodingList())
  },
  "decode-mime-type-list": async () => {
    console.log('【Tip】输入打印全部，则打印全部的mime-type')
    console.log('【Tip】输入搜索，则进入搜索，搜索模式不输入直接回车则结束')

    const readline = require("readline")

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    const mimeTypeKeys = Object.keys(mime._extensions)
    const mimeTypeValues = Object.values(mime._extensions)
    const extensionsReverse = {}

    mimeTypeKeys.map(key => {
        const value = mime._extensions[key]
        extensionsReverse[value] = key
    })

    const ask = (q) => new Promise((r) => rl.question(q, r)) 

    const type = await ask('请输入“打印全部”或“搜索”：\n')
    if (!type) return rl.close()
    if (type === '打印全部' || type === 'print-all') {
        console.log(mime._extensions)
        return rl.close()
    }
    if (type === '搜索' || type === 'search') {
        while (true) {
            const keyword = await ask('请输入搜索关键词：\n')
            if (!keyword) return rl.close()
            const result = {}
            mimeTypeKeys.forEach(key => {
                if (key.includes(keyword)) {
                    result[key] = mime._extensions[key]
                }
            })
            mimeTypeValues.forEach(value => {
                if (value.includes(keyword)) {
                    result[value] = extensionsReverse[value]
                }
            })
            rl.close()
            console.log(result)
        }

    }
  },
};
