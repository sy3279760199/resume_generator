<script setup>
import NameSection from '../components/NameSection.vue'
import SkillSection from '../components/SkillSection.vue'
import EducationSection from '../components/EducationSection.vue'
import ExperienceSection from '../components/ExperienceSection.vue'
import ProjectSection from '../components/ProjectSection.vue'

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