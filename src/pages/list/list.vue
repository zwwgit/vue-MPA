<template>
  <div class="container">
    <header>
      <p>目录</p>
    </header>
    <div id="list-outter">
      <div v-for="(item,index) in curentList" :key='index'>
        <p class="date">{{item[0].date}}</p>
        <ul class="list-box">
          <li v-for="(h,i) in item" :key='i'>
            <a :href="h.url">
              <span class="stage">第{{h.stage | formatStage}}期</span><span class="desc">{{h.title}}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="page-list" id="page-list">
      <a @click="pre">上一页</a>
      <a v-for="(item,index) in pageList" :key="index" :class="{current:page==item}"
        @click="changePage(item)">{{item}}</a>
      <a @click="next">下一页</a>
    </div>
    <a href="https://m.nz86.com/brands/" class="ad"><img src="@/assets/ad.jpg"></a>
  </div>
</template>
<style lang="scss" scoped>
@import "@/style/list.scss";
</style>
<script>
import { getSelectNewsListPager } from "@/js/api"
import share from "@/js/share_v2"
export default {
  name: 'index',
  data() {
    return {
      page: 1,
      list: []
    }
  },
  filters: {
    formatStage(s) {
      if (s < 10) {
        return '000' + s
      } else if (s < 100) {
        return '00' + s
      } else if (s < 1000) {
        return '0' + s
      } else {
        return s
      }
    }
  },
  computed: {
    curentList() {
      return this.list.slice((this.page - 1) * 2, this.page * 2)
    },
    pageList() {
      let length = Math.ceil(this.list.length / 2)
      let start = 1
      if (length > 5) {
        start = this.page > 2 ? this.page < length - 2 ? this.page - 2 : length - 4 : 1
      } else {
        start = 1
      }
      let end = start + 4 <= length ? start + 4 : length
      let list = []
      for (let i = start; i <= end; i++) {
        list.push(i)
      }
      return list
    }
  },
  created() {
    getSelectNewsListPager().then(rs => {
      this.list = this.groupingByMonth(rs.data.list)
      share('https://img1.nz86.com/upload/picture/system/20200323/logo.png', rs.data.ticket)
    })
  },
  methods: {
    changePage(page) {
      this.page = page
    },
    groupingByMonth(list) {
      let result = []
      let stage = list.length
      list.forEach(function (h) {
        h.stage = stage--
        let date = new Date(h.addtime)
        const y = date.getFullYear()
        let m = date.getMonth() + 1
        const key = y + '年' + m + '月'
        let index = result.myIndexOf('date', key)
        if (index > -1) {
          h.date = key
          result[index].push(h)
        } else {
          h.date = key
          result.push([h])
        }
      })
      return result
    },
    next() {
      if (this.page < Math.ceil(this.list.length / 2)) {
        this.page++
      }
    },
    pre() {
      if (this.page > 1) {
        this.page--
      }
    }
  }
}
</script>