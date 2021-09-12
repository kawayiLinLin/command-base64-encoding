const path = require('path')

function isFunction(val) {
    return typeof val === 'function'
}

function isString(val) {
    return typeof val === 'string'
}

function isBoolean(val) {
    return typeof val === 'boolean'
}

function isNumber(val) {
    return typeof val === 'number'
}

/**
 * 以当前工作区目录为基准获取路径
 * @param {string} inputPath 
 * @returns 
 */
function resolvePath(inputPath) {
    return path.resolve(process.cwd(), inputPath)
}

/**
 * 创建字符与10进制数的映射表
 * @param {string} str 
 * @returns {Map} 
 */
function createCharIndexMap(str) {
    const map = new Map()
    if (!isString(str)) return map
    for (let i = 0; i < str.length; i ++) {
        map.set(str[i], i)
    }
    return map
}

/**
 * 求最大公约数
 * 辗转相除法 就是用一个数除以另一个数（不需要知道大小），取余数，再用被除数除以余数再取余，再用新的被除数除以新的余数再取余，直到余数为0，最后的被除数就是最大公约数
 * @param {number} number1 
 * @param {number} number2
 */
function getGreatestCommonDivisor(number1, number2) {
    if (!Array.from(arguments).every(isNumber)) 
        throw new TypeError('Only type of number can be got greatest common divisor!')
    if (number2 == 0) return number1

    return getGreatestCommonDivisor(number2, number1 % number2)
}

/**
 * 求最小公倍数
 * 最小公倍数=两数相乘再除以最大公约数
 * @param {number} number1 
 * @param {number} number2 
 */
function getLowestCommonMultiple(number1, number2) {
    if (!Array.from(arguments).every(isNumber)) 
        throw new TypeError('Only type of number can be got lowest common multiple!')
    
    const gcd = getGreatestCommonDivisor(number1, number2)
    if (gcd !== 0) {
        return number1 * number2 / gcd
    }
    return 0
}

module.exports = {
    isFunction,
    isString,
    isBoolean,
    isNumber,
    resolvePath,
    createCharIndexMap,
    getGreatestCommonDivisor,
    getLowestCommonMultiple
}