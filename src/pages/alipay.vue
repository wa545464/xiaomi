<template>
  <div class="alipay">
    <loading></loading>
    <div v-html="content"></div>
  </div>
</template>

<script>
import Loading from '../components/loading'
export default {
  data () {
    return {
      content: '',
      orderId: this.$route.query.orderNo
    }
  },
  components: {
    Loading
  },
  methods: {
    goPay () {
      this.axios.post('api/pay', {
        orderId: this.orderId,
        orderName: 'Vue全家桶', //扫码支付时订单名称
        amount: 0.01, //单位元
        payType: 1//1支付宝，2微信
      }).then(res => {
        this.content = res.content
        window.setTimeout(() => {
          document.forms[0].submit()
        }, 100)
      })
    }
  },
  created () {
    this.goPay()
  }
}
</script>

<style scoped>
</style>
