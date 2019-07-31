/**
 * Created by Miro on 19/7/26.
 * 实例初始化
 */

exports._init = function(options) {
    // 其他初始化

    this.$options = options
    this.$data = options.data;
    this.$el = document.querySelector(options.el);
    this.$template = this.$el.cloneNode(true);
    this._directives = [];

    // 创建观察对象
    this.observer = this.observer.create(this.$data);

    // 谁调用回调函数 this就代表谁 把on的回调方法的指向改成了vm实例 
    // this.observer.on('set', this.$mount.bind(this));
    this.observer.on('set', this._updateBindingAt.bind(this));

    // 渲染挂载
    this.$mount();
};