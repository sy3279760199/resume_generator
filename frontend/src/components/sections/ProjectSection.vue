<script setup>
import { ref } from 'vue'

const props = defineProps({
  projects: Array
})

const name = ref('')
const tech = ref('')
const desc = ref('')
const link = ref('')

function addProject() {
  if (!name.value.trim()) return

  props.projects.push({
    name: name.value,
    tech: tech.value,
    desc: desc.value,
    link: link.value
  })

  name.value = ''
  tech.value = ''
  desc.value = ''
  link.value = ''
}

function removeProject(index) {
  props.projects.splice(index, 1)
}
</script>

<template>
  <div class="project">
    <h4>项目经历</h4>

    <!-- 输入区 -->
    <div class="input-area">
      <input v-model="name" placeholder="项目名称" />
      <input v-model="tech" placeholder="技术栈（Vue / Node / Three.js）" />
      <input v-model="link" placeholder="项目链接" />
      <textarea v-model="desc" placeholder="项目描述"></textarea>

      <button class="btn btn-primary" @click="addProject">添加项目</button>
    </div>

    <!-- 列表 -->
    <div class="list">
      <div
        v-for="(p, index) in projects"
        :key="index"
        class="card"
      >
        <div class="top">
          <strong>{{ p.name }}</strong>
          <button class="btn btn-danger" @click="removeProject(index)">
            删除
          </button>
        </div>

        <div class="tech">{{ p.tech }}</div>
        <div class="desc">{{ p.desc }}</div>
        <a :href="p.link" target="_blank" class="link">{{ p.link }}</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project {
    display: flex;
  flex-direction: column;
  gap: 10px;

  background: rgba(255,255,255,0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.4);

  border-radius: 16px;
  padding: 24px;

  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
}

.input-area {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.card {
  padding: 12px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 10px;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tech {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
}

.desc {
  font-size: 12px;
  color: #888;
  margin-top: 4px;
  line-height: 1.4;
}

.link {
  font-size: 12px;
  color: #4f46e5;
  display: block;
  margin-top: 6px;
}
</style>