/**
 * Created by Miro on 19/7/29.
 * 定义一个对象,它的属性中有push等经过改写的数组方法
 */

const aryMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
// 新创建对象 指定的原型对象是Array.prototype
const arrayAugmentations = Object.create(Array.prototype);


aryMethods.forEach((method) => {
    // 缓存原数组方法
    let original = Array.prototype[method];
    Object.defineProperty(arrayAugmentations, method, {
        // 该属性才能够出现在对象的枚举属性中
        enumerable: true,
        // true 时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除
        configurable: true,
        // 该属性的writable为true时，value才能被赋值运算符改变
        writable: true,
        value: function() {
            let result = original.apply(this, arguments);
            let ob = this.$observer;

            // 触发观察者
            // ob.trigger.call(ob, 'set');
            console.log('我被改变啦!');

            // 返回原数组执行结果
            return result;
        }
    });

});

module.exports = arrayAugmentations;