/**
 * Created by Miro on 19/7/26.
 */

const Directive = require('../directive')

exports._compile = function() {
    this._compileNode(this.$el);
};

exports._compileElement = function(node) {
    if (node.hasChildNodes()) {
        Array.from(node.childNodes).forEach(this._compileNode, this);
    }
};

exports._compileText = function(node) {
    let patt = /{{\w+}}/g;
    let nodeValue = node.nodeValue;
    let expressions = nodeValue.match(patt); // 这是一个数组,形如["{{name}}"];

    if (!expressions) return;

    expressions.forEach((expression) => {
        let el = document.createTextNode('');
        // 在node之前插入子节点el
        node.parentNode.insertBefore(el, node);
        let property = expression.replace(/[{}]/g, '');
        this._bindDirective('text', property, el);
    });

    node.parentNode.removeChild(node);
};

exports._compileNode = function(node) {
    switch (node.nodeType) {
        // node
        case 1:
            this._compileElement(node);
            break;
            // text
        case 3:
            this._compileText(node);
            break;
        default:
            return;
    }
};

/**
 * 生成指令
 * @param name {string} 'text' 代表是文本节点
 * @param value {string} 例如: user.name  是表示式
 * @param node {Element} 指令对应的el
 * @private
 */
exports._bindDirective = function(name, expression, node) {
    let dirs = this._directives;
    dirs.push(
        new Directive(name, node, this, expression)
    );
};