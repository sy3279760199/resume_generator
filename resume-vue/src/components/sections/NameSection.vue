<script setup>

const props = defineProps({
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="name">
    <h4>姓名</h4>
    <input placeholder="请输入姓名"
      :value="modelValue"
      @input="e => emit('update:modelValue', e.target.value)"
    />
    </div>
</template>

<style scoped>
.name {
  display: flex;
  flex-direction: column; /* 关键：纵向排列 */
  gap: 4px;              /* 标题和输入框间距 */

  background: rgba(255,255,255,0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.4);

  border-radius: 16px;
  padding: 24px;

  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
}

input {
  padding: 6px;
  font-size: 14px;
}

h4 {
  margin: 0;
}
</style>