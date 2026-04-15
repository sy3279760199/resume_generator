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
    <div class="editor-main">
      <!-- v-model 中转 -->
      <NameSection
        :resume="resume"
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

    <div class="instructions">
      <h3>📖 使用说明</h3>
      <div class="instruction-item">
        <div class="demo-dot"></div>
        <div>
          <p class="instruction-title">自定义颜色</p>
          <p class="instruction-desc">在右侧简历预览中，点击每个项目前的圆点按钮，可以打开颜色选择器自定义项目的颜色</p>
        </div>
      </div>
      <div class="instruction-item">
        <div class="icon">💾</div>
        <div>
          <p class="instruction-title">保存简历</p>
          <p class="instruction-desc">点击"保存简历"按钮可将当前简历和颜色设置保存到"我的简历"列表中</p>
        </div>
      </div>
      <div class="instruction-item">
        <div class="icon">📥</div>
        <div>
          <p class="instruction-title">导出PDF</p>
          <p class="instruction-desc">点击"导出 PDF"按钮可将当前简历导出为PDF文件进行下载</p>
        </div>
      </div>
      <div class="instruction-item">
        <div class="icon">✏️</div>
        <div>
          <p class="instruction-title">编辑内容</p>
          <p class="instruction-desc">左侧为编辑区，右侧为预览区，编辑的内容实时显示在预览中</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.editor {
  display: flex;
  gap: 20px;
  height: 100%;
}

.editor-main {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: linear-gradient(135deg, #eef2ff, #f8fafc);
  flex: 1;
  overflow-y: auto;
  padding-right: 10px;
}

.instructions {
  width: 280px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 105, 180, 0.2);
  border-radius: 12px;
  padding: 20px;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.instructions h3 {
  color: #ff69b4;
  font-size: 16px;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.instruction-item {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  padding: 12px;
  background: rgba(255, 105, 180, 0.05);
  border-radius: 8px;
  border-left: 3px solid #ff69b4;
}

.demo-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff69b4, #ff1493);
  flex-shrink: 0;
  margin-top: 4px;
  cursor: pointer;
  transition: transform 0.2s;
}

.demo-dot:hover {
  transform: scale(1.3);
}

.icon {
  font-size: 20px;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.instruction-title {
  font-weight: 600;
  color: #2c3e50;
  font-size: 13px;
  margin: 0 0 4px 0;
}

.instruction-desc {
  color: #555;
  font-size: 12px;
  margin: 0;
  line-height: 1.5;
}

.instruction-item:last-child {
  margin-bottom: 0;
}

/* 滚动条样式 */
.instructions::-webkit-scrollbar {
  width: 6px;
}

.instructions::-webkit-scrollbar-track {
  background: transparent;
}

.instructions::-webkit-scrollbar-thumb {
  background: rgba(255, 105, 180, 0.3);
  border-radius: 3px;
}

.instructions::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 105, 180, 0.5);
}
</style>