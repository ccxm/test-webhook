import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import './js/extendPrototype'
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import './js/resize'
import router from "./router"
import * as tip from './js/tips'
import * as api from './js/http/api'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import leMarkdownEditor from 'le-markdown-editor'
import InstallPlugins from './plugins'
import './style/font.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$tip = tip
Vue.prototype.$api = api
Vue.prototype.$bus = new Vue()
Vue.use(InstallPlugins)
Vue.use(leMarkdownEditor)

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

const vue = new Vue({
  router,
  render: h => h(App),
  mounted() {
  }
}).$mount('#app')

export default vue
