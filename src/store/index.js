import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


// 我们需要一个记录用户信息的变量
export default new Vuex.Store({
  state: {
    user: {
      // 这里我们还用到了 localStorage，即本地存储，在项目打开的时候会判断本地存储中是否有 user 这个对象存在，如果存在就取出来并获得 username 的值，否则则把 username 设置为空。这样我们只要不清除缓存，登录的状态就会一直保存
      username: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).username
    }
  },
  mutations: {
    login(state, user) {
      // 页面调用时传入user并存储在本地
      state.user = user
      window.localStorage.setItem('user', JSON.stringify(user))
    }
  }
})
