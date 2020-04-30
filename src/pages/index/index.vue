<template>
  <div class="container">
    <header>
      <p>每周精选</p>
    </header>
    <div class="swiper-box">
      <div class="swiper-container">
        <div class="swiper-wrapper" id="swiper-wrapper">
          <img class="swiper-slide" :src="item.picUrl" alt="" v-for="(item,index) in topNews" :key="index">
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <div class="title-box" id="title-box">
        <h4>本周热点</h4>
        <h4 :class="{hover:index==mySwiper.activeIndex}" v-for="(item,index) in topNews" :key="index"
          @click="slideTo(index)">{{item.title}}</h4>
      </div>
      <div class="date" id="date">
        <p id="date1">{{topNews[mySwiper.activeIndex]&&topNews[mySwiper.activeIndex].addTime | formatData1}}</p>
        <p id="date2">{{topNews[mySwiper.activeIndex]&&topNews[mySwiper.activeIndex].addTime | formatData2}}</p>
      </div>
    </div>
    <div class="sense_list click_add_grey">
      <ul id="investList">
        <li v-for="(item,index) in moreNews" :key="index">
          <a>
            <div class="sense_l">
              <p class="sense_t">{{item.title}}</p>
              <span class="cense_c">{{item.views}}人看过</span>
            </div>
            <img class="sense_r" :src="item.picUrl" :alt="item.title" />
          </a>
        </li>
      </ul>
    </div>
    <div class="bth-group">
      <button :disabled='!isPrevious' @click="previous">上期</button>
      <button @click="toList">目录</button>
      <button :disabled='!isNext' @click="next">下期</button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "@/style/index.scss";
</style>
<script>
import { listSelectNews, addSelectNewsViews } from "@/js/api"
import utils from "@/js/util"
import share from "@/js/share_v2"
import Swiper from "swiper"
import "swiper/css/swiper.min.css"
export default {
  name: 'index',
  components: { Swiper },
  data() {
    return {
      topNews: [],
      moreNews: [],
      isPrevious: false,
      isNext: false,
      mySwiper: '',
    }
  },
  filters: {
    formatData1(t) {
      if (t) {
        const date = new Date(t)
        var day = ''
        switch (date.getDay()) {
          case 0: day = '星期日'; break;
          case 1: day = '星期一'; break;
          case 2: day = '星期二'; break;
          case 3: day = '星期三'; break;
          case 4: day = '星期四'; break;
          case 5: day = '星期五'; break;
          case 6: day = '星期六'; break;
        }
        return (date.getMonth() + 1) + '月' + date.getDate() + '日' + day
      }

    },
    formatData2(t) {
      if (t) {
        const date = new Date(t)
        var day = ''
        switch (date.getDay()) {
          case 0: day = '星期日'; break;
          case 1: day = '星期一'; break;
          case 2: day = '星期二'; break;
          case 3: day = '星期三'; break;
          case 4: day = '星期四'; break;
          case 5: day = '星期五'; break;
          case 6: day = '星期六'; break;
        }
        return day
      }

    }
  },
  created() {
    this.loadData()
  },
  methods: {
    defaultDate() {
      var date = new Date();
      // 上周一的日期
      date.setDate(date.getDate() - date.getDay() + 1-7);
      var begin = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

      // 本周一的日期
      date.setDate(date.getDate()+7);
      var end = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      return {begin,end}
    },
    loadData() {
      const that = this
      const data = {
        startDate: utils.getUrlKey('startDate') ? utils.getUrlKey('startDate') : this.defaultDate().begin,
        endDate: utils.getUrlKey('endDate') ? utils.getUrlKey('endDate') : this.defaultDate().end
      }
      listSelectNews(data).then(rs => {
        if (rs.data.selectList.length > 0) {
          this.topNews = rs.data.selectList.slice(0, 3)
          this.moreNews = rs.data.selectList.slice(3)
          this.isPrevious = rs.data.isPrevious
          this.isNext = rs.data.isNext
          this.addTime = rs.data.selectList[0].addtime
          this.mySwiper = new Swiper('.swiper-container', {
            observer: true,
            observeParents: true,
            autoHeight: true,
            autoplay: {
              disableOnInteraction: false
            },
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
          })
          share(rs.data.selectList[0].picUrl, rs.data.ticket)
        }

      })
    },
    slideTo(i) {
      this.mySwiper.slideTo(i)
    },
    toList() {
      window.location.href = "/list.html"
    },
    previous() {
      let start = (utils.getUrlKey("startDate")?utils.getUrlKey("startDate"):this.defaultDate().begin).replace(/-/g, '/')
      let end = (utils.getUrlKey("endDate")?utils.getUrlKey("endDate"):this.defaultDate().end).replace(/-/g, '/')
      let startDate = new Date(start).valueOf()
      let endDate = new Date(end).valueOf()
      startDate -= 1000 * 60 * 60 * 24 * 7
      endDate -= 1000 * 60 * 60 * 24 * 7
      start = new Date(startDate)
      end = new Date(endDate)
      let startFormat = start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate()
      let endFormat = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()
      window.location.href = "/index.html?startDate=" + startFormat + "&endDate=" + endFormat
    },
    next() {
      let start = (utils.getUrlKey("startDate")?utils.getUrlKey("startDate"):this.defaultDate().begin).replace(/-/g, '/')
      let end = (utils.getUrlKey("endDate")?utils.getUrlKey("endDate"):this.defaultDate().end).replace(/-/g, '/')
      let startDate = new Date(start).valueOf()
      let endDate = new Date(end).valueOf()
      startDate += 1000 * 60 * 60 * 24 * 7
      endDate += 1000 * 60 * 60 * 24 * 7
      start = new Date(startDate)
      end = new Date(endDate)
      let startFormat = start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate()
      let endFormat = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()
      window.location.href = "/index.html?startDate=" + startFormat + "&endDate=" + endFormat
    }
  }
}
</script>