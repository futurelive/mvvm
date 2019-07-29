/**
 * Created by Miro on 19/7/29.
 */

import Vue from '../src/index';

const app = new Vue({
    el: '#app',
    data: {
        name: 'Miro',
        age: 18,
        address: {
            info: {
                city: "beijing"
            }
        },
        message: ['a', 'b', 'c']
    }
});

app.$watch('name', function(val) {
    console.log('我watch住了name');
    console.log(`新的name为${val}`)
});

window.app = app;