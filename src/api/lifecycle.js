/**
 * Created by Miro on 19/7/26.
 */

/**
 * 解析、渲染DOM
 * @param el {string} selector
 */
exports.$mount = function(el) {
    // 合法性判断等, 有待补充
    this._initElement(el);

    // 解析、渲染DOM
    this._compile();
};