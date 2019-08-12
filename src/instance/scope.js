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
    if (this.$parent) {
        this.observer = this.$parent.observer;
    } else {
        this.observer = Observer.create(data);
    }
};

/**
 * 初始化所有计算属性
 * 主要完成一个功能:将计算属性定义的function当成是该属性的getter函数
 * @private
 */
exports._initComputed = function() {
    let computed = this.$options.computed;
    if (!computed) return;
    for (let key in computed) {
        let def = computed[key];
        if (typeof def === 'function') {
            def = {
                get: def
            };
            def.enumerable = true;
            def.configurable = true;
            Object.defineProperty(this.$data, key, def);
        }
    }
};

/**
 * 初始化方法: 将method底下的方法proxy到vm实例上面去
 * @private
 */
exports._initMethods = function() {
    let { methods } = this.$options;
    if (!methods) return;
    for (let key in methods) {
        this[key] = methods[key];
    }
};

/**
 * 初始化代理,将 $data里面的数据代理到vm实例上面去
 * @private
 */
exports._initProxy = function() {
    for (let key in this.$data) {
        this[key] = this.$data[key];
    }
};