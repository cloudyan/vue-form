import Vue from 'vue'
// import 'normalize.css/normalize.css'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'

Vue.use(Element, {
  size: 'medium', // set element-ui default size
  // i18n: (key, value) => i18n.t(key, value),
})

new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
