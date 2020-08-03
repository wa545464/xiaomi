<template>
  <div class="order-confirm">
    <order-header title="订单确认">
      <template v-slot:tip>
        <span>温馨提示：请认真填写收货地址</span>
      </template>
    </order-header>
    <div class="order-body">
      <div class="container">
        <div class="order-address">
          <h3>收货地址</h3>
          <ul class="clearfix">
            <li class="active-address">
              <a href="javascript:;">
                <div class="name">admin</div>
                <div class="phone">18814290436</div>
                <div class="address">北京 北京 北京 123</div>
                <div class="iconfont icon-lajitong trash"></div>
                <div class="iconfont icon-iconset0137 pen"></div>
              </a>
            </li>
            <li>
              <a href="javascript:;">
                <div class="name">admin</div>
                <div class="phone">18814290436</div>
                <div class="address">北京 北京 北京 123</div>
              </a>
            </li>
            <li>
              <a href="javascript:;">
                <div class="name">admin</div>
                <div class="phone">18814290436</div>
                <div class="address">北京 北京 北京 123</div>
              </a>
            </li>
            <li>
              <a href="javascript:;">
                <div class="name">admin</div>
                <div class="phone">18814290436</div>
                <div class="address">北京 北京 北京 123</div>
              </a>
            </li>
            <li class="addAddress">
              <div class="add-icon"></div>
              <div class="tip">添加收货地址</div>
            </li>
          </ul>
        </div>
        <div class="product-list">
          <h3>商品</h3>
          <ul>
            <li>
              <div class="goods-name">
                <img
                  src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9aab8a7fa9005ef918c9aa2d5f17c806.jpg"
                  alt
                />
                <span>Redmi K20 Pro 尊享版 骁龙855 Plus， 弹出全面屏</span>
              </div>
              <div class="goods-info">2699元x2</div>
              <div class="goods-price">5398元</div>
            </li>
            <li>
              <div class="goods-name">
                <img
                  src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9aab8a7fa9005ef918c9aa2d5f17c806.jpg"
                  alt
                />
                <span>Redmi K20 Pro 尊享版 骁龙855 Plus， 弹出全面屏</span>
              </div>
              <div class="goods-info">2699元x2</div>
              <div class="goods-price">5398元</div>
            </li>
          </ul>
        </div>
        <div class="order-info">
          <div class="delivery-mode">
            <h3>配送方式</h3>
            <span>包邮</span>
          </div>
          <div class="invoice">
            <h3>发票</h3>
            <span>电子发票个人</span>
            <span>个人</span>
          </div>
          <div class="product-info">
            商品数量：
            <span>2件</span>
          </div>
          <div class="product-info">
            商品总价：
            <span>32371元</span>
          </div>
          <div class="product-info">
            优惠活动：
            <span>0元</span>
          </div>
          <div class="product-info">
            运费：
            <span>0元</span>
          </div>
          <div class="product-info">
            应付总额：
            <span class="large">32371元</span>
          </div>
        </div>
        <div class="btns">
          <a href="javascript:;" class="btn btn-middle default-btn">返回购物车</a>
          <a href="javascript:;" class="btn btn-middle">去结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderHeader from '../components/OrderHeader'
export default {
  data () {
    return {

    }
  },
  components: {
    OrderHeader
  },
  methods: {

  }
}
</script>

<style lang="scss">
@import '../assets/scss/config.scss';
@import '../assets/scss/base.scss';
@import '../assets/scss/button.scss';
.order-body {
  background-color: $colorJ;
  padding: 30px 0 84px;
  .container {
    padding: 38px 0 40px 40px;
    box-sizing: border-box;
    background-color: $colorG;
    .order-address {
      h3 {
        margin-bottom: 21px;
        font-weight: 200;
        font-size: $fontG;
      }
      ul {
        li {
          position: relative;
          float: left;
          width: 221px;
          height: 148px;
          padding: 15px 24px;
          margin-right: 15px;
          margin-bottom: 10px;
          border: 1px solid $colorJ;
          cursor: pointer;
          a {
            display: inline-block;
            .name {
              margin-bottom: 10px;
              font-weight: 300;
              color: $colorB;
              font-size: $fontH;
            }
            .phone,
            .address {
              color: $colorD;
              font-size: $fontJ;
            }
            .pen,
            .trash {
              position: absolute;
              bottom: 24px;
              color: $colorB;
              font-size: 24px;
              &:hover {
                color: $colorA;
              }
            }
            .pen {
              right: 15px;
            }
            .trash {
              left: 15px;
            }
          }
        }
        .active-address {
          border: 1px solid $colorA;
        }
        .addAddress {
          color: $colorD;
          font-size: $fontJ;
          .add-icon {
            width: 30px;
            height: 30px;
            margin: 40px auto 10px;
            border-radius: 50%;
            background: url('/imgs/icon-add.png') no-repeat center;
            background-size: 14px 14px;
            background-color: $colorE;
          }
          .tip {
            text-align: center;
          }
        }
      }
    }
    .product-list {
      margin-top: 34px;
      h3 {
        font-size: $fontH;
        margin-bottom: 5px;
      }
      ul {
        border-top: 1px solid $colorH;
        border-bottom: 1px solid $colorH;
        padding: 10px 0;
        li {
          @include flex();
          height: 40px;
          line-height: 40px;
          font-size: $fontI;
          color: $colorB;
          .goods-name {
            flex: 8;
            img {
              width: 30px;
              height: 30px;
              vertical-align: middle;
            }
          }
          .goods-info {
            flex: 4;
          }
          .goods-price {
            flex: 1;
            color: $colorA;
          }
        }
      }
    }
    .order-info {
      font-size: $fontI;
      h3 {
        margin-top: 20px;
        display: inline-block;
        font-size: $fontG;
      }
      .delivery-mode {
        h3 {
          margin-right: 71px;
        }
        span {
          color: $colorA;
        }
      }
      .invoice {
        h3 {
          margin-right: 111px;
        }
        span {
          margin-right: 30px;
          color: $colorA;
        }
      }
      .product-info {
        text-align: right;
        margin-bottom: 8px;
        &:last-child {
          padding-bottom: 20px;
          border-bottom: 1px solid $colorH;
        }
        span {
          display: inline-block;
          width: 110px;
          margin-right: 45px;
          color: $colorA;
          &.large {
            font-size: $fontC;
          }
        }
      }
    }
    .btns {
      margin-top: 30px;
      text-align: right;
      a {
        margin-left: 20px;
      }
    }
  }
}
</style>
