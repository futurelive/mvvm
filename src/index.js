/**
 * Created by Miro on 19/7/29.
 */

const _ = require('./util');

function Vue(options) {
    this._init(options);
}

Vue.prototype = {
    constructor: Vue,
    ...require('./instance/init'),
    ...require('./instance/compile'),
    ...require('./instance/element'),
    ...require('./instance/bindings'),
    ...require('./instance/scope'),
    ...require('./api/lifecycle'),
    ...require('./api/data'),
    ...require('./api/dom')
};

Vue.options = {
    directives: {...require('./directives') }
};

module.exports = _.Vue = Vue;