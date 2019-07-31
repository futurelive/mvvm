/**
 * Created by Miro on 19/7/29.
 */

function Vue(options) {
    this._init(options);
}

Vue.prototype = {
    constructor: Vue,
    ...require('./instance/init'),
    ...require('./instance/compile'),
    ...require('./api/lifecycle'),
    ...require('./api/data'),
    ...require('./instance/bindings'),
    observer: {...require('./observer/observer') }
};

module.exports = Vue;