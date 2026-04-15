<script setup>
import { ref } from 'vue'

const props = defineProps({
  experiences: Array
})

const company = ref('')
const role = ref('')
const time = ref('')
const desc = ref('')
const desc2 = ref('')

function addExp() {
  if (!company.value.trim()) return

  props.experiences.push({
    company: company.value,
    role: role.value,
    time: time.value,
    desc: desc.value,
    desc2: desc2.value
  })

  company.value = ''
  role.value = ''
  time.value = ''
  desc.value = ''
  desc2.value = ''
}

function removeExp(index) {
  props.experiences.splice(index, 1)
}
</script>

<template>
  <div class="exp">

    <h4>实习经历</h4>

    <!-- 输入区 -->
    <div class="exp-input">
      <input v-model="company" placeholder="公司名称" />
      <input v-model="role" placeholder="职位" />
      <input v-model="time" placeholder="时间（如 2023-2024）" />
      <textarea v-model="desc" placeholder="描述"></textarea>
      <textarea v-model="desc2" placeholder="描述2"></textarea>

      <button class="btn btn-primary" @click="addExp">添加经历</button>
    </div>

    <!-- 列表 -->
    <div class="exp-list">
      <div v-for="(exp, index) in experiences"
       :key="index" 
       class="exp-card">

        <div class="top">
          <div class="company">{{ exp.company }}</div>
          <div class="time">{{ exp.time }}</div>
        </div>

        <div class="role">{{ exp.role }}</div>
        <div class="desc">{{ exp.desc }}</div>
        <div class="desc">{{ exp.desc2 }}</div>

        <button class="btn btn-danger" @click="removeExp(index)">删除</button>
      </div>
    </div>

  </div>
</template>

<style scoped>
.exp {
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
.exp-input {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.exp-card {
  padding: 12px;
  border-radius: 12px;
  background: #fff;
  margin-bottom: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.top {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}

.role {
  color: #666;
  margin-top: 4px;
}

.desc {
  font-size: 12px;
  color: #888;
  margin-top: 6px;
}
</style>