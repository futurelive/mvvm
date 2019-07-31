/**
 * Created by Miro on 19/7/31.
 */

/**
 * 指令构造函数
 * @param name {string} 例如:text, 代表是文本节点
 * @param el {Element} 对应的文本节点
 * @param vm {Vue} vue实例
 * @param descriptor {Object} 指令描述符, 描述一个指令, 形如: {expression: "user.name"}
 * @constructor
 */
function Directive(name, el, vm, expression) {
    this.name = name;
    this.el = el;
    this.vm = vm;
    this.expression = expression;
    this.attr = 'nodeValue';

    this.update();
}

Directive.prototype.update = function() {
    this.el[this.attr] = this.vm.$data[this.expression];
    console.log(`更新了DOM-${this.expression}`);
};

module.exports = Directive;