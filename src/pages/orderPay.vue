<template>
  <div class="orderpay">
    <order-header title="订单支付">
      <template v-slot:tip>
        <span>温馨提示：请谨防钓鱼链接或诈骗电话</span>
      </template>
    </order-header>
    <div class="orderpay-body">
      <div class="container">
        <div class="order-msg">
          <div class="item-order">
            <div class="success-logo"></div>
            <div class="order-info">
              <h3>订单提交成功！去付款咯～</h3>
              <p>
                请在
                <span>30分钟</span>内完成支付, 超时后将取消订单
              </p>
              <p>收货信息：{{addressInfo}}</p>
            </div>
            <div class="order-total">
              <p>
                应付金额：
                <span>{{totalPrice}}</span>元
              </p>
              <p>
                订单详情
                <span class="more" ref="more" @click="toggle"></span>
              </p>
            </div>
          </div>
          <div class="order-detail" v-show="showMore">
            <div class="detail-item">
              订单号：
              <span>1596528219250</span>
            </div>
            <div class="detail-item">
              收货信息：
              <span>{{addressInfo}}</span>
            </div>
            <div class="detail-item clearfix">
              <div class="detail-title fl">商品名称：</div>
              <ul class="fl">
                <li v-for="(item,index) in goodsList" :key="index">
                  <img v-lazy="item.productImage" alt />
                  {{item.productName}}
                </li>
              </ul>
            </div>
            <div class="detail-item">
              发票信息：
              <span>电子发票 个人</span>
            </div>
          </div>
        </div>
        <div class="select-pay">
          <h3>选择以下支付方式付款</h3>
          <div class="pay-mode clearfix">
            <h4>支付平台</h4>
            <div class="alipay fl pay" @click="paySubmit(1)" :class="{'checked': payType === 1}"></div>
            <div class="wechatpay fl pay" @click="paySubmit(2)" :class="{'checked': payType === 2}"></div>
          </div>
        </div>
      </div>
    </div>
    <scan-pay-code :showPay="showPay" @close="closePay" :img="qrcode"></scan-pay-code>
    <modal
      title="支付确认"
      confirmText="查看订单详情"
      cancelText="未支付"
      :showModal="showModal"
      @cancel="showModal=false"
      @confirm="goOrderList"
    >
      <template v-slot:body>
        <p>是否已完成支付？</p>
      </template>
    </modal>
  </div>
</template>

<script>
import OrderHeader from '../components/OrderHeader'
import ScanPayCode from '../components/ScanPayCode'
import Modal from '../components/Modal'
import QRCode from 'qrcode'
export default {
  data () {
    return {
      showMore: true, // 展示订单详情
      orderNo: this.$route.query.orderNo, // 订单号
      addressInfo: '', // 地址
      goodsList: [], // 商品列表
      totalPrice: 0, // 总价格
      payType: 0, // 1是支付宝支付，2是微信支付
      showPay: false, // 展示微信二维码支付
      qrcode: '', // 二维码base64图片
      showModal: false, // 支付确认弹框
      T: '' // 定时器
    }
  },
  components: {
    OrderHeader,
    ScanPayCode,
    Modal
  },
  created () {
    this.getOrderDetail()
  },
  methods: {
    toggle () {
      this.showMore = !this.showMore
      let deg = this.showMore ? '0' : '180'
      this.$refs.more.style.transform = `rotate(${deg}deg)`
    },
    getOrderDetail () {
      this.axios.get(`api/orders/${this.orderNo}`).then(res => {
        const address = res.shippingVo
        this.addressInfo = `${address.receiverProvince} ${address.receiverCity} ${address.receiverDistrict} ${address.receiverAddress}  `
        this.goodsList = res.orderItemVoList
        this.totalPrice = this.goodsList.reduce((sum, item) => sum + item.totalPrice, 0)
      })
    },
    goOrderList () {
      this.$router.push('/order/orderList')
    },
    closePay () {
      this.showPay = false
      this.showModal = true
      window.clearInterval(this.T)
    },
    loopOrderState () {
      this.T = window.setInterval(() => {
        this.axios.get(`api/orders/${this.orderNo}`).then(res => {
          if (res.state === 20) {
            window.clearInterval(this.T)
            this.goOrderList()
          }
        })
      }, 1000)
    },
    paySubmit (payType) {
      this.payType = payType
      if (payType === 1) {
        window.open(`/#/order/alipay?orderNo=${this.orderNo}`, '_blank')
      } else {
        this.axios.post('api/pay', {
          orderId: this.orderNo,
          orderName: 'Vue全家桶', //扫码支付时订单名称
          amount: 0.01, //单位元
          payType: 2//1支付宝，2微信
        }).then(res => {
          QRCode.toDataURL(res.content)
            .then(url => {
              this.qrcode = url
              this.showPay = true
              this.loopOrderState()
            })
            .catch(err => {
              console.error(err)
            })
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/config.scss';
@import '../assets/scss/base.scss';
@import '../assets/scss/mixin.scss';
.orderpay {
  .orderpay-body {
    background-color: $colorJ;
    padding: 30px 0 61px 0;
    .container {
      padding-top: 30px;
      .order-msg {
        padding: 62px 50px;
        margin-bottom: 30px;
        box-sizing: border-box;
        background-color: $colorG;
        .item-order {
          display: flex;
          height: 90px;
          .success-logo {
            width: 90px;
            height: 90px;
            border-radius: 50%;
            margin-right: 40px;
            background: url('/imgs/icon-gou.png') #80c58a no-repeat center;
            background-size: 60px;
          }
          .order-info {
            margin-right: 276px;
            color: $colorC;
            h3 {
              color: $colorB;
              font-size: $fontE;
              margin-bottom: 20px;
            }
            span {
              color: $colorA;
            }
          }
          .order-total {
            p {
              font-size: $fontJ;
              color: $colorB;
              span {
                color: $colorA;
                font-size: $fontC;
              }
              &:first-child {
                margin-bottom: 30px;
              }
              .more {
                display: inline-block;
                width: 14px;
                height: 10px;
                background: url('/imgs/icon-down.png') no-repeat center;
                background-size: contain;
                cursor: pointer;
                transition: all 0.5s;
              }
            }
          }
        }
        .order-detail {
          margin-top: 45px;
          border-top: 1px solid $colorH;
          padding: 47px 0 0 130px;
          box-sizing: border-box;
          .detail-item {
            margin-bottom: 20px;
            font-size: $fontJ;
            img {
              width: 30px;
              height: 30px;
              vertical-align: middle;
            }
          }
        }
      }
      .select-pay {
        padding: 26px 50px 72px 50px;
        background-color: $colorG;
        h3 {
          font-size: $fontG;
          font-weight: 200;
          padding-bottom: 20px;
          margin-bottom: 10px;
          border-bottom: 1px solid $colorH;
        }
        .pay-mode {
          h4 {
            margin-bottom: 20px;
            margin-top: 5px;
            font-size: $fontH;
            font-weight: 200;
          }
          .pay {
            width: 190px;
            height: 66px;
            border: 1px solid $colorH;
            margin-right: 10px;
            cursor: pointer;
          }
          .alipay {
            background: url('/imgs/pay/icon-ali.png') no-repeat center;
            background-size: 103px 38px;
          }
          .wechatpay {
            background: url('/imgs/pay/icon-wechat.png') no-repeat center;
            background-size: 103px 38px;
          }
          .checked {
            border: 1px solid $colorA;
          }
        }
      }
    }
  }
}
</style>
