<script setup>
import { reactive } from 'vue'

import ResumeEditor from './components/ResumeEditor.vue'
import ResumePreview from './components/ResumePreview.vue'

const resume = reactive({
  name: '',
  skills: []
})

function handleAddSkill(skill) {
  resume.skills.push(skill)
}

function handleRemove(index) {
  resume.skills.splice(index, 1)
}

</script>

<template>
  <div class="container">
    <ResumeEditor
    :resume="resume"
    @add-skill="handleAddSkill"
  />
    <ResumePreview
    :resume="resume"
    @remove="handleRemove"
  />
  </div>
</template>
