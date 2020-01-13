import Vue from 'vue'
// import 'normalize.css/normalize.css'
// import Element from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import {
  Container,
  Aside,
  Header,
  Main,
  Footer,
  Button,
} from 'element-ui'
import './style/index'

import App from './App'
import router from './router'

Vue.use(Container)
  .use(Header)
  .use(Aside)
  .use(Main)
  .use(Footer)
  .use(Button)

// Vue.use(Element, {
//   size: 'medium', // set element-ui default size
//   // i18n: (key, value) => i18n.t(key, value),
// })

Vue.config.productionTip = false

if (process.env.NODE_ENV == 'development') {
  Vue.config.devtools = true
} else {
  Vue.config.devtools = false
}

new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
