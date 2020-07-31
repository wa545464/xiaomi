<template>
  <div class="footer">
    <div class="footer-logo">
      <img src="/imgs/logo-footer.png" alt />
      <p>小米商城</p>
    </div>
    <div class="footer-link">
      <a href="javascript:;">Javue博客主页</a>
      <a href="javascript:;">Vue全栈学习</a>
      <a href="javascript:;">React全家桶学习</a>
      <a href="javascript:;">H5+小程序+Node+Mongo学习</a>
    </div>
    <div class="copyright">
      Copyright ©2019
      <span class="copyright-link">www.javue.com</span> All Rights Reserved.
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  components: {

  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
.footer {
  border-top: 4px solid #ff6000;
  color: #999;
  height: 238px;
  background-color: #333333;
  text-align: center;
  font-size: 16px;
  .footer-logo {
    margin-top: 46px;
    margin-bottom: 31px;
    img {
      width: 53px;
      height: 36px;
    }
  }
  .footer-link {
    margin-bottom: 10px;
    a {
      color: #999;
      margin-right: 20px;
      &::after {
        content: ' ';
        display: inline-block;
        width: 1px;
        height: 13px;
        margin-left: 13px;
        border-right: 1px solid #999;
      }
      &:last-child::after {
        display: none;
      }
    }
  }
  .copyright {
    .copyright-link {
      color: #ff6000;
    }
  }
}
</style>
