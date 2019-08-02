/**
 * Created by Miro on 19/7/31.
 */

/**
 * 这个就是textNode对应的更新函数啦
 */
exports.update = function() {
    let properties = this.expression.split('.');
    let value = this.vm.$data;
    // 循环拿到最后的那个值
    properties.forEach((property) => {
        value = value[property];
    });
    this.el[this.attr] = value;
    console.log(`更新了DOM-${this.expression}`, value);
};