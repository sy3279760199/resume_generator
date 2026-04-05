<script setup>
//defineProps(['resume'])

const { resume } = defineProps(['resume'])

const emit = defineEmits(['remove'])

function removeSkill(index) {
  emit('remove', index)
}

</script>

<template>
    <div class="preview">
        <h1 v-if="resume.name">
        {{ resume.name }}
    </h1>
    <p v-else>请填写你的名字</p> 

    <ul v-if="resume.skills.length">
        <li v-for="(skill, index) in resume.skills" :key="skill + index">
            {{ skill }}
            <button @click="removeSkill(index)">删除</button>
        </li>
        </ul>
    <p v-else>还没有技能，快去添加一个吧 👇</p>

    </div>

</template>