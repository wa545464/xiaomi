<template>
  <div class="header">
    <div class="top-bar">
      <div class="container">
        <div class="bar-menu">
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">MUI</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <div class="bar-user">
          <a href="javascript:;" v-if="username">{{username}}</a>
          <a href="javascript:;" v-else @click="login">登陆</a>
          <a href="javascript:;" class="my-cart" @click="goToCart">
            <span class="icon-my-cart"></span>购物车(0)
          </a>
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="header-logo">
          <a href="/#/index"></a>
        </div>
        <div class="header-menu">
          <div class="item-menu">
            <span>小米手机</span>
            <div class="children">
              <ul>
                <li class="product" v-for="item in phoneList" :key="item.id">
                  <a href="javascript:;">
                    <div class="pro-img">
                      <img v-lazy="item.mainImage" :alt="item.subtitle" />
                    </div>
                    <div class="pro-name">{{item.name}}</div>
                    <div class="pro-price">{{item.price | currency}}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>RedMi红米</span>
          </div>
          <div class="item-menu">
            <span>电视</span>
          </div>
        </div>
        <div class="header-search">
          <div class="wrapper">
            <input type="text" />
            <a href="javascript:;"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      phoneList: []
    }
  },
  filters: {
    currency (val) {
      if (!val) return '￥0.00元'
      return `￥${val.toFixed(2)}元`
    }
  },
  components: {

  },
  methods: {
    getPhoneList () {
      this.axios.get('/api/products', {
        params: {
          categoryId: 100012,
          pageSize: 6
        }
      }).then(res => {
        this.phoneList = res.list
      })
    },
    login () {
      this.$router.push('/login')
    },
    goToCart () {
      this.$router.push('/cart')
    }
  },
  created () {
    this.getPhoneList()
  }
}
</script>

<style scoped lang="scss">
@import '../assets/scss/base.scss';
@import '../assets/scss/mixin.scss';
@import '../assets/scss/config.scss';
.header {
  .top-bar {
    height: 39px;
    line-height: 39px;
    background-color: $colorB;
    .container {
      @include flex();
      a {
        margin-right: 17px;
        color: #b0b0b0;
      }
      .my-cart {
        display: inline-block;
        width: 110px;
        margin-right: 0;
        text-align: center;
        background-color: $colorA;
        color: #ffffff;
        span {
          @include bgImg(16px, 12px, '/imgs/icon-cart-checked.png');
          margin-right: 4px;
        }
      }
    }
  }
  .nav-header {
    height: 112px;
    line-height: 112px;
    .container {
      position: relative;
      @include flex();
      .header-logo {
        width: 55px;
        height: 55px;
        background-color: $colorA;
        a {
          display: inline-block;
          width: 110px;
          height: 55px;
          &::before {
            @include bgImg(55px, 55px, '/imgs/mi-logo.png');
            content: ' ';
            transition: margin 0.2s;
          }
          &:hover::before {
            margin-left: -55px;
          }
          &::after {
            @include bgImg(55px, 55px, '/imgs/mi-home.png');
            content: ' ';
          }
        }
      }
      .header-menu {
        width: 643px;
        padding-left: 209px;
        .item-menu {
          display: inline-block;
          margin-right: 20px;
          span {
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
          }
          &:hover {
            color: $colorA;
            .children {
              height: 220px;
              opacity: 1;
            }
          }
          .children {
            z-index: 10;
            position: absolute;
            left: 0;
            top: 112px;
            width: 1226px;
            height: 0;
            opacity: 0;
            overflow: hidden;
            transition: all 0.5s;
            font-size: $fontK;
            border-top: 1px solid #e5e5e5;
            box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
            background-color: #fff;
            .product {
              position: relative;
              float: left;
              height: 220px;
              width: 16.6%;
              font-size: $fontK;
              line-height: $fontK;

              &::after {
                position: absolute;
                top: 28px;
                right: 0;
                content: ' ';
                width: 1px;
                height: 100px;
                border-right: 1px solid #e5e5e5;
              }
              &:last-child::after {
                display: none;
              }
              a {
                display: inline-block;
                height: 188px;
                margin-top: 20px;
                .pro-img {
                  img {
                    width: auto;
                    height: 111px;
                  }
                }
                .pro-name {
                  margin-top: 10px;
                  margin-bottom: 10px;
                  text-align: center;
                  font-weight: bold;
                  color: $colorB;
                }
                .pro-price {
                  text-align: center;
                  font-weight: bold;
                  color: $colorA;
                }
              }
            }
          }
        }
      }
      .header-search {
        width: 319px;
        .wrapper {
          @include flex();
          width: 319px;
          height: 50px;
          border: 1px solid #e0e0e0;
          input {
            width: 264px;
            height: 50px;
            box-sizing: border-box;
            border: none;
            padding-left: 10px;
            border-right: 1px solid #e0e0e0;
          }
          a {
            @include bgImg(18px, 18px, '/imgs/icon-search.png');
            margin-right: 17px;
          }
        }
      }
    }
  }
}
</style>
