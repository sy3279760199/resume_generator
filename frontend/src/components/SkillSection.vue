<script setup>
import { ref } from 'vue'

const props = defineProps({
  skills: Array
})

const emit = defineEmits(['add-skill', 'remove-skill'])

const newSkill = ref('')
const newSkillDesc = ref('')

function addSkill() {
  if (!newSkill.value.trim()) return

  props.skills.push({
    name: newSkill.value,
    desc: newSkillDesc.value
  })

  newSkill.value = ''
  newSkillDesc.value = ''
}

function removeSkill(index) {
  props.skills.splice(index, 1)
}

</script>

<template>
  <div class="skill">
    <h4>技能</h4>

    <!-- 输入 + 添加 -->
    <div class="input-row">
      <input v-model="newSkill" placeholder="请添加技能" />
      <button class="btn btn-primary" @click="addSkill">添加</button>
    </div>

    <!-- 技能描述 -->
  <div class="input-row">
    <input v-model="newSkillDesc" placeholder="技能描述（可选）" />
  </div>

  <!-- 技能列表 -->
    <li  v-for="(skill, index) in skills" :key="index">
      <div class="skill-item">
            <div>{{ skill.name }}</div>
            <div class="desc">{{ skill.desc }}</div>
        </div>
      <button class="btn btn-danger" @click="removeSkill(index)">删除</button>
    </li>

  </div>
</template>

<style scoped>
.skill {
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

.skill li {
  display: flex;
  align-items: center;
  gap: 20px; /* 技能和删除按钮间距 */
}

.skill-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.desc {
  font-size: 12px;
  color: #888;
}

</style>