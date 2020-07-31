<template>
  <div class="service-bar">
    <div class="container">
      <ul>
        <li>
          <span class="icon-setting"></span>预约维修服务
        </li>
        <li>
          <span class="icon-7day"></span>7天无理由退货
        </li>
        <li>
          <span class="icon-15day"></span>15天免费换货
        </li>
        <li>
          <span class="icon-post"></span>满150元包邮
        </li>
      </ul>
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
@import '../assets/scss/base.scss';
@import '../assets/scss/mixin.scss';
.service-bar {
  height: 23px;
  padding: 33px 0;
  font-size: 16px;
  color: #666;
  .container {
    li {
      width: 24.9%;
      float: left;
      text-align: center;
      span {
        vertical-align: middle;
        margin-right: 5px;
      }
      .icon-setting {
        @include bgImg(20px, 20px, '/imgs/icon-setting.png');
      }
      .icon-7day {
        @include bgImg(20px, 20px, '/imgs/icon-7day.png');
      }
      .icon-15day {
        @include bgImg(20px, 20px, '/imgs/icon-15day.png');
      }
      .icon-post {
        @include bgImg(20px, 20px, '/imgs/icon-post.png');
      }
    }
  }
}
</style>
