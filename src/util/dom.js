/**
 * Created by Miro on 19/7/31.
 */

/**
 * insertBefore
 * @param el {Element}
 * @param target {Element}
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