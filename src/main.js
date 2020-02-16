import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'


// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

// 引入moment
import moment from 'moment'//导入文件

Vue.prototype.$moment = moment;//赋值使用

var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8443/api'
Vue.prototype.$axios = axios
Vue.config.productionTip = false




Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  //这个的逻辑很简单，首先判断访问的路径是否需要登录，如果需要，
  // 判断 store 里有没有存储 user 的信息，如果存在，则放行，否则跳转到登录页面，并存储访问的页面路径（以便在登录后跳转到访问页）。 eg,/login 就没有reuireauth 直接放行，如果有 就看用户名存不存在，如果存在，则放行，否则跳转到登录页面，并存储访问的页面路径（以便在登录后跳转到访问页
    if (to.meta.requireAuth) {
      if (store.state.user.username) {
        next()
      } else {
        next({
          path: 'login',
          query: {redirect: to.fullPath}
        })
      }
    } else {
      next()
    }
  }
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  components: { App },
  template: '<App/>'
})
