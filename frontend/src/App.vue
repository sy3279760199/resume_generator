<script setup>
import { reactive, onMounted, watch } from 'vue'
//onMounted生命周期函数，组件挂载完成后执行
//watch监听resume对象的变化，deep: true表示深度监听，即监听对象内部的属性变化

import axios from 'axios'//用来发请求的工具

import { debounce } from 'lodash-es'//防抖函数，避免频繁put请求

window.axios = axios// 全局暴露 axios，不用每个文件都 import，一处配置，全局可用，方便调试

import ResumeEditor from './views/ResumeEditor.vue'
import ResumePage from './views/ResumePage.vue'

const resume = reactive({
  name: '',
  skills: [],
  schools: [],
  experiences: [],
  projects: []
})

const saveResume = debounce(() => {
  axios.put('/api/resume', resume)
}, 500)

/*-----------------跟后端通信------------------*/
let isReady = false

watch(resume, () => {
  if (!isReady) return
  saveResume()
}, { deep: true })//深度监听（对象里面的变化也算）

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
