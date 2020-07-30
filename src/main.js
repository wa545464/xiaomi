import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import App from './App.vue'
// import env from './env'

Vue.config.productionTip = false

// axios.defaults.baseURL = env.baseURL
axios.defaults.baseURL = '/api'
axios.defaults.tiemout = 8000

axios.interceptors.response.use((response) => {
  const res = response.data
  if (res.status == 0) {
    return res.data
  } else if (res.status === 0) {
    window.location.href = '/#/login'
  } else {
    window.alert(res.msg)
  }
})

Vue.use(VueAxios, axios)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
