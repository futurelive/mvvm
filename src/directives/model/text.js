/**
 * Created by Miro on 19/8/13.
 */

const _ = require('../../util');

exports.bind = function() {
    let el = this.el;
    this.handler = () => {
        this.vm.$set(this.expression, el.value);
    };
    _.on(el, 'input', this.handler);
};

exports.update = function(value) {
    this.el.value = value;
};