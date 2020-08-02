<template>
  <div class="product-param" :class="{'is_fixed':is_fixed}">
    <div class="container">
      <div class="pro-title">{{title}}</div>
      <div class="pro-param">
        <a href="javascript:;">概要</a>
        <span>|</span>
        <a href="javascript:;">参数</a>
        <span>|</span>
        <a href="javascript:;">用户评价</a>
        <slot name="buy"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      is_fixed: false
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  components: {

  },
  mounted () {
    window.addEventListener('scroll', this.initHeight)
  },
  methods: {
    initHeight () {
      let scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop
      this.is_fixed = scrollTop > 152 ? true : false
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/scss/config.scss';
@import '../assets/scss/base.scss';
@import '../assets/scss/mixin.scss';
.product-param {
  height: 69px;
  border-top: 1px solid $colorH;
  line-height: 69px;
  background-color: $colorG;
  &.is_fixed {
    position: fixed;
    top: 0;
    z-index: 10;
    width: 100%;
    box-shadow: 0 5px 5px $colorE;
  }
  .container {
    @include flex();
    .pro-title {
      font-size: $fontH;
      color: $colorB;
      font-weight: bold;
    }
    .pro-param {
      font-size: $fontJ;
      color: $colorC;
      a {
        color: $colorC;
      }
      span {
        margin: 0 15px;
      }
    }
  }
}
</style>
