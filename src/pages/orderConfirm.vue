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
            <li
              :class="{'active-address': selectIndex === i}"
              v-for="(item,i) in addressList"
              :key="i"
              @click="selectIndex = i"
            >
              <a href="javascript:;">
                <div class="name">{{item.receiverName}}</div>
                <div class="phone">{{item.receiverPhone}}</div>
                <div
                  class="address"
                >{{item.receiverProvince + " " + item.receiverCity + " " + item.receiverDistrict}}</div>
                <div class="iconfont icon-lajitong trash" @click.stop="delAddress(item)"></div>
                <div class="iconfont icon-iconset0137 pen" @click.stop="editAddress(item)"></div>
              </a>
            </li>
            <li class="addAddress" @click="addAddress">
              <div class="add-icon"></div>
              <div class="tip">添加收货地址</div>
            </li>
          </ul>
        </div>
        <div class="product-list">
          <h3>商品</h3>
          <ul>
            <li v-for="(item,index) in cartList" :key="index">
              <div class="goods-name">
                <img v-lazy="item.productMainImage" alt />
                <span>{{item.productName + ' '+ item.productSubtitle}}</span>
              </div>
              <div class="goods-info">{{item.productPrice}}元x{{item.quantity}}</div>
              <div class="goods-price">{{item.productTotalPrice}}元</div>
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
            <span>{{count}}件</span>
          </div>
          <div class="product-info">
            商品总价：
            <span>{{totalPrice}}元</span>
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
            <span class="large">{{totalPrice}}元</span>
          </div>
        </div>
        <div class="btns">
          <a href="/#/cart" class="btn btn-middle default-btn">返回购物车</a>
          <a href="javascript:;" class="btn btn-middle" @click="submitOrder">去结算</a>
        </div>
      </div>
    </div>
    <modal
      title="删除确认"
      modalType="small"
      :showModal="showDelModal"
      @confirm="submitAddress"
      @cancel="showDelModal=false"
    >
      <template v-slot:body>
        <p>您确认要删除此地址吗？</p>
      </template>
    </modal>
    <modal
      title="新增地址"
      modalType="small"
      :showModal="showEditModal"
      @confirm="submitAddress"
      @cancel="showEditModal=false"
    >
      <template v-slot:body>
        <div class="edit-wrapper">
          <div class="item">
            <input
              type="text"
              class="input"
              name="name"
              placeholder="姓名"
              v-model="checkItem.receiverName"
            />
            <input
              type="text"
              class="input"
              name="phone"
              placeholder="手机"
              v-model="checkItem.receiverMobile"
            />
          </div>
          <div class="item">
            <select name="province" v-model="checkItem.receiverProvince">
              <option value="北京">北京</option>
              <option value="广东">广东</option>
              <option value="天津">天津</option>
            </select>
            <select name="city" v-model="checkItem.receiverCity">
              <option value="北京">北京</option>
              <option value="湛江">湛江</option>
              <option value="广州">广州</option>
              <option value="长沙">长沙</option>
            </select>
            <select name="district" v-model="checkItem.receiverDistrict">
              <option value="增城区">增城区</option>
              <option value="东城区">东城区</option>
              <option value="浦东区">浦东区</option>
              <option value="天河区">天河区</option>
              <option value="西城区">西城区</option>
            </select>
          </div>
          <div class="item">
            <textarea name="address" v-model="checkItem.receiverAddress"></textarea>
          </div>
          <div class="item">
            <input type="text" class="input" placeholder="邮编" v-model="checkItem.receiverZip" />
          </div>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import OrderHeader from '../components/OrderHeader'
import Modal from '../components/Modal'
export default {
  data () {
    return {
      addressList: [], // 地址列表
      cartList: [], // 购物车列表
      totalPrice: 0,
      count: 0,
      checkItem: {}, // 选择操作的地址项
      userAction: 0, // 用户操作：0：新增 1：编辑 2：删除
      showDelModal: false,
      showEditModal: false,
      selectIndex: 0
    }
  },
  components: {
    OrderHeader,
    Modal
  },
  methods: {
    getAddressList () {
      this.axios.get('api/shippings').then(res => {
        this.addressList = res.list
      })
    },
    getCartList () {
      this.axios.get('api/carts').then(res => {
        this.cartList = res.cartProductVoList.filter(item => item.productSelected)
        this.totalPrice = res.cartTotalPrice
        this.count = this.cartList.reduce((sum, item) => item.quantity + sum, 0)
      })
    },
    delAddress (item) {
      this.checkItem = item
      this.userAction = 2
      this.showDelModal = true
    },
    editAddress (item) {
      this.checkItem = item
      this.userAction = 1
      this.showEditModal = true
    },
    addAddress () {
      this.showEditModal = true
      this.userAction = 0
      this.checkItem = {}
    },
    submitAddress () {
      const { checkItem, userAction } = this
      let path, method, params = {}
      if (userAction === 2) {
        method = 'delete'
        path = `api/shippings/${checkItem.id}`
      }
      else if (userAction === 1) {
        method = 'put'
        path = `api/shippings/${checkItem.id}`
      } else {
        method = "post"
        path = 'api/shippings'
      }
      if (userAction === 1 || userAction === 0) {
        let { receiverAddress, receiverCity, receiverDistrict, receiverMobile, receiverName, receiverProvince, receiverZip } = this.checkItem
        let errMsg = ''
        params = {
          receiverAddress,
          receiverCity,
          receiverDistrict,
          receiverMobile,
          receiverName,
          receiverProvince,
          receiverZip
        }
        if (!receiverName) {
          errMsg = '请输入收货人姓名'
        } else if (!receiverMobile || !/\d{11}/.test(receiverMobile)) {
          errMsg = '请输入正确的手机号码'
        } else if (!receiverProvince || !receiverCity || !receiverDistrict) {
          errMsg = '请选择省份/城市/区县'
        } else if (!receiverAddress) {
          errMsg = '请输入收货地址'
        } else if (!/\d{6}/.test(receiverZip)) {
          errMsg = '请输入6位邮编'
        }
        if (errMsg) {
          this.$message.error(errMsg)
          return
        }
      }
      this.axios[method](path, params).then(() => {
        this.closeModal()
        this.getAddressList()
        this.$message.success('操作成功')
      })
    },
    closeModal () {
      this.checkItem = {}
      this.userAction = ''
      this.showDelModal = false
      this.showEditModal = false
    },
    submitOrder () {
      let item = this.addressList[this.selectIndex]
      if (!item) {
        this.$message.error('请选择收货地址')
        return
      }
      this.axios.post('api/orders', {
        shippingId: item.id
      }).then(res => {
        this.$router.push({
          path: '/order/pay',
          query: {
            orderNo: res.orderNo
          }
        })
      })
    }
  },
  created () {
    this.getAddressList()
    this.getCartList()
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
.edit-wrapper {
  font-size: $fontJ;
  .item {
    margin-bottom: 15px;
    .input {
      width: 283px;
      height: 40px;
      border: 1px solid $colorH;
      padding-left: 15px;
      line-height: 40px;
      & + .input {
        margin-left: 14px;
      }
    }
    select {
      width: 52px;
      height: 40px;
      line-height: 40px;
      margin-right: 15px;
      border: 1px solid $colorH;
    }
    textarea {
      width: 100%;
      height: 62px;
      padding: 13px 15px;
      box-sizing: border-box;
      border: 1px solid $colorH;
    }
  }
}
</style>
