/**
 * Created by Miro on 19/7/29.
 */

import Vue from '../src/index';

const app = new Vue({
    el: '#app',
    data: {
        show: true,
        name: 'Miro',
        age: 18,
        address: {
            info: {
                city: "beijing"
            }
        },
        user: {
            name: 'Miro',
            age: 24
        },
        message: ['a', 'b', {
            name: 'liangshaofeng',
            age: 24
        }]
    },
    computed: {
        info: function() {
            return `计算出来的属性-> 姓名: ${this.user.name}, 年龄: ${this.user.age}`;
        }
    }
});

// app.$watch('address.info', function(val) {
//     console.log(`我watch住了name`);
//     console.log(`新的name为${val}`)
// });

// app.$watch('address.info.city', function(val) {
//     console.log('我watch住了city');
//     console.log(`新的city为${val}`)
// });

window.app = app;