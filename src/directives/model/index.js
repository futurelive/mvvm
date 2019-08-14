/**
 * Created by Miro on 19/8/13.
 */

const _ = require('../../util');

const handlers = {
    text: require('./text')
};

module.exports = {
    bind: function() {
        let el = this.el;
        let tag = el.tagName;
        let handler;
        if (tag === 'INPUT') {
            handler = handlers.text;
        } else {
            _.warn(`v-model doesn't support element type: ${tag}`);
            return;
        }
        handler.bind.call(this);
        this.update = handler.update;
        this.unbind = handler.unbind;
    }
};