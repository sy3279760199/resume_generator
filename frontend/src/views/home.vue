<template>
  <div class="home-container">
    <!-- 顶部导航栏 -->
    <header class="header">
      <div class="header-content">
        <h1 class="logo">简历生成器</h1>
        <div class="user-info">
          <span class="username">{{ $store.state.user.username }}</span>
          <button class="logout-btn" @click="handleLogout">登出</button>
        </div>
      </div>
    </header>

    <!-- 主容器 -->
    <div class="main-content">
      <!-- 左侧：产品介绍 -->
      <div class="left-section">
        <div class="intro-card">
          <h2>欢迎使用简历生成器</h2>
          <p class="intro-text">
            简历生成器是一个功能强大的在线工具，帮助您快速创建专业、美观的个人简历。
          </p>
          
          <div class="features">
            <h3>主要功能</h3>
            <ul>
              <li>
                <span class="feature-icon">📝</span>
                <div>
                  <strong>简单易用</strong>
                  <p>直观的编辑界面，无需任何设计技能</p>
                </div>
              </li>
              <li>
                <span class="feature-icon">🎨</span>
                <div>
                  <strong>专业模板</strong>
                  <p>多种精美模板可选，适合不同行业</p>
                </div>
              </li>
              <li>
                <span class="feature-icon">📱</span>
                <div>
                  <strong>响应式设计</strong>
                  <p>在任何设备上都能完美展示</p>
                </div>
              </li>
              <li>
                <span class="feature-icon">📥</span>
                <div>
                  <strong>导出功能</strong>
                  <p>支持 PDF 导出，方便分享和打印</p>
                </div>
              </li>
            </ul>
          </div>

          <div class="benefits">
            <h3>为什么选择我们？</h3>
            <p>✓ 完全免费，无任何隐藏费用</p>
            <p>✓ 云存储，随时随地访问您的简历</p>
            <p>✓ 安全可靠，您的数据受到保护</p>
            <p>✓ 持续更新，不断增加新功能</p>
          </div>
        </div>
      </div>

      <!-- 右侧：创建简历卡片 -->
      <div class="right-section">
        <div class="create-card" @click="handleCreateResume">
          <div class="card-icon">
            <span>+</span>
          </div>
          <h3>创建新简历</h3>
          <p>开始制作您的专业简历</p>
          <div class="card-cta">点击开始</div>
        </div>

        <div class="resume-list">
          <h3>我的简历</h3>
          <div v-if="savedResumes.length === 0" class="empty-state">
            暂无简历，点击上方卡片创建一份新的
          </div>
          <div v-else class="resume-items">
            <div 
              v-for="resume in savedResumes" 
              :key="resume.id" 
              class="resume-item"
            >
              <div class="resume-item-content" @click="loadResume(resume)">
                <div class="resume-item-name">{{ resume.name }}</div>
                <div class="resume-item-time">{{ resume.createTime }}</div>
              </div>
              <button 
                class="resume-item-delete"
                @click="deleteResume(resume.id)"
                title="删除"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      savedResumes: []
    }
  },
  methods: {
    handleCreateResume() {
      // 跳转到简历编辑页面
      this.$router.push('/editor')
    },
    handleLogout() {
      if (confirm('确定要登出吗？')) {
        this.$store.dispatch('logout')
        this.$router.push('/login')
      }
    },
    loadSavedResumes() {
      const data = localStorage.getItem('savedResumes')
      this.savedResumes = data ? JSON.parse(data) : []
    },
    loadResume(resume) {
      // 将简历数据加载到 localStorage
      localStorage.setItem('resumeData', JSON.stringify(resume.data))
      localStorage.setItem('resumeColors', JSON.stringify(resume.colors))
      // 跳转到编辑页面
      this.$router.push('/editor')
    },
    deleteResume(id) {
      if (confirm('确定要删除这份简历吗？')) {
        this.savedResumes = this.savedResumes.filter(r => r.id !== id)
        localStorage.setItem('savedResumes', JSON.stringify(this.savedResumes))
      }
    },
    onResumeSaved(event) {
      // 监听简历保存事件
      this.loadSavedResumes()
    }
  },
  mounted() {
    // 检查用户是否已登录
    if (!this.$store.state.user.isLoggedIn) {
      this.$router.push('/login')
    }
    // 加载已保存的简历列表
    this.loadSavedResumes()
    // 监听简历保存事件
    window.addEventListener('resumeSaved', this.onResumeSaved)
  },
  beforeUnmount() {
    window.removeEventListener('resumeSaved', this.onResumeSaved)
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.home-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #ffe4e1 0%, #ffc0cb 50%, #ffb6d9 100%);
}

/* 头部导航栏 */
.header {
  background: linear-gradient(135deg, #eb86b8 0%, #f73cb6 100%);
  color: white;
  padding: 20px 0;
  box-shadow: 0 2px 10px rgba(255, 105, 180, 0.3);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 26px;
  font-weight: bold;
  letter-spacing: 1px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.username {
  font-size: 16px;
}

.logout-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

/* 主容器 */
.main-content {
  display: flex;
  flex: 1;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 30px;
  gap: 40px;
}

/* 左侧:产品介绍 */
.left-section {
  flex: 1;
  min-width: 0;
}

.intro-card {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.intro-card h2 {
  color: #333;
  font-size: 28px;
  margin-bottom: 20px;
}

.intro-text {
  color: #666;
  font-size: 16px;
  line-height: 1.8;
  margin-bottom: 30px;
}

.features {
  margin-bottom: 30px;
}

.features h3 {
  color: #333;
  font-size: 18px;
  margin-bottom: 20px;
}

.features ul {
  list-style: none;
}

.features li {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  align-items: flex-start;
}

.feature-icon {
  font-size: 24px;
  min-width: 30px;
}

.features strong {
  color: #333;
  display: block;
  margin-bottom: 5px;
}

.features p {
  color: #666;
  font-size: 14px;
  margin: 0;
}

.benefits {
  background: linear-gradient(135deg, rgba(255, 105, 180, 0.1) 0%, rgba(255, 20, 147, 0.1) 100%);
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #ff69b4;
}

.benefits h3 {
  color: #333;
  margin-bottom: 15px;
  font-size: 16px;
}

.benefits p {
  color: #555;
  margin-bottom: 10px;
  font-size: 14px;
}

/* 右侧：创建简历卡片 */
.right-section {
  flex: 0 0 300px;
}

.create-card {
  background: linear-gradient(135deg, #fa8ac2 0%, #fd52ad 100%);
  color: white;
  padding: 40px 30px;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 5px 15px rgba(255, 105, 180, 0.3), 0 0 30px rgba(255, 20, 147, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 30px;
  position: relative;
  overflow: hidden;
  animation: shimmer 3s infinite, glow 2s ease-in-out infinite;
}

@keyframes shimmer {
  0% {
    box-shadow: 0 5px 15px rgba(255, 105, 180, 0.3), 0 0 30px rgba(255, 20, 147, 0.2);
  }
  50% {
    box-shadow: 0 8px 20px rgba(255, 105, 180, 0.5), 0 0 50px rgba(255, 20, 147, 0.4);
  }
  100% {
    box-shadow: 0 5px 15px rgba(255, 105, 180, 0.3), 0 0 30px rgba(255, 20, 147, 0.2);
  }
}

@keyframes glow {
  0%, 100% {
    filter: drop-shadow(0 0 5px rgba(255, 20, 147, 0.3));
  }
  50% {
    filter: drop-shadow(0 0 15px rgba(255, 20, 147, 0.6));
  }
}

.create-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shine 3s infinite;
  z-index: 1;
  pointer-events: none;
}

@keyframes shine {
  0% {
    left: -100%;
  }
  50% {
    left: 100%;
  }
  100% {
    left: 100%;
  }
}

.create-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 25px rgba(255, 105, 180, 0.5), 0 0 60px rgba(255, 20, 147, 0.4);
}

.card-icon {
  font-size: 60px;
  font-weight: bold;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 2;
}

.create-card h3 {
  font-size: 20px;
  margin-bottom: 10px;
  position: relative;
  z-index: 2;
}

.create-card p {
  font-size: 14px;
  margin-bottom: 20px;
  opacity: 0.9;
  position: relative;
  z-index: 2;
}

.card-cta {
  background: rgba(255, 255, 255, 0.2);
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 14px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s;
  position: relative;
  z-index: 2;
}

.create-card:hover .card-cta {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
}

.resume-list {
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.resume-list h3 {
  color: #333;
  font-size: 16px;
  margin-bottom: 20px;
}

.empty-state {
  color: #999;
  font-size: 14px;
  text-align: center;
  padding: 30px 0;
}

.resume-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.resume-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 6px;
  border-left: 3px solid #ff69b4;
  transition: all 0.3s;
}

.resume-item:hover {
  background: #f0f0f0;
  transform: translateX(5px);
}

.resume-item-content {
  flex: 1;
  cursor: pointer;
}

.resume-item-name {
  color: #333;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 4px;
}

.resume-item-time {
  color: #999;
  font-size: 12px;
}

.resume-item-delete {
  width: 28px;
  height: 28px;
  border: none;
  background: #ff6b9d;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.resume-item-delete:hover {
  background: #ff1493;
  transform: scale(1.1);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .main-content {
    flex-direction: column;
    padding: 30px 20px;
    gap: 30px;
  }

  .right-section {
    flex: 0 0 auto;
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .header-content {
    padding: 0 20px;
  }

  .logo {
    font-size: 20px;
  }

  .user-info {
    gap: 10px;
  }

  .username {
    display: none;
  }

  .intro-card {
    padding: 25px;
  }

  .intro-card h2 {
    font-size: 22px;
  }

  .main-content {
    padding: 20px;
  }
}
</style>
