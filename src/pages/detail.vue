<template>
  <div class="detail">
    <product-param :title="product.name"></product-param>
    <div class="container clearfix">
      <div class="detail-swiper fl">
        <swiper :options="swiperOption" ref="mySwiper">
          <!-- slides -->
          <swiper-slide v-for="(item,index) in banners" :key="index">
            <a :href="'/#/product/' + item.id">
              <img :src="item.img" alt />
            </a>
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="detail-info fr">
        <div class="info-header">
          <h2 class="info-title">{{product.name}}</h2>
          <p>
            相机全新升级 / 960帧超慢动作 / 手持超级夜景 / 全球首款双频GPS / 骁龙845处理器 / 红
            外人脸解锁 / AI变焦双摄 / 三星 AMOLED 屏
          </p>
        </div>
        <div class="delivery">小米自营</div>
        <div class="info-price">
          {{product.price}}元
          <span>1999元</span>
        </div>
        <div class="line"></div>
        <div class="info-address">
          <p>北京 北京市 朝阳区 安定门街道</p>
          <p>有现货</p>
        </div>
        <div class="info-select">
          <h3>选择版本</h3>
          <ul>
            <li :class="{'checked': version === 1 }" @click="version=1">6GB+64GB 全网通</li>
            <li :class="{'checked': version === 2 }" @click="version=2">4GB+64GB 移动4G</li>
          </ul>
        </div>
        <div class="info-select">
          <h3>选择版本</h3>
          <ul>
            <li class="checked">
              <span class="color"></span>深空灰
            </li>
          </ul>
        </div>
        <div class="info-count">
          <div class="select">
            <span>{{product.name}}元 {{version===1? '6GB+64GB 全网通' : '4GB+64GB 移动4G'}} 深灰色</span>
            <span>{{product.price}}元</span>
          </div>
          <div class="count-total">{{product.price}}元</div>
        </div>
        <div class="join-cart">
          <a href="javascript:;" class="btn-large btn" @click="joinCart">加入购物车</a>
        </div>
      </div>
    </div>
    <div class="price-detail">
      <div class="container">
        <h2>价格说明</h2>
        <div class="price-img">
          <img src="/imgs/detail/item-price.jpeg" alt />
        </div>
      </div>
    </div>
    <service-bar></service-bar>
  </div>
</template>

<script>
import ServiceBar from '../components/ServiceBar'
import ProductParam from '../components/ProductParam'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data () {
    return {
      id: this.$route.params.id,
      product: {},
      version: 1,
      banners: [
        {
          id: 1,
          img: '/imgs/detail/phone-1.jpg'
        },
        {
          id: 2,
          img: '/imgs/detail/phone-2.jpg'
        },
        {
          id: 3,
          img: '/imgs/detail/phone-3.jpg'
        },
        {
          id: 4,
          img: '/imgs/detail/phone-4.jpg'
        },
      ],
      swiperOption: { // 轮播图配置
        loop: true, // 开启循环
        // autoplay: true, // 开启自动播放
        pagination: { // 配置分页
          el: '.swiper-pagination', // 指定dom
          clickable: true // 可以点击切换
        },
        // navigation: { // 开启上下页按钮
        //   nextEl: '.swiper-button-next',
        //   prevEl: '.swiper-button-prev',
        // },
        // effect: 'cube', // 3d切换轮播图
        // cubeEffect: { // 开启一些效果
        //   slideShadows: true,
        //   shadow: true,
        //   shadowOffset: 100,
        //   shadowScale: 0.6
        // }
      }
    }
  },
  components: {
    ServiceBar,
    ProductParam,
    swiper,
    swiperSlide
  },
  methods: {
    getProductInfo () {
      this.axios.get(`api/products/${this.id}`)
        .then(res => {
          this.product = res
        })
    },
    joinCart () {
      this.axios.post('api/carts', {
        productId: this.id,
        selected: true
      })
        .then((res = { cartTotalQuantity: 0 }) => {
          this.$store.dispatch('saveCartCount', res.cartTotalQuantity)
          this.$router.push('/cart')
        })
    }
  },
  created () {
    this.getProductInfo()
  }
}
</script>

<style scoped lang="scss">
@import '../assets/scss/base.scss';
@import '../assets/scss/config.scss';
@import '../assets/scss/button.scss';
@import '../assets/scss/mixin.scss';
.detail {
  .container {
    .detail-swiper {
      width: 642px;
      height: 642px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .detail-info {
      width: 584px;
      // border: 1px solid transparent;
      .info-header {
        margin: 30px 0 26px;
        h2 {
          margin-bottom: 16px;
          font-size: $fontC;
        }
        p {
          font-size: $fontJ;
        }
      }
      .delivery {
        margin-bottom: 14px;
        color: $colorA;
        font-size: $fontI;
      }
      .info-price {
        color: $colorA;
        font-size: $fontG;
        span {
          margin-right: 10px;
          color: $colorD;
          font-size: $fontI;
          text-decoration-line: line-through;
        }
      }
      .line {
        border-bottom: 1px solid $colorH;
        margin: 20px 0;
      }
      .info-address {
        position: relative;
        height: 108px;
        padding: 31px 1px 1px 64px;
        font-size: $fontJ;
        background-color: #fafafa;
        border: 1px solid $colorH;
        box-sizing: border-box;
        &::before {
          content: ' ';
          position: absolute;
          top: 31px;
          left: 40px;
          width: 20px;
          height: 20px;
          background: url('/imgs/detail/icon-loc.png') no-repeat center;
          background-size: contain;
        }
        p:last-child {
          margin-top: 8px;
          color: $colorA;
        }
      }
      .info-select {
        margin-top: 30px;
        h3 {
          margin-bottom: 20px;
          font-size: $fontH;
        }
        ul {
          @include flex();
          li {
            height: 50px;
            width: 287px;
            margin-right: 10px;
            border: 1px solid $colorH;
            line-height: 50px;
            text-align: center;
            font-size: $fontI;
            cursor: pointer;
            &.checked {
              border: 1px solid $colorA;
            }
            &:last-child {
              margin: 0;
            }
            .color {
              display: inline-block;
              width: 14px;
              height: 14px;
              margin-right: 5px;
              background-color: $colorD;
            }
          }
        }
      }
      .info-count {
        height: 108px;
        padding: 24px 33px 29px 30px;
        margin: 30px 0 50px;
        background-color: #fafafa;
        box-sizing: border-box;
        .select {
          @include flex();
          font-size: $fontJ;
        }
        .count-total {
          margin-top: 18px;
          color: $colorA;
          font-size: $fontE;
        }
      }
      .join-cart {
        font-size: $fontI;
      }
    }
  }
  .price-detail {
    height: 340px;
    padding-top: 20px;
    margin-top: 20px;
    background-color: #f3f3f3;
    .container {
      h2 {
        font-size: $fontE;
        margin-bottom: 30px;
      }
    }
  }
}
</style>
