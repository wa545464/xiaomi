<template>
  <div class="no-data">
    <img src="/imgs/icon-no-data.png" alt />
    <p>当前暂无提交的订单记录</p>
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

<style lang="scss">
.no-data {
  text-align: center;
  font-size: 20px;
  color: #999;
  margin-bottom: 80px;
  img {
    width: 210px;
    margin-bottom: 20px;
  }
}
</style>
