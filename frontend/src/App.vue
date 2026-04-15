<script setup>
import { reactive, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { debounce } from 'lodash-es'

window.axios = axios

import ResumeEditor from './views/ResumeEditor.vue'
import ResumePage from './views/ResumePage.vue'

const route = useRoute()

const resume = reactive({
  name: '',
  description: '',
  skills: [],
  schools: [],
  experiences: [],
  projects: []
})

const saveResume = debounce(() => {
  axios.put('/api/resume', resume)
  // 同时保存到本地存储
  localStorage.setItem('resumeData', JSON.stringify(resume))
}, 500)

/*-----------------跟后端通信------------------*/
let isReady = false

watch(resume, () => {
  if (!isReady) return
  saveResume()
}, { deep: true })

function fetchResume() {
  // 先尝试从本地存储读取
  const localData = localStorage.getItem('resumeData')
  if (localData) {
    try {
      Object.assign(resume, JSON.parse(localData))
      isReady = true
      return
    } catch (error) {
      console.error('Failed to parse local data:', error)
    }
  }
  
  // 如果本地存储没有数据，从后端获取
  axios.get('/api/resume').then(res => {
    Object.assign(resume, res.data)
    isReady = true
  }).catch(err => {
    console.error('Failed to fetch resume from server:', err)
    isReady = true // 即使失败也标记为 ready
  })
}

onMounted(() => {
  if (route.path === '/editor') {
    fetchResume()
  }
})

// 监听路由变化，如果进入 /editor 页面就加载数据
watch(route, (newRoute) => {
  if (newRoute.path === '/editor' && !isReady) {
    fetchResume()
  }
})
</script>

<template>
  <div id="app">
    <!-- 如果访问的是编辑器页面，显示编辑器和预览 -->
    <template v-if="$route.path === '/editor'">
      <div class="container">
        <ResumeEditor :resume="resume" />
        <ResumePage :resume="resume" />
      </div>
    </template>
    <!-- 其他路由使用 router-view 显示 -->
    <router-view v-else></router-view>
  </div>
</template>

<style>

.container {
  display: flex;
  gap: 20px;
  padding: 20px;
  height: 100vh;
}

.container>* {
  flex: 1;
}

</style>
