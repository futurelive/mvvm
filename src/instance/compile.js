/**
 * Created by Miro on 19/7/26.
 */

const Directive = require('../directive')
const textParser = require('../parse/text')
const dirParser = require('../parse/directive')
const _ = require('../util')

const priorityDirs = [
    'if'
];

/**
 * 整体思路: 利用递归的思想
 */

exports._compile = function() {
    this._compileNode(this.$el);
};

/**
 * 渲染节点
 * @param node {Element}
 * @private
 */
exports._compileElement = function(node) {
    let hasAttributes = node.hasAttributes();

    if (hasAttributes && this._checkPriorityDirs(node)) {
        return;
    }

    if (node.hasChildNodes()) {
        Array.from(node.childNodes).forEach(this._compileNode, this);
    }
};

/**
 * 渲染文本节点
 * @param node {Element}
 * @private
 */
exports._compileTextNode = function(node) {
    let tokens = textParser.parse(node.nodeValue);
    if (!tokens) return;

    tokens.forEach((token) => {
        if (token.tag) {
            // 指令节点
            let value = token.value;
            let el = document.createTextNode('');
            _.before(el, node);
            this._bindDirective('text', value, el);
        } else {
            // 普通文本节点
            let el = document.createTextNode(token.value);
            _.before(el, node);
        }
    });

    _.remove(node);
};

exports._compileNode = function(node) {
    switch (node.nodeType) {
        // node
        case 1:
            this._compileElement(node);
            break;
            // text
        case 3:
            this._compileTextNode(node);
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
exports._bindDirective = function(name, value, node) {
    let descriptors = dirParser.parse(value);
    let dirs = this._directives;
    descriptors.forEach((descriptor) => {
        dirs.push(
            new Directive(name, node, this, descriptor)
        )
    });
    console.log(95, this._directives)
};

/**
 * 检查node节点是否包含某些如 "v-if" 这样的高优先级指令
 * 如果包含,那么就不用走原先的DOM遍历了, 直接走指令绑定
 * @param node {Element}
 * @private
 */
exports._checkPriorityDirs = function(node) {
    for (let i = 0, length = priorityDirs.length; i < length; i++) {
        let dir = priorityDirs[i];
        let value = _.attr(node, dir);
        if (value) {
            this._bindDirective(dir, value, node);
            return true;
        }
    }
};