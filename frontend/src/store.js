import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      // 登录用户信息
      user: {
        username: null,
        token: null,
        isLoggedIn: false
      }
    }
  },

  mutations: {
    // 设置登录信息
    setLoginInfo(state, { username, token }) {
      state.user.username = username
      state.user.token = token
      state.user.isLoggedIn = true
      localStorage.setItem('token', token)
      localStorage.setItem('username', username)
    },

    // 登出
    logout(state) {
      state.user.username = null
      state.user.token = null
      state.user.isLoggedIn = false
      localStorage.removeItem('token')
      localStorage.removeItem('username')
    },

    // 初始化用户状态（从本地存储恢复）
    initializeUser(state) {
      const token = localStorage.getItem('token')
      const username = localStorage.getItem('username')
      if (token && username) {
        state.user.token = token
        state.user.username = username
        state.user.isLoggedIn = true
      }
    }
  },

  actions: {
    // 设置登录信息
    setLoginInfo({ commit }, userInfo) {
      commit('setLoginInfo', userInfo)
    },

    // 登出
    logout({ commit }) {
      commit('logout')
    },

    // 初始化用户状态
    initializeUser({ commit }) {
      commit('initializeUser')
    }
  }
})

export default store
