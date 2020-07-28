<template>
  <div class="order">
    <order-header></order-header>
    <router-view></router-view>
  </div>
</template>

<script>
import OrderHeader from '../components/OrderHeader'
export default {
  data () {
    return {

    }
  },
  components: {
    OrderHeader
  },
  methods: {

  }
}
</script>

<style scoped>
</style>
