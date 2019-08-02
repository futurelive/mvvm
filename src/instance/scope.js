/**
 * Created by Miro on 19/7/31.
 */

const Observer = require('../observer/observer')

/**
 * 初始化观察独享
 * @param data {Object} 就是那个大的对象啦
 * @private
 */
exports._initData = function(data) {
    this.observer = Observer.create(data);
};