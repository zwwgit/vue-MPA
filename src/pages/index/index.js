import Vue from 'Vue'
import index from './index.vue'
import '@/js/head.js'
import '@/style/reset.css'
new Vue({
    el:'#app',// 这里参考cell.html和cell.vue的根节点id，保持三者一致
    render:(h)=>h(index)
})