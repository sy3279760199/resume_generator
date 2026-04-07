<script setup>
import NameSection from './sections/NameSection.vue'
import SkillSection from './sections/SkillSection.vue'
import EducationSection from './sections/EducationSection.vue'
import ExperienceSection from './sections/ExperienceSection.vue'
import ProjectSection from './sections/ProjectSection.vue'

const props = defineProps({
  resume: Object
})

</script>

<template>
  <div class="editor">
  <!-- v-model 中转 -->
    <NameSection
      v-model="resume.name"
    />
    <!-- 行为中转 -->
    <SkillSection
      :skills="resume.skills"
    />

    <EducationSection
    :schools="resume.schools"
  />
    
    <ExperienceSection
      :experiences="resume.experiences"
/>

    <ProjectSection
      :projects="resume.projects"
    />
    </div>
</template>

<style scoped>
.editor {
  display: flex;
  flex-direction: column;
  gap: 12px;

  background: linear-gradient(135deg, #eef2ff, #f8fafc);
}
</style>