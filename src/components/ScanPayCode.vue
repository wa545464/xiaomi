<template>
  <div class="scan-pay" v-show="showPay">
    <div class="mask"></div>
    <div class="pay">
      <img src="/imgs/pay/icon-scan.png" alt />
      <div class="qr">
        <h3>
          微信支付
          <span @click="$emit('close')"></span>
        </h3>
        <div class="qr-code">
          <img :src="img" alt />
        </div>
        <div class="info">
          <p>请使用微信扫一扫</p>
          <p>二维码完成支付</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: {
    img: {
      type: String,
      default: ''
    },
    showPay: {
      type: Boolean,
      default: false
    }
  },
  components: {

  },
  methods: {

  }
}
</script>

<style lang="scss">
@import '../assets/scss/mixin.scss';
@import '../assets/scss/config.scss';
.scan-pay {
  @include position(fixed);
  z-index: 11;
  .mask {
    @include position(fixed);
    background-color: rgba(51, 51, 51, 0.6);
  }
  .pay {
    display: flex;
    @include position(fixed, 50%, 50%, 675px, 485px);
    transform: translate(-50%, -50%);
    img {
      width: 296px;
      height: 485px;
    }
    .qr {
      width: 370px;
      height: 440px;
      padding: 20px 0;
      h3 {
        position: relative;
        height: 60px;
        padding: 0 18px;
        box-sizing: border-box;
        line-height: 60px;
        font-size: 20px;
        font-weight: 200;
        background-color: #f5f5f5;
        span {
          position: absolute;
          right: 20px;
          top: 20px;
          @include bgImg(13px, 13px, '/imgs/icon-close.png');
          cursor: pointer;
        }
      }
      .qr-code {
        height: 312px;
        padding: 40px 0 26px;
        box-sizing: border-box;
        background-color: #fff;
        text-align: center;
        img {
          width: 237px;
          height: 240px;
        }
      }
      .info {
        text-align: center;
        background-color: #fff;
        padding-bottom: 30px;
        font-size: 14px;
      }
    }
  }
}
</style>
