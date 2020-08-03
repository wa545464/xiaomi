<template>
  <div class="order-header">
    <div class="container clearfix">
      <div class="header-logo fl">
        <a href="/#/index"></a>
      </div>
      <div class="title fl">
        <h2>{{title}}</h2>
        <slot name="tip"></slot>
      </div>
      <div class="username fr">
        <a href="javascript:;">{{username}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['username'])
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  components: {

  },
  methods: {

  }
}
</script>

<style lang="scss">
@import '../assets/scss/base.scss';
.order-header {
  height: 55;
  padding: 33px 0 33px;
  border-bottom: 2px solid $colorA;
  .container {
    .title,
    .username {
      height: 55px;
      line-height: 55px;
    }
    .title {
      margin-left: 55px;

      h2 {
        font-size: 28px;
        display: inline-block;
      }
      span {
        margin-left: 17px;
        font-size: 14px;
        color: rgb(153, 153, 153);
      }
    }
    .username {
      font-size: 16px;
      a {
        color: rgb(102, 102, 102);
      }
    }
  }
}
</style>
