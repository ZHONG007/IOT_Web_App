import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/index.less'
// Load element UI Lib
import ElementUI from 'element-ui'
// Load element UI style CSS
import 'element-ui/lib/theme-chalk/index.css'

// import '@/assets/css/main.css'

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
