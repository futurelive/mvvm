/**
 * Created by Miro on 19/7/31.
 */

/**
 * 这个就是textNode对应的更新函数啦
 */
exports.update = function(value) {
    this.el[this.attr] = value;
    console.log(`更新了DOM-${this.expression}`, value);
};