/**
 * Created by Miro on 19/8/12.
 */

const config = require('../config');
const _ = require('../util');

// 用唯一的uid来区分不同的repeat实例
let uid = 0;

exports.bind = function() {
    this.id = `__v_repeat_${++uid}`;
    this.ref = document.createComment(`${config.prefix}repeat`);
    _.replace(this.el, this.ref);
};

exports.update = function(data) {
    if (data && !Array.isArray(data)) {
        _.warn(`Invalid value for v-repeat:${data}\nExpects Array`);
        return;
    }
    this.vms = this.diff(
        data || [],
        this.vms
    )
};

exports.diff = function(data, oldVms) {
    let vms = new Array(data.length);
    let ref = this.ref;

    // 第一步,遍历新数组
    // 如果实例是可复用的,那么在旧的实例上打_reused的标签
    // 如果实例不是可复用的,那么新建这个实例
    data.forEach((obj, i) => {
        let vm = this.getVm(obj);
        if (vm) {
            // 可复用的实例
            vm._reused = true;
        } else {
            vm = this.build(obj, i);
        }
        vms[i] = vm;

        // 初始化的时候,需要将各个vm插入到DOM中
        if (!oldVms) {
            vm.$before(ref);
        }
    });
    // 如果第一次执行diff,也就是初始化, 那么程序到这儿就终止了。
    if (!oldVms) return vms;

    // 第二步,遍历旧的实例数组,删除那些没有被打上_reused标签的实例
    oldVms.forEach((oldVm) => {
        if (oldVm._reused) return;
        oldVm.$remove();
    });

    // 第三步(最后一步),
    // 移动/插入新的实例到正确的位置
    for (let l = vms.length, i = l - 1; i >= 0; i--) {
        let vm = vms[i];
        let targetNext = vms[i + 1];
        if (!targetNext) {
            // 这是最后的一个实例
            vm.$before(ref);
        } else {
            if (vm._reused) {
                // 可复用实例
                // 如果当前的下一个兄弟节点不是目标顺序中的兄弟节点
                // 那么重新移动排序
                if (targetNext !== vm.$el.nextSibling) {
                    vm.$before(targetNext.$el);
                }
            } else {
                vm.$before(targetNext);
            }
        }
    }


};

exports.build = function(data, index) {
    let vm = new _.Vue({
        el: this.el.cloneNode(true),
        data: data,
        parent: this.vm
    });

    // 处理别名
    // let alias = this.arg;
    // vm.$add(alias, data);

    this.cacheVm(data, vm);
    return vm;
};

exports.getVm = function(data) {
    // 其实就是把repeat实例的id存储到对应的数据的id字段上
    // 这样我就知道某个数据是否是对应之前的某个实例
    return data[this.id];
};

exports.cacheVm = function(data, vm) {
    data[this.id] = vm;
};