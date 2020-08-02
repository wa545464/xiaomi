import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'

import router from './router'
import App from './App.vue'
import store from './store'
// import env from './env'

Vue.config.productionTip = false

// axios.defaults.baseURL = env.baseURL
axios.defaults.baseURL = '/api'
axios.defaults.tiemout = 8000

axios.interceptors.response.use((response) => {
  const res = response.data
  const hash = window.location.hash
  if (res.status == 0) {
    return res.data
  } else if (res.status === 0) {
    if (hash !== '#/index') {
      window.location.href = '/#/login'
    }
    return Promise.reject(res)
  } else {
    window.alert(res.msg)
    return Promise.reject(res)
  }
})

Vue.use(VueAxios, axios)
Vue.use(VueLazyLoad, {
  loading: require('../public/imgs/loading-svg/loading-bars.svg')
})
Vue.use(VueCookie)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
