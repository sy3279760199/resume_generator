import { createRouter, createWebHistory } from 'vue-router'
import Login from './views/Login.vue'
import home from './views/home.vue'
import ResumeEditor from './views/ResumeEditor.vue'
import store from './store.js'

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { requiresAuth: false }
    },
    {
        path: '/home',
        name: 'Home',
        component: home,
        meta: { requiresAuth: true }
    },
    {
        path: '/editor',
        name: 'ResumeEditor',
        component: ResumeEditor,
        meta: { requiresAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// 路由守卫 - 检查认证状态
router.beforeEach((to, from, next) => {
    // 从本地存储恢复登录状态
    const token = localStorage.getItem('token')
    const username = localStorage.getItem('username')

    if (token && username && !store.state.user.isLoggedIn) {
        // 恢复登录状态
        store.dispatch('setLoginInfo', {
            username: username,
            token: token
        })
    }

    // 检查路由是否需要认证
    if (to.meta.requiresAuth && !store.state.user.isLoggedIn) {
        // 需要登录但未登录，重定向到登录页
        next('/login')
    } else if (to.path === '/login' && store.state.user.isLoggedIn) {
        // 已登录但要访问登录页，重定向到首页
        next('/home')
    } else {
        next()
    }
})

export default router
