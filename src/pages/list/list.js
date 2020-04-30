import Vue from 'Vue'
import list from './list.vue'
import '@/js/head.js'
import '@/style/reset.css'
Array.prototype.myIndexOf = function (p, v) {
    var index = -1;
    for (var i = 0; i < this.length; i++) {
        if (this[i][0][p] == v) {
            index = i
            return index;
        }
    }
    return index;
}
new Vue({
    el: '#app',// 这里参考cell.html和cell.vue的根节点id，保持三者一致
    render: (h) => h(list)
})