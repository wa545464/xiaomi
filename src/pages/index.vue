<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
        <div class="nav-menu">
          <ul class="menu-wrapper">
            <li class="menu-item">
              <a href="javascript:;">手机 电话卡</a>
              <div class="children">
                <ul v-for="(item,i) in menuList" :key="i">
                  <li v-for="(sub,j) in item" :key="j">
                    <a href="javascript:;">
                      <img v-lazy="(sub.img || '/imgs/item-box-1.png')" alt />
                      {{sub.name || '小米9'}}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电视 盒子</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">笔记本 平板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">家电 插线板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">出行 穿戴</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">智能 路由器</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电源 配件</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">生活 箱包</a>
            </li>
          </ul>
        </div>
        <swiper :options="swiperOption" ref="mySwiper">
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
      <div class="ads-box">
        <a :href="'/#/product/' + item.id" v-for="(item,index) in adsList" :key="index">
          <img v-lazy="item.img" alt />
        </a>
      </div>
      <div class="banner">
        <a href="/#/product/33">
          <img v-lazy="'/imgs/banner-1.png'" alt />
        </a>
      </div>
    </div>
    <div class="product-box">
      <div class="container">
        <h3>手机</h3>
        <div class="wrapper">
          <div class="wrapper-left">
            <a href="javascipt:;">
              <img v-lazy="'/imgs/mix-alpha.jpg'" alt />
            </a>
          </div>
          <div class="wrapper-right">
            <div class="list" v-for="(item,i) in products" :key="i">
              <div class="item" v-for="(sub,j) in item" :key="j">
                <span>新品</span>
                <div class="item-logo">
                  <img v-lazy="sub.mainImage" alt />
                </div>
                <div class="item-info">
                  <h3>{{sub.name}}</h3>
                  <p>{{sub.subtitle}}</p>
                  <p class="price" @click="show(sub.id)">{{sub.price}}元</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal
      :modalType="'1'"
      :title="'提示'"
      :btnType="2"
      :confirmText="'查看详情'"
      :showModal="showModal"
      @cancel="showModal=false"
      @confirm="goToCart"
    >
      <template v-slot:body>
        <p>商品添加成功!</p>
      </template>
    </modal>
    <service-bar></service-bar>
  </div>
</template>

<script>
import ServiceBar from '../components/ServiceBar'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Modal from '../components/Modal'
export default {
  data () {
    return {
      showModal: false,
      products: [],
      adsList: [
        {
          id: 33,
          img: '/imgs/ads/ads-1.png'
        },
        {
          id: 35,
          img: '/imgs/ads/ads-2.jpg'
        },
        {
          id: 45,
          img: '/imgs/ads/ads-3.png'
        }, {
          id: 38,
          img: '/imgs/ads/ads-4.jpg'
        }
      ],
      menuList: [
        [
          {
            id: 1,
            img: '/imgs/item-box-1.png',
            name: '小米CC9'
          },
          {
            id: 2,
            img: '/imgs/item-box-2.png',
            name: '小米8青春版'
          },
          {
            id: 3,
            img: '/imgs/item-box-3.jpg',
            name: 'Redmi K20 Pro'
          },
          {
            id: 4,
            img: '/imgs/item-box-4.jpg',
            name: '移动4G专区'
          }
        ], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]
      ],
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
    swiper,
    swiperSlide,
    ServiceBar,
    Modal
  },
  created () {
    this.getProducts()
  },
  methods: {
    getProducts () {
      this.axios.get('/api/products', {
        params: {
          categoryId: 100012,
          pageSize: 14
        }
      }).then(res => {
        this.products = [res.list.slice(6, 10), res.list.slice(10, 14)]
      })
    },
    show (id) {
      this.axios.post('api/carts', {
        productId: id,
        selected: true
      })
        .then(res => {
          this.$store.dispatch('saveCartCount', res.cartTotalQuantity)
          this.showModal = true
        })
        .catch(() => {
          this.showModal = true
        })
    },
    goToCart () {
      this.$router.push('/cart')
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/scss/base.scss';
@import '../assets/scss/mixin.scss';
@import '../assets/scss/config.scss';
.index {
  .container {
    .swiper-box {
      position: relative;
      .nav-menu {
        z-index: 9;
        position: absolute;
        width: 264px;
        height: 451px;
        padding: 26px 0;
        box-sizing: border-box;
        background-color: rgba(85, 88, 90, 0.48);
        .menu-wrapper {
          .menu-item {
            padding-left: 30px;
            height: 50px;
            a {
              position: relative;
              display: block;
              line-height: 50px;
              font-size: $fontI;
              color: $colorG;
              &::after {
                position: absolute;
                right: 30px;
                top: 17.5px;
                content: ' ';
                @include bgImg(10px, 15px, '/imgs/icon-arrow.png');
              }
            }
            &:hover {
              background-color: $colorA;
              .children {
                display: block;
              }
            }
            .children {
              display: none;
              z-index: 10;
              position: absolute;
              left: 264px;
              top: 0;
              width: 964px;
              height: 453px;
              background-color: $colorG;
              border: 1px solid $colorJ;
              ul {
                display: flex;
                justify-content: space-between;
                li {
                  flex: 1;
                  padding-left: 23px;
                  height: 75px;
                  a {
                    display: inline-block;
                    padding-left: 30px;
                    color: #333;
                    font-size: 14px;
                    img {
                      width: 42px;
                      height: 35px;
                      margin-right: 10px;
                      vertical-align: middle;
                    }
                  }
                }
              }
            }
          }
        }
      }
      .swiper-container {
        height: 451px;
        .swiper-button-prev {
          left: 270px;
        }
        a {
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .ads-box {
      @include flex();
      margin-top: 14px;
      margin-bottom: 31px;
      a {
        width: 296px;
        height: 167px;
      }
    }
    .banner {
      margin-bottom: 50px;
    }
  }
  .product-box {
    padding: 30px 0 50px;
    background-color: $colorJ;
    .container {
      h3 {
        font-size: $fontF;
        margin-bottom: 20px;
      }
      .wrapper {
        display: flex;
        .wrapper-left {
          margin-right: 16px;
          img {
            width: 224px;
            height: 619px;
          }
        }
        .wrapper-right {
          width: 986px;
          height: 622px;
          .list {
            @include flex();
            margin-bottom: 14px;
            &:last-child {
              margin: 0;
            }
            .item {
              width: 236px;
              height: 302px;
              text-align: center;
              background-color: $colorG;
              span {
                display: inline-block;
                width: 67px;
                height: 24px;
                background-color: #7ac965;
                line-height: 24px;
                text-align: center;
                color: white;
              }
              .item-logo {
                height: 195px;
                width: 236px;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
              h3 {
                font-size: $fontJ;
                line-height: $fontJ;
                margin: 0;
              }
              p {
                margin: 6px 0 13px;
                font-size: $fontJ;
                color: $colorD;
              }
              .price {
                color: #f2020a;
                font-weight: bold;
                cursor: pointer;
                &::after {
                  content: ' ';
                  @include bgImg(22px, 22px, '/imgs/icon-cart-hover.png');
                  vertical-align: middle;
                  margin-left: 5px;
                }
              }
            }
          }
        }
      }
    }
  }
}
.v-enter,
.v-leave {
  transform: translateY(-100%);
}
.v-enter-active,
.v-leave-active {
  transition: all 1s;
}
</style>
