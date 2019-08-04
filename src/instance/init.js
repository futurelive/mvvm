const _ = require('../util')

/**
 * 实例初始化入口
 * @param options {Object} vue实例选项
 * @private
 */
exports._init = function(options) {

    // 这个变量是用来存储遍历DOM过程中生成的当前的Watcher
    // 在实现computed功能的时候需要用到
    this._activeWatcher = null;

    this.$options = options;

    // Vue构造函数上定义了一些指令相关的方法,需要将它们引用过来, 以供后面的调用
    _.extend(this.$options, this.constructor.options);

    this.$data = options.data || {};

    // 初始化data, 主要是做Observer,数据监听这一块
    this._initData(options.data);

    // 初始化计算属性
    this._initComputed();

    // binding、watcher、directive是实现动态数据绑定的三大核心对象
    // 三者的关系非常复杂
    this._initBindings();

    // 指令数组,用于存放解析DOM模板的时候生成的指令
    this._directives = [];

    // 解析DOM模板, 渲染真实的DOM
    if (options.el) {
        this.$mount(options.el);
    }
};