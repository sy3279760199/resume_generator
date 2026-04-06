<script setup>
import NameSection from './sections/NameSection.vue'
import SkillSection from './sections/SkillSection.vue'

const props = defineProps({
  resume: Object
})

defineEmits(['add-skill'])
</script>

<template>
  <NameSection v-model="resume.name" />
<SkillSection @add-skill="$emit('add-skill', $event)" />
</template>