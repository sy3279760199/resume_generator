<script setup>
import { reactive } from 'vue'

import ResumeEditor from './components/ResumeEditor.vue'
import ResumePreview from './components/ResumePreview.vue'

const resume = reactive({
  name: '',
  skills: [],
  schools: [],
  experiences: [],
  projects: []
})
/*----------------skill----------------*/
function handleAddSkill(skill) {
  resume.skills.push(skill)
}
function handleRemove(index) {
  resume.skills.splice(index, 1)
}

/*----------------education----------------*/
const handleAddSchool = (school) => {
  resume.schools.push(school)
}
const handleRemoveSchool = (index) => {
  resume.schools.splice(index, 1)
}

/*----------------experience----------------*/
function handleAddExp(exp) {
  resume.experiences.push(exp)
}
function handleRemoveExp(index) {
  resume.experiences.splice(index, 1)
}

/*----------------project----------------*/
function handleAddProject(project) {
  resume.projects.push(project)
}
function handleRemoveProject(index) {
  resume.projects.splice(index, 1)
}

</script>

<template>
  <div class="container">
    <ResumeEditor
    v-model:name="resume.name"

    :skills="resume.skills"
      @add-skill="handleAddSkill"
      @remove-skill="handleRemove"

    :schools="resume.schools"
    @add-school="handleAddSchool"
    @remove-school="handleRemoveSchool"

    :experiences="resume.experiences"
    @add-exp="handleAddExp"
    @remove-exp="handleRemoveExp"
  />

    <ResumePreview :resume="resume" />

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
