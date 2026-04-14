<script setup>
import { reactive, onMounted, watch } from 'vue'
import axios from 'axios'
import { debounce } from 'lodash-es'//防抖函数，避免频繁put请求
window.axios = axios// 全局暴露 axios，方便调试

import ResumeEditor from './views/ResumeEditor.vue'
import ResumePage from './views/ResumePage.vue'

const resume = reactive({
  name: '',
  skills: [],
  schools: [],
  experiences: [],
  projects: []
})


let isReady = false

const saveResume = debounce(() => {
  axios.put('/api/resume', resume)
}, 500)

/*-----------------跟后端通信------------------*/
watch(resume, () => {
  if (!isReady) return
  saveResume()
}, { deep: true })

function fetchResume() {
  axios.get('/api/resume').then(res => {
    Object.assign(resume, res.data)
    isReady = true
  })
}

onMounted(() => {
  fetchResume()
})
</script>

<template>
  <div class="container">
    <ResumeEditor :resume="resume" />
    <ResumePage :resume="resume" />
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
