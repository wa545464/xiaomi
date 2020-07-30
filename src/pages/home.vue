<template>
  <div class="home">
    <nav-header></nav-header>
    <router-view></router-view>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from '../components/NavHeader'
import NavFooter from '../components/NavFooter'
export default {
  data () {
    return {

    }
  },
  components: {
    NavFooter,
    NavHeader
  },
  methods: {

  },
  mounted () {
  }
}
</script>

<style scoped>
</style>
