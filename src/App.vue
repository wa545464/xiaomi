<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  mounted () {
    if (this.$cookie.get('userid')) {
      this.getUser()
      this.getCartCount()
    }
  },
  methods: {
    getUser () {
      this.axios.get('api/user').then((res = {}) => {
        this.$store.dispatch('saveUsername', res.username)
      })
    },
    getCartCount () {
      this.axios.get('api/carts/products/sum').then((res = 0) => {
        this.$store.dispatch('saveCartCount', res)
      })
    }
  }
}
</script>

<style lang="scss">
@import './assets/scss/reset.scss';
@import './assets/scss/config.scss';
</style>
