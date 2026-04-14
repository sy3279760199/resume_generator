<script setup>
import { ref} from 'vue'

const props = defineProps({
  schools: Array
})

const emit = defineEmits(['add-school', 'remove-school'])

const newSchool = ref('')

function addSchool() {
  if (!newSchool.value.trim()) return

  props.schools.push({
    name: newSchool.value
  })

  newSchool.value = ''
}

function removeSchool(index) {
  props.schools.splice(index, 1)
}

</script>

<template>
  <div class="edu">
    <h4>教育经历</h4>

    <div class="input-row">
      <input v-model="newSchool" placeholder="请输入学校" />
      <button class="btn btn-primary" @click="addSchool">添加</button>
      <!-- 测试接口 -->
      <button class="btn" @click="fetchResume">获取数据</button>
    </div>

    <li v-for="(school, index) in schools" :key="index">
      {{ school.name }}
      <button class="btn btn-danger" @click="removeSchool(index)">删除</button>
    </li>
    
  </div>

  
</template>

<style scoped>
.edu {
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

/* 更推荐：给输入和按钮加一个容器 */
.input-row {
  display: flex;
  gap: 8px;
}

/* 技能列表 */
.education li {
  display: flex;
  align-items: center;
  gap: 20px; /* 技能和删除按钮间距 */
}
</style>