<script setup>

const props = defineProps({
  resume: Object
})

</script>

<template>
  <div class="name">
    <h4>姓名和描述</h4>
    <input 
      v-model="props.resume.name"
      placeholder="请输入姓名"
      class="name-input"
    />
    <textarea
      v-model="props.resume.description"
      placeholder="请输入个人描述（可选）"
      class="description-input"
    ></textarea>
    </div>
</template>

<style scoped>
.name {
  display: flex;
  flex-direction: column; /* 关键：纵向排列 */
  gap: 8px;              /* 标题和输入框间距 */

  background: rgba(255,255,255,0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.4);

  border-radius: 16px;
  padding: 24px;

  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
}

.name-input {
  padding: 8px;
  font-size: 16px;
  font-weight: 600;
  border: 1px solid rgba(255, 105, 180, 0.2);
  border-radius: 6px;
  transition: all 0.3s;
}

.name-input:focus {
  outline: none;
  border-color: #ff69b4;
  box-shadow: 0 0 8px rgba(255, 105, 180, 0.2);
}

.description-input {
  padding: 8px;
  font-size: 13px;
  border: 1px solid rgba(255, 105, 180, 0.2);
  border-radius: 6px;
  resize: vertical;
  min-height: 60px;
  font-family: inherit;
  transition: all 0.3s;
}

.description-input:focus {
  outline: none;
  border-color: #ff69b4;
  box-shadow: 0 0 8px rgba(255, 105, 180, 0.2);
}

h4 {
  margin: 0;
  color: #ff69b4;
  font-size: 14px;
}
</style>