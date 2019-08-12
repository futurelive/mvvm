/**
 * Created by Miro on 19/8/12.
 */

exports.update = function(value) {
    let name = this.arg;
    let el = this.el;
    el.setAttribute(name, value);
};