<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
        <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
          <!-- slides -->
          <swiper-slide v-for="(item,index) in banners" :key="index">
            <a :href="'/#/product/' + item.id">
              <img :src="item.img" alt />
            </a>
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <div class="ads-box"></div>
      <div class="product-box"></div>
    </div>
    <service-bar></service-bar>
  </div>
</template>

<script>
import ServiceBar from '../components/ServiceBar'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data () {
    return {
      banners: [
        {
          id: 42,
          img: '/imgs/slider/slide-1.jpg'
        },
        {
          id: 42,
          img: '/imgs/slider/slide-2.jpg'
        },
        {
          id: 42,
          img: '/imgs/slider/slide-3.jpg'
        },
        {
          id: 42,
          img: '/imgs/slider/slide-4.jpg'
        }
      ],
      swiperOption: { // 轮播图配置
        loop: true, // 开启循环
        autoplay: true, // 开启自动播放
        pagination: { // 配置分页
          el: '.swiper-pagination', // 指定dom
          clickable: true // 可以点击切换
        },
        navigation: { // 开启上下页按钮
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        effect: 'cube', // 3d切换轮播图
        cubeEffect: { // 开启一些效果
          slideShadows: true,
          shadow: true,
          shadowOffset: 100,
          shadowScale: 0.6
        }
      }
    }
  },
  components: {
    swiper,
    swiperSlide,
    ServiceBar
  }
}
</script>

<style scoped lang="scss">
@import '../assets/scss/base.scss';
.index {
  .container {
    .swiper-box {
      .swiper-container {
        height: 451px;
        a {
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
