<script setup>
const model = defineModel()
</script>

<template>
    <div class="name">
        <input v-model="model" placeholder="请输入你的名字" />
    </div>
</template>