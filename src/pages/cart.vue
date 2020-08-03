<template>
  <div class="cart">
    <order-header title="我的购物车">
      <template v-slot:tip>
        <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
      </template>
    </order-header>
    <div class="cart-body">
      <div class="container">
        <div class="cart-box">
          <ul class="cart-item-head">
            <li class="col-1">
              <span :class="selectAll ? 'checkbox' : 'nocheck'" @click="toggleSelectAll"></span>
              全选
            </li>
            <li class="col-2">商品名称</li>
            <li class="col-3">单价</li>
            <li class="col-4">数量</li>
            <li class="col-5">小计</li>
            <li class="col-6">操作</li>
          </ul>
          <ul class="cart-item-list">
            <li class="cart-item" v-for="(item,index) in cartList" :key="index">
              <div class="item-check">
                <span
                  :class="item.productSelected ? 'checkbox' : 'nocheck'"
                  @click="updateProduct(item)"
                ></span>
              </div>
              <div class="item-name">
                <img v-lazy="item.productMainImage" alt />
                <span>{{item.productName}} , {{item.productSubtitle}}</span>
              </div>
              <div class="item-price">{{item.productPrice}}</div>
              <div class="item-num">
                <div class="num-box">
                  <a href="javascript:;" @click="updateProduct(item,'-')">-</a>
                  <span>{{item.quantity}}</span>
                  <a href="javascript:;" @click="updateProduct(item,'+')">＋</a>
                </div>
              </div>
              <div class="item-total">{{item.productTotalPrice}}</div>
              <div class="item-del" @click="showDelModal(item.productId)"></div>
            </li>
          </ul>
          <div class="cart-total clearfix">
            <div class="total-info fl">
              <a href="javascript:;">继续购物</a>
              共
              <span>{{cartList.length}}</span> 件商品，已选择
              <span>{{checkedNum}}</span> 件
            </div>
            <div class="total-price fr">
              合计：
              <span>{{totalPrice}}</span>元
              <a class="btn btn-middle" @click="order">去结算</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
    <modal
      modalType="middle"
      title="温馨提示"
      :btnType="1"
      :showModal="showModal"
      @confirm="delProduct"
      @cancel="showModal = false"
    >
      <template v-slot:body>
        <p>是否确定移除该商品？</p>
      </template>
    </modal>
  </div>
</template>

<script>
import OrderHeader from '../components/OrderHeader'
import ServiceBar from '../components/ServiceBar'
import NavFooter from '../components/NavFooter'
import Modal from '../components/Modal'
export default {
  data () {
    return {
      selectAll: false,
      cartList: [],
      checkedNum: 0,
      totalPrice: 0,
      showModal: false,
      delId: ''
    }
  },
  components: {
    OrderHeader,
    ServiceBar,
    NavFooter,
    Modal
  },
  methods: {
    getCartInfo () {
      this.axios.get('api/carts').then(res => {
        this.renderData(res)
      })
    },
    toggleSelectAll () {
      const path = this.selectAll ? 'unSelectAll' : 'selectAll'
      this.axios.put(`api/carts/${path}`)
        .then(res => {
          this.renderData(res)
        })
    },
    updateProduct (item, type) {
      let quantity = item.quantity
      let maxQuantity = item.productStock
      let selected = item.productSelected
      switch (type) {
        case '-':
          if (quantity === 1) {
            this.$message.warning('商品至少保留一件')
            return
          } else {
            quantity -= 1
          }
          break
        case '+':
          if (quantity === maxQuantity) {
            this.$message.warning('商品数量不能大于库存')
            return
          } else {
            quantity += 1
          }
          break
        default:
          selected = !selected
      }
      this.axios.put(`api/carts/${item.productId}`, {
        quantity,
        selected
      }).then(res => {
        this.renderData(res)
      })
    },
    showDelModal (id) {
      this.delId = id
      this.showModal = true
    },
    delProduct () {
      this.axios.delete(`api/carts/${this.delId}`).then(res => {
        this.renderData(res)
        this.showModal = false
        this.$message.success('移除成功')
      })
    },
    renderData (res) {
      this.cartList = res.cartProductVoList || []
      this.selectAll = res.selectedAll
      this.totalPrice = res.cartTotalPrice
      this.checkedNum = this.cartList.filter(item => item.productSelected).length
    },
    order () {
      let isChecked = this.cartList.some(item => item.productSelected === true)
      if (isChecked) {
        this.$router.push('/order/confirm')
      } else {
        this.$message.warning('至少选择一件商品')
      }
    }
  },
  created () {
    this.getCartInfo()
  }
}
</script>

<style lang="scss">
@import '../assets/scss/config.scss';
@import '../assets/scss/mixin.scss';
@import '../assets/scss/base.scss';
@import '../assets/scss/button.scss';
.cart {
  .cart-body {
    padding: 30px 0 114px;
    background-color: $colorJ;
    .container {
      .cart-box {
        .cart-item-head {
          @include flex();
          height: 79px;
          background-color: $colorG;
          text-align: center;
          line-height: 79px;
          color: $colorD;
          font-size: $fontJ;
          .col-1 {
            flex: 1;
            span {
              cursor: pointer;
              margin-right: 6px;
              vertical-align: middle;
            }
          }
          .col-2 {
            flex: 3;
          }
          .col-3 {
            flex: 1;
          }
          .col-4 {
            flex: 2;
          }
          .col-5 {
            flex: 1;
          }
          .col-6 {
            flex: 1;
          }
        }
        .cart-item-list {
          .cart-item {
            @include flex();
            height: 126px;
            margin-top: 1px;
            background-color: $colorG;
            text-align: center;
            font-size: $fontI;
            .item-check {
              flex: 1;
              span {
                cursor: pointer;
              }
            }
            .item-name {
              flex: 3;
              @include flex();
              img {
                width: 80px;
                height: 80px;
                vertical-align: middle;
              }
              span {
                display: inline-block;
                margin-left: 30px;
              }
            }
            .item-price {
              flex: 1;
            }
            .item-num {
              flex: 2;
              .num-box {
                height: 40px;
                width: 150px;
                margin: 0 auto;
                line-height: 40px;
                border: 1px solid $colorH;
                a,
                span {
                  display: inline-block;
                  width: 50px;
                  color: $colorB;
                }
              }
            }
            .item-total {
              flex: 1;
              color: $colorA;
            }
            .item-del {
              flex: 1;
              @include bgImg(14px, 12px, '/imgs/icon-close.png');
              cursor: pointer;
            }
          }
        }
        .cart-total {
          height: 50px;
          margin-top: 20px;
          font-size: $fontJ;
          .total-info {
            a {
              color: $colorB;
              margin-right: 25px;
            }
          }
          .total-price {
            color: $colorA;
            span {
              font-size: $fontE;
            }
            a {
              margin-left: 25px;
            }
          }
          span {
            color: $colorA;
          }
        }
      }
    }
  }
}
</style>
