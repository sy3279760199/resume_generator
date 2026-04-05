<script setup>
import { ref } from 'vue'

const { resume } = defineProps(['resume'])

const newSkill = ref('')

const emit = defineEmits(['add-skill'])

function addSkill() {
  if (newSkill.value.trim() !== '') {
    emit('add-skill', newSkill.value)
    newSkill.value = ''
  }
}

</script>

<template>
  <div class="editor">
    <input v-model="resume.name" placeholder="请输入你的名字" />
    <input v-model="newSkill" placeholder="请添加技能" />
    <button @click="addSkill">添加</button>
  </div>
</template>