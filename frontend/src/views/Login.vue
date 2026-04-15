<template>
  <div class="login-container">
    <div class="login-box">
      <h1>简历生成器</h1>
      <p class="subtitle">登录或注册账户</p>

      <form @submit.prevent="handleLogin">
        <!-- 用户名输入 -->
        <div class="form-group">
          <label for="username">用户名</label>
          <input
            id="username"
            v-model="form.username"
            type="text"
            placeholder="请输入用户名"
            required
          />
        </div>

        <!-- 密码输入 -->
        <div class="form-group">
          <label for="password">密码</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            required
          />
        </div>

        <!-- 邮箱输入 -->
        <div class="form-group">
          <label for="email">邮箱（可选）</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="请输入邮箱"
          />
        </div>

        <!-- 错误提示 -->
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <!-- 成功提示 -->
        <div v-if="successMessage" class="success-message">
          {{ successMessage }}
        </div>

        <!-- 提交按钮 -->
        <button type="submit" class="login-btn" :disabled="isLoading">
          {{ isLoading ? '登录中...' : '登录/注册' }}
        </button>
      </form>

      <div class="login-tips">
        <p>首次使用请输入新用户名和密码，系统会自动注册</p>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '../api/login.js'

export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: '',
        email: ''
      },
      isLoading: false,
      errorMessage: '',
      successMessage: ''
    }
  },
  methods: {
    async handleLogin() {
      // 验证表单
      if (!this.form.username || !this.form.password) {
        this.errorMessage = '用户名和密码不能为空'
        this.successMessage = ''
        return
      }

      this.isLoading = true
      this.errorMessage = ''
      this.successMessage = ''

      try {
        // 调用登录 API
        const result = await login(
          this.form.username,
          this.form.password,
          this.form.email
        )

        if (result.success) {
          this.successMessage = result.message
          
          // 保存 token 和用户信息到 store
          this.$store.dispatch('setLoginInfo', {
            username: result.username,
            token: result.token
          })

          // 2秒后跳转到首页
          setTimeout(() => {
            this.$router.push('/home')
          }, 2000)
        } else {
          this.errorMessage = result.message
        }
      } catch (error) {
        console.error('Login error:', error)
        this.errorMessage = '登录失败，请稍后重试'
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #ffe5cc 0%, #ffc0cb 50%, #ffb6d9 100%);
  font-family: 'Arial', sans-serif;
  position: relative;
  overflow: hidden;
}

/* 波动效果背景 */
.login-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 100"><path d="M0,50 Q300,0 600,50 T1200,50 L1200,100 L0,100 Z" fill="rgba(255,182,217,0.2)"/></svg>') 
    repeat-x bottom;
  background-size: 600px 100px;
  animation: wave 15s linear infinite;
  z-index: 1;
  pointer-events: none;
}

.login-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 100"><path d="M0,50 Q300,0 600,50 T1200,50 L1200,100 L0,100 Z" fill="rgba(255,105,180,0.3)"/></svg>') 
    repeat-x bottom;
  background-size: 600px 100px;
  animation: wave 10s linear infinite reverse;
  z-index: 2;
  pointer-events: none;
}

@keyframes wave {
  0% {
    background-position: 0 bottom;
  }
  100% {
    background-position: 600px bottom;
  }
}

.login-box {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  position: relative;
  z-index: 10;
}

.login-box h1 {
  text-align: center;
  color: #333;
  margin-bottom: 10px;
  font-size: 28px;
}

.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 30px;
  font-size: 14px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
  font-size: 14px;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #ff69b4;
  box-shadow: 0 0 5px rgba(255, 105, 180, 0.3);
}

.error-message {
  background-color: #fee;
  color: #c33;
  padding: 12px;
  border-radius: 5px;
  margin-bottom: 20px;
  font-size: 14px;
  border-left: 4px solid #c33;
}

.success-message {
  background-color: #efe;
  color: #3c3;
  padding: 12px;
  border-radius: 5px;
  margin-bottom: 20px;
  font-size: 14px;
  border-left: 4px solid #3c3;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #ffb347 0%, #ff69b4 100%);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 105, 180, 0.4);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.login-tips {
  margin-top: 20px;
  text-align: center;
  color: #999;
  font-size: 12px;
  line-height: 1.6;
}
</style>
