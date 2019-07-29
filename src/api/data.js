/**
 * Created by Miro on 19/7/29.
 */

// 暴露一个接口给用户用
exports.$watch = function(key, fn) {
    let _fn = function() {
        // 进行参数过滤 保留Observer.prototype.emit 的第三个参数
        fn(arguments[2]);
    };

    let pathAry = key.split('.');
    if (pathAry.length === 1) {
        // 谁调用回调函数 this就代表谁 这里绑定_fn的上下文为Vue的实例
        this.$data.$observer.on(`set:${key}`, _fn.bind(this))
    } else {
        let _temp = this.$data;
        let lastProperty = pathAry.pop();

        pathAry.forEach((property) => {
            _temp = _temp[property]
        });
        _temp.$observer.on(`set:${lastProperty}`, _fn.bind(this));
    }

};