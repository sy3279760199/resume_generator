<script setup>
import NameSection from './sections/NameSection.vue'
import SkillSection from './sections/SkillSection.vue'
import EducationSection from './sections/EducationSection.vue'
import ExperienceSection from './sections/ExperienceSection.vue'
import ProjectSection from './sections/ProjectSection.vue'

const props = defineProps({
  name: String,
  skills: Array,
  schools: Array,
  experiences: Array
})

const emit = defineEmits([
  'update:name',
  'add-skill',
  'remove-skill',
  'add-school',
  'remove-school',
  'add-exp',
  'remove-exp'

])
</script>

<template>
  <div class="editor">
  <!-- v-model 中转 -->
    <NameSection
      :modelValue="props.name"
      @update:modelValue="val => emit('update:name', val)"
    />
    <!-- 行为中转 -->
    <SkillSection
      :skills="props.skills"
      @add-skill="skill => emit('add-skill', skill)"
      @remove-skill="index => emit('remove-skill', index)"
    />

    <EducationSection
    :schools="schools"
    @add-school="school => emit('add-school', school)"
    @remove-school="index => emit('remove-school', index)"
  />
    
    <ExperienceSection
  :experiences="props.experiences"
  @add-exp="exp => emit('add-exp', exp)"
  @remove-exp="index => emit('remove-exp', index)"
/>

    <ProjectSection
      :projects="props.projects"
      @add-project="p => emit('add-project', p)"
      @remove-project="i => emit('remove-project', i)"
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