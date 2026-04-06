<script setup>
import { ref } from 'vue'

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
    <div class="skill">
        <input v-model="newSkill" placeholder="请添加技能" />
        <button @click="addSkill">添加</button>
    </div>
</template>