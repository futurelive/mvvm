/**
 * Created by Miro on 19/7/29.
 */

/**
 * 定义对象属性
 * @param obj {Object} 对象
 * @param key {String} 键值
 * @param val {*} 属性值
 * @param enumerable {Boolean} 是否可枚举
 */
exports.define = function(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        // !取反 !!转换成boolean类型
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    })
};