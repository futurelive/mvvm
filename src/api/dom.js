/**
 * Created by Miro on 19/8/11.
 * 请注意:这个文件中对DOM的操作与util/dom.js对DOM中的操作不同。
 * 本文件的对DOM的操作是以vue实例为单位的, this指的就是vue实例
 * 而util里面的dom.js的操作对象都是一般的DOM节点
 */

const _ = require('../util');

/**
 * 插入vue实例
 * @param target {Element}
 */
exports.$before = function(target) {
    _.before(this.$el, target);
};

/**
 * 移除bue实例
 */
exports.$remove = function() {
    if (this.$el.parentNode) {
        _.remove(this.$el);
    }
};