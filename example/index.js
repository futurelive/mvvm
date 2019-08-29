/**
 * Created by Miro on 19/7/29.
 */

import Vue from '../src/index';

const app = new Vue({
    el: '#app',
    data: {
        name: '青蛙',
        user: {
            name: 'Wizard'
        },
        address: {
            info: {
                city: 'hk'
            }
        },
        pubClass: [
            { name: '青蛙', inter: '喜欢hello world', salary: 18000 },
            { name: 'PTV', inter: '女生', salary: 18000 },
            { name: '右耳', inter: '男生', salary: 8000 },
            { name: 'DreamChaser', inter: '男生女生', salary: 28000 },
            { name: 'hello world', inter: '喜欢青蛙', salary: 18000 }
        ],
        show: true

    },
    methods: {
        changeArr: function() {
            let res = app.pubClass.shift()
            console.log(31, res)
        },
        showTab: function() {
            app.show = !app.show
        }
    },
    computed: {
        info: function() {
            let len = this.pubClass.length
            let average = this.pubClass.reduce((acc, val) => {
                return acc + val.salary
            }, 0) / len
            return `计算出来的属性-》 学生总人数是:${len}, 平均月薪${average}`
        }
    }
})

window.app = app;