/**
 * Created by Miro on 19/7/31.
 */

const config = require('../config');

/**
 * insertBefore
 * @param el {Element} 需要插入的节点对象
 * @param target {Element} 在其之前插入新节点的子节点
 */
exports.before = function(el, target) {
    target.parentNode.insertBefore(el, target);
};

/**
 * removeSelf
 * @param el {Element}
 */
exports.remove = function(el) {
    el.parentNode.removeChild(el);
};

/**
 * 因为没有原声的insertAfter方法, 所以需要迂回处理一下
 * @param el
 * @param target
 */
exports.after = function(el, target) {
    if (target.nextSibling) {
        exports.before(el, target.nextSibling);
    } else {
        target.parentNode.appendChild(el);
    }
};

/**
 * 把node节点的attr取出来(并且移除该attr)
 * 注意! 这里会把该attr移除! 专门用来处理v-if这样的属性
 * @param node {Element}
 * @param attr {String}
 * @returns {string}
 */
exports.attr = function(node, attr) {
    attr = config.prefix + attr;
    let val = node.getAttribute(attr);
    if (val) {
        node.removeAttribute(attr);
    }
    return val;
};