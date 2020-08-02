<template>
  <div class="product">
    <product-param :title="product.name">
      <template v-slot:buy>
        <a href="javascipt:;" class="btn" @click="buy">立即购买</a>
      </template>
    </product-param>
    <div class="content">
      <div class="item-bg">
        <h2>小米CC9e</h2>
        <h3>3200万+4800万 前后双旗舰相机</h3>
        <p>
          <a href="javacript:;">全球首款双频 GP</a>
          <span>|</span>
          <a href="javacript:;">骁龙845</a>
          <span>|</span>
          <a href="javacript:;">AI 变焦双摄</a>
          <span>|</span>
          <a href="javacript:;">AI 红外人脸识别</a>
        </p>
        <div class="price">￥1299元</div>
      </div>
      <div class="item-bg-2"></div>
      <div class="item-bg-3"></div>
    </div>
    <div class="swiper">
      <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="(item,index) in banners" :key="index">
          <a :href="'/#/product/' + item.id">
            <img v-lazy="item.img" alt />
          </a>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <p>小米8 AI变焦双摄拍摄</p>
    </div>
    <div class="item-video">
      <h2>
        <p>60帧超慢动作摄影</p>
        <p>慢慢回味每一瞬间的精彩</p>
      </h2>
      <div class="info">
        <p>后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！</p>
        <p>更能AI 精准分析视频内容，15个场景智能匹配背景音效。</p>
      </div>
      <div class="container">
        <img src="/imgs/product/gallery-1.png" @click="videoSlider='sliderDown'" alt />
      </div>
    </div>
    <!-- <transition name="slider">
      <div class="video-box" v-show="showVideo">
        <div class="overlay"></div>
        <div class="video">
          <video src="/imgs/product/video.mp4" muted autoplay controls></video>
          <div class="icon-close" @click="showVideo = false"></div>
        </div>
      </div>
    </transition>-->
    <div class="video-box" v-show="videoSlider">
      <div class="overlay"></div>
      <div class="video" :class="videoSlider">
        <video src="/imgs/product/video.mp4" muted autoplay controls></video>
        <div class="icon-close" @click="closeVideo"></div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductParam from '../components/ProductParam'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data () {
    return {
      banners: [
        {
          id: 2,
          img: '/imgs/product/gallery-2.png'
        },
        {
          id: 3,
          img: '/imgs/product/gallery-3.png'
        },
        {
          id: 4,
          img: '/imgs/product/gallery-4.png'
        },
        {
          id: 5,
          img: '/imgs/product/gallery-5.jpg'
        },
        {
          id: 6,
          img: '/imgs/product/gallery-6.jpg'
        },
      ],
      swiperOption: { // 轮播图配置
        // loop: true, // 开启循环
        autoplay: true, // 开启自动播放
        pagination: { // 配置分页
          el: '.swiper-pagination', // 指定dom
          clickable: true // 可以点击切换
        },
        slidesPerView: 3,
        // centeredSlides: true
        // effect: 'cube', // 3d切换轮播图
        // cubeEffect: { // 开启一些效果
        //   slideShadows: true,
        //   shadow: true,
        //   shadowOffset: 100,
        //   shadowScale: 0.6
        // }
      },
      // showVideo: false,
      videoSlider: '',
      product: {}
    }
  },
  components: {
    ProductParam,
    swiper,
    swiperSlide
  },
  methods: {
    closeVideo () {
      this.videoSlider = 'sliderUp'
      setTimeout(() => {
        this.videoSlider = ''
      }, 1000)
    },
    initProduct () {
      let id = this.$route.params.id
      this.axios.get(`api/products/${id}`)
        .then(res => {
          this.product = res
        })
    },
    buy () {
      let id = this.$route.params.id
      this.$router.push(`/detail/${id}`)
    }
  },
  created () {
    this.initProduct()
  }
}
</script>

<style scoped lang="scss">
@import '../assets/scss/config.scss';
@import '../assets/scss/button.scss';
@import '../assets/scss/mixin.scss';
@import '../assets/scss/base.scss';
.product {
  .btn {
    margin-left: 10px;
    color: white !important;
  }
  .content {
    .item-bg {
      height: 718px;
      background: url('/imgs/product/product-bg-1.png') no-repeat center;
      text-align: center;
      border: 1px solid transparent;
      h2 {
        margin-top: 55px;
        font-size: $fontA;
      }
      h3 {
        font-size: $fontE;
        letter-spacing: 10px;
      }
      p {
        margin: 21px 0 40px;
        font-size: $fontI;
        span {
          margin: 0 18px;
        }
        a {
          color: $colorB;
        }
      }
      .price {
        font-size: $fontB;
      }
    }
    .item-bg-2 {
      height: 480px;
      background: url('/imgs/product/product-bg-2.png') no-repeat center;
      background-size: cover;
    }
    .item-bg-3 {
      height: 638px;
      background: url('/imgs/product/product-bg-3.png') no-repeat center;
      background-size: cover;
    }
  }
  .swiper {
    height: 294px;
    margin-bottom: 52px;
    margin-top: 20px;
    .swiper-container {
      img {
        width: 471px;
        margin-right: 30px;
      }
    }
    p {
      font-size: $fontH;
      text-align: center;
      color: $colorB;
    }
  }
  .item-video {
    height: 1044px;
    margin-bottom: 76px;
    background-color: #070708;
    text-align: center;
    color: $colorG;
    border: 1px solid transparent;
    h2 {
      margin: 82px 0 47px;
      font-size: 60px;
    }
    .info {
      font-size: $fontE;
      margin-bottom: 58px;
    }
    .container {
      img {
        height: 540px;
        cursor: pointer;
      }
    }
  }
  .video-box {
    @include position(fixed);
    z-index: 11;
    // &.slider-enter,
    // &.slider-leave-to {
    //   opacity: 0;
    //   .video {
    //     top: -100%;
    //   }
    // }
    // &.slider-enter-active,
    // &.slider-leave-active {
    //   transition: all 1s;
    //   .video {
    //     transition: all 1s;
    //   }
    // }
    @keyframes sliderUp {
      from {
        opacity: 1;
        top: 50%;
      }
      to {
        opacity: 0;
        top: -50%;
      }
    }
    @keyframes sliderDown {
      0% {
        opacity: 0;
        top: -50%;
      }
      100% {
        opacity: 1;
        top: 50%;
      }
    }
    .overlay {
      @include position(fixed);
      background-color: $colorB;
      opacity: 0.4;
    }
    .video {
      @include position(fixed, 50%, 50%, 1000px, 538px);
      transform: translate(-50%, -50%);
      opacity: 1;
      top: -50%;
      &.sliderUp {
        animation: sliderUp 1s linear;
        opacity: 0;
        top: -50%;
      }
      &.sliderDown {
        animation: sliderDown 1s linear;
        opacity: 1;
        top: 50%;
      }
      video {
        width: 100%;
        outline: none;
        object-fit: none;
      }
      .icon-close {
        @include positionBgImg(
          absolute,
          20px,
          20px,
          14px,
          14px,
          '/imgs/icon-close.png'
        );
        // @include bgImg(14px, 14px, '/imgs/icon-close.png');
        // @include position(absolute,2)
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>
