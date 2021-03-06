/**
 * Created by Miro on 19/7/29.
 * 观察对象
 */

// webpack 2中不允许混用import和module.exports,所以这里的这种引入方式会报错
// import arrayAugmentations from '../observer/array-augmentations';

const arrayAugmentations = require('../observer/array-augmentations')
const objectAugmentations = require('../observer/object-augmentations');

const ARRAY = 0;
const OBJECT = 1;

let uid = 0;

Observer.emitGet = false;

/**
 * 观察者构造函数
 * @param value {Object} 数据对象
 *  @param type {Int} 数据对象的类型(分为对象和数组)
 * @constructor
 */
function Observer(value, type) {
    this.value = value;
    this.id = ++uid
        // TODO 这里为什么enumerable一定要为false,否则会触发死循环
        // value.$observer = this; 将当前对象存储到当前对象的$observer属性中 
    Object.defineProperty(value, '$observer', {
        value: this,
        enumerable: false,
        writable: true,
        configurable: true
    });
    if (type === ARRAY) {
        value.__proto__ = arrayAugmentations;
        this.link(value);
    } else if (type === OBJECT) {
        value.__proto__ = objectAugmentations;
        this.walk(value);
    }
}

/**
 * 遍历数据对象
 * @param obj {Object} 待遍历的数据对象
 */
Observer.prototype.walk = function(obj) {
    let val;
    // for in 可枚举继承的属性都能遍历出来
    for (let key in obj) {
        // 这个方法可以用来检测一个对象是否含有特定的自身属性；和 in 运算符不同，该方法会忽略掉那些从原型链上继承到的属性。
        if (!obj.hasOwnProperty(key)) return;

        val = obj[key];

        // 递归 监听嵌套数据
        this.observe(key, val);

        // 对数据进行监听
        this.convert(key, val);

    }
};


/**
 * 定义对象属性
 * @param key {string} 属性键名
 * @param val {Any} 属性值
 */
Observer.prototype.convert = function(key, val) {
    let ob = this;
    Object.defineProperty(this.value, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            console.log('你访问了' + key);
            if (Observer.emitGet) {
                ob.notify('get', key);
            }
            return val
        },
        set: function(newVal) {
            if (newVal === val) return;
            val = newVal
            console.log('你设置了' + key + ' 新的' + key + ' = ' + newVal);
            // ob.trigger.call(ob, 'set');
            ob.notify('set', key, newVal);
            ob.notify(`set:${key}`, key, newVal)
        }
    })
};

/**
 * 调用创建observer函数
 * 并且判断是否有父节点,如果有,则存储父节点到自身,
 * 目的是为了方便后面事件传播使用
 * @param key {string} 键值
 * @param val {Any} 属性值
 */
Observer.prototype.observe = function(key, val) {
    // 创建的新的observe对象
    let ob = Observer.create(val);
    if (!ob) return;
    ob.parent = {
        key,
        // 执行环境的this 也就是外层this 外层的Observe实例
        ob: this
    }

};

/**
 * 这个方法是用来处理如下情况: var ary = [1,{name:liangshaofeng}]
 * 也就是说,当数组的某些项是一个对象的时候,
 * 那么需要给这个对象创建observer监听它
 * @param items {Array} 待处理数组
 */
Observer.prototype.link = function(items) {
    items.forEach((value, index) => {
        this.observe(index, value);
    });
};

/**
 * 订阅事件
 * @param event {string} 事件类型
 * @param fn {Function} 回调函数
 * @returns {Observer} 观察者对象
 */
Observer.prototype.on = function(event, fn) {
    // this 不同的observe对象
    this._cbs = this._cbs || {};
    if (!this._cbs[event]) {
        this._cbs[event] = []
    }
    this._cbs[event].push(fn);

    // 这里return this是为了实现.on(...).on(...)这样的级联调用
    return this;
};

/**
 * 取消订阅事件
 * @param event {string} 事件类型
 * @param fn {Function} 回调函数
 * @returns {Observer} 观察者对象
 */
Observer.prototype.off = function(event, fn) {
    this._cbs = this._cbs || {};

    // 取消所有订阅事件
    if (!arguments.length) {
        this._cbs = {};
        return this;
    }

    let callbacks = this._cbs[event];
    if (!callbacks) return this;

    // 取消特定事件
    if (arguments.length === 1) {
        delete this._cbs[event];
        return this;
    }

    // 取消特定事件的特定回调函数
    // 变量声明在括号里面就只需要声明一次
    for (let i = 0, cb; i < callbacks.length; i++) {
        cb = callbacks[i];
        if (cb === fn) {
            callbacks.splice(i, 1);
            break;
        }
    }
    return this;
};

/**
 * 触发消息, 并且将消息逐层往上传播
 */
Observer.prototype.notify = function(event, path, val) {
    this.emit(event, path, val);
    let parent = this.parent;
    if (!parent) return;
    let ob = parent.ob;
    let key = parent.key;
    let parentPath;

    // 此处为为了兼容数组的情况
    if (path) {
        parentPath = `${key}.${path}`;
    } else {
        parentPath = key;
    }
    ob.notify(event, parentPath, val);
};

/**
 * 触发执行回调函数
 */
Observer.prototype.emit = function(event, path, val) {
    // 当this是info或者address的时候 没有注册set事件  都直接return
    this._cbs = this._cbs || {};
    let callbacks = this._cbs[event]

    if (!callbacks) return;

    callbacks = callbacks.slice(0);
    callbacks.forEach((cb, i) => {
        // arguments传给$watch的回调函数使用
        callbacks[i].apply(this, arguments)
    });
};

Observer.create = function(value, options) {
    if (Array.isArray(value)) {
        return new Observer(value, ARRAY);
    } else if (typeof value === 'object') {
        return new Observer(value, OBJECT);
    }
};

module.exports = Observer;