import { createApp } from 'vue'
import './style.css'
import './style/button.css'
import App from './App.vue'
import router from './router.js'
import store from './store.js'

const app = createApp(App)

// 初始化用户状态
store.dispatch('initializeUser')

app.use(store)
app.use(router)
app.mount('#app')
