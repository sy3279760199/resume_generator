<script setup>
import { ref, reactive, watch } from "vue"
import { exportPDF } from "@/api/export"

const props = defineProps({
  resume: Object
})

const previewRef = ref(null)

// 颜色管理
const itemColors = reactive({
  skills: {},
  schools: {},
  experiences: {},
  projects: {}
})

// 色盘状态
const colorPicker = reactive({
  show: false,
  type: '', // 'skill', 'school', 'experience', 'project'
  index: -1,
  r: 255,
  g: 105,
  b: 180
})

// 初始化颜色
watch(() => props.resume?.skills?.length, () => {
  props.resume?.skills?.forEach((_, index) => {
    if (!itemColors.skills[index]) {
      itemColors.skills[index] = getRandomColor()
    }
  })
}, { immediate: true })

watch(() => props.resume?.schools?.length, () => {
  props.resume?.schools?.forEach((_, index) => {
    if (!itemColors.schools[index]) {
      itemColors.schools[index] = getRandomColor()
    }
  })
}, { immediate: true })

watch(() => props.resume?.experiences?.length, () => {
  props.resume?.experiences?.forEach((_, index) => {
    if (!itemColors.experiences[index]) {
      itemColors.experiences[index] = getRandomColor()
    }
  })
}, { immediate: true })

watch(() => props.resume?.projects?.length, () => {
  props.resume?.projects?.forEach((_, index) => {
    if (!itemColors.projects[index]) {
      itemColors.projects[index] = getRandomColor()
    }
  })
}, { immediate: true })

// 从 localStorage 加载已保存的颜色
function loadColorsFromStorage() {
  const savedColors = localStorage.getItem('resumeColors')
  if (savedColors) {
    try {
      const colors = JSON.parse(savedColors)
      Object.assign(itemColors, colors)
    } catch (error) {
      console.error('Failed to load colors from storage:', error)
    }
  }
}

// 页面加载时初始化颜色
loadColorsFromStorage()

// 获取随机颜色
function getRandomColor() {
  return `rgb(${Math.random() * 255 | 0}, ${Math.random() * 255 | 0}, ${Math.random() * 255 | 0})`
}

// 打开色盘
function openColorPicker(type, index, currentColor) {
  colorPicker.show = true
  colorPicker.type = type
  colorPicker.index = index
  const match = currentColor.match(/\d+/g)
  if (match) {
    colorPicker.r = parseInt(match[0])
    colorPicker.g = parseInt(match[1])
    colorPicker.b = parseInt(match[2])
  }
}

// 关闭色盘
function closeColorPicker() {
  colorPicker.show = false
}

// 应用颜色
function applyColor() {
  const color = `rgb(${colorPicker.r}, ${colorPicker.g}, ${colorPicker.b})`
  if (colorPicker.type === 'skill') {
    itemColors.skills[colorPicker.index] = color
  } else if (colorPicker.type === 'school') {
    itemColors.schools[colorPicker.index] = color
  } else if (colorPicker.type === 'experience') {
    itemColors.experiences[colorPicker.index] = color
  } else if (colorPicker.type === 'project') {
    itemColors.projects[colorPicker.index] = color
  }
  closeColorPicker()
}

// 处理色盘鼠标事件
function onColorWheelClick(e) {
  const canvas = e.target
  const rect = canvas.getBoundingClientRect()
  const x = e.clientX - rect.left - rect.width / 2
  const y = e.clientY - rect.top - rect.height / 2
  
  const distance = Math.sqrt(x * x + y * y)
  const maxDistance = rect.width / 2 - 10
  
  if (distance <= maxDistance) {
    const angle = Math.atan2(y, x) * 180 / Math.PI + 180
    const saturation = Math.min(distance / maxDistance, 1)
    
    // 根据角度计算 RGB
    let hue = (angle + 180) % 360
    const h = hue / 60
    const s = saturation
    const v = 1
    
    const c = v * s
    const x2 = c * (1 - Math.abs(h % 2 - 1))
    const m = v - c
    
    let r, g, b
    if (h < 1) { r = c; g = x2; b = 0 }
    else if (h < 2) { r = x2; g = c; b = 0 }
    else if (h < 3) { r = 0; g = c; b = x2 }
    else if (h < 4) { r = 0; g = x2; b = c }
    else if (h < 5) { r = x2; g = 0; b = c }
    else { r = c; g = 0; b = x2 }
    
    colorPicker.r = Math.round((r + m) * 255)
    colorPicker.g = Math.round((g + m) * 255)
    colorPicker.b = Math.round((b + m) * 255)
  }
}

// 绘制色盘
function drawColorWheel() {
  setTimeout(() => {
    const canvas = document.querySelector('.color-wheel')
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = canvas.width / 2 - 5
    
    // 绘制彩虹圆盘
    for (let angle = 0; angle < 360; angle += 1) {
      const startAngle = angle * Math.PI / 180
      const endAngle = (angle + 1) * Math.PI / 180
      
      // 从中心点向外渐变
      const gradient = ctx.createLinearGradient(
        centerX, centerY,
        centerX + Math.cos(startAngle) * radius,
        centerY + Math.sin(startAngle) * radius
      )
      
      // 计算当前角度的 HSV 到 RGB
      const h = angle / 60
      const c = 1
      const x = c * (1 - Math.abs(h % 2 - 1))
      const m = 0
      
      let r, g, b
      if (h < 1) { r = c; g = x; b = 0 }
      else if (h < 2) { r = x; g = c; b = 0 }
      else if (h < 3) { r = 0; g = c; b = x }
      else if (h < 4) { r = 0; g = x; b = c }
      else if (h < 5) { r = x; g = 0; b = c }
      else { r = c; g = 0; b = x }
      
      const rgb = `rgb(${Math.round((r + m) * 255)}, ${Math.round((g + m) * 255)}, ${Math.round((b + m) * 255)})`
      
      gradient.addColorStop(0, 'white')
      gradient.addColorStop(1, rgb)
      
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()
      ctx.fill()
    }
  }, 0)
}

watch(() => colorPicker.show, (newVal) => {
  if (newVal) {
    drawColorWheel()
  }
})

// 保存简历
const saveResume = () => {
  if (!props.resume.name) {
    alert('请先填写简历名字')
    return
  }

  // 获取已保存的简历列表
  const savedResumes = JSON.parse(localStorage.getItem('savedResumes') || '[]')
  
  // 生成一个唯一 ID
  const id = Date.now()
  
  // 创建简历对象
  const resumeData = {
    id: id,
    name: props.resume.name,
    createTime: new Date().toLocaleString(),
    data: {
      name: props.resume.name,
      description: props.resume.description,
      skills: props.resume.skills,
      schools: props.resume.schools,
      experiences: props.resume.experiences,
      projects: props.resume.projects
    },
    colors: JSON.parse(JSON.stringify(itemColors))
  }

  // 检查是否已存在同名简历
  const existIndex = savedResumes.findIndex(r => r.name === props.resume.name)
  if (existIndex !== -1) {
    if (confirm(`简历"${props.resume.name}"已存在，是否覆盖？`)) {
      savedResumes[existIndex] = resumeData
    } else {
      return
    }
  } else {
    savedResumes.push(resumeData)
  }

  // 保存到本地存储
  localStorage.setItem('savedResumes', JSON.stringify(savedResumes))
  localStorage.setItem('resumeColors', JSON.stringify(itemColors))
  alert('简历已保存！')

  // 触发自定义事件通知父组件
  window.dispatchEvent(new CustomEvent('resumeSaved', { detail: resumeData }))
}

const handleExport = async () => {
  const previewElement = previewRef.value
  if (!previewElement) {
    alert("预览组件加载失败")
    return
  }

  const html = previewElement.innerHTML//获取预览区域的HTML内容

  // 构造一个完整的HTML文档字符串，包含样式和内容
  const styledHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: "Helvetica", "Arial", sans-serif;
          margin: 0;
          padding: 0;
        }
        .a4 {
          width: 210mm;
          min-height: 297mm;
          padding: 20mm;
          background: white;
          box-sizing: border-box;
          margin: 0 auto;
        }
        .preview {
          font-family: "Helvetica", "Arial", sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .section-title {
          font-size: 18px;
          margin-top: 20px;
          margin-bottom: 10px;
          border-bottom: 1px solid #ccc;
          padding-bottom: 5px;
        }
        .skill {
          margin-top: 20px;
        }
        .skill-item {
          margin-bottom: 8px;
        }
        .skill-item div:first-child {
          font-weight: bold;
        }
        .skill-item .desc {
          font-size: 12px;
          color: #888;
        }
        .education ul, .experience ul, .project {
          margin-top: 10px;
        }
        .education li, .experience li {
          margin-bottom: 12px;
        }
        .exp-item {
          list-style: none;
        }
        .exp-header {
          margin-bottom: 4px;
        }
        .company {
          font-weight: bold;
        }
        .role {
          display: inline-block;
          margin-right: 20px;
          font-size: 12px;
        }
        .time {
          font-size: 12px;
          color: #666;
        }
        .desc {
          font-size: 12px;
          color: #888;
          margin-top: 4px;
        }
        .project-item {
          margin-bottom: 12px;
          page-break-inside: avoid;
        }
        .project-item .header {
          margin-bottom: 4px;
        }
        .tech {
          font-size: 12px;
          color: #666;
        }
        .project-item a {
          color: #0066cc;
          text-decoration: none;
          font-size: 12px;
        }
        h1 {
          margin: 10px 0 20px 0;
          font-size: 28px;
        }
        h2 {
          margin: 0;
        }
        .description {
          margin: 15px 0 !important;
          font-size: 13px;
          color: #555;
        }
        p {
          margin: 5px 0;
        }
        ul {
          margin: 5px 0;
          padding-left: 20px;
        }
        .header-decoration {
          display: none;
        }
        .right-decoration {
          display: none;
        }
      </style>
    </head>
    <body>
      <div class="preview a4">
        ${html}
      </div>
    </body>
    </html>
  `
  
  try {
    const res = await exportPDF(styledHtml)

    const blob = new Blob([res.data], { type: "application/pdf" })
    const url = URL.createObjectURL(blob)//给这个文件生成一个“临时下载链接”

    const a = document.createElement("a")//创建一个 <a> 标签
    a.href = url
    a.download = "resume.pdf"
    a.click()//浏览器模拟用户点击下载
    
    URL.revokeObjectURL(url)//删除刚刚创建的临时链接（防止内存泄漏）
  } 
  catch (err) {
    console.error("PDF导出失败:", err)
    alert("PDF导出失败，请重试")
  }
}

</script>

<template>
  <div class="page-container">
    <!-- 预览区域 -->
    <div class="preview a4" ref="previewRef"><!-- 拿到ref -->
      <!-- 装饰条纹 -->
      <div class="header-decoration">
        <div class="deco-bar"></div>
        <div class="deco-dots">
          <span class="deco-dot" style="background: #ff69b4;"></span>
          <span class="deco-dot" style="background: #ff1493;"></span>
          <span class="deco-dot" style="background: #ffb6d9;"></span>
        </div>
      </div>
      
      <!-- 右侧装饰色块 -->
      <div class="right-decoration">
        <div class="deco-circle" style="background: rgba(255, 105, 180, 0.08); top: 10%;"></div>
        <div class="deco-circle" style="background: rgba(255, 20, 147, 0.08); top: 40%;"></div>
        <div class="deco-circle" style="background: rgba(255, 182, 217, 0.08); top: 70%;"></div>
      </div>

      <!-- 姓名 -->
      <h2 class="section-title">姓名</h2>
      <h1 v-if="resume.name">
        {{ resume.name }}
      </h1>
      <p v-else>请填写你的名字</p>
      <p v-if="resume.description" class="description">
        {{ resume.description }}
      </p>

      <!-- 技能 -->
      <div class="skill">
        <h2 class="section-title">技能</h2>
        <p v-if="resume.skills.length === 0">
          还没有技能，请在左侧添加 👈
        </p>
        <ul v-else>
          <li v-for="(skill, index) in resume.skills" :key="index" class="list-item-with-dot skill-item-li" :style="{ borderLeftColor: itemColors.skills[index] }">
            <span 
              class="item-dot" 
              :style="{ backgroundColor: itemColors.skills[index] }"
              @click="openColorPicker('skill', index, itemColors.skills[index])"
              title="点击调整颜色"
            ></span>
            <div class="skill-item">
              <div>{{ skill.name }}</div>
              <div class="desc">{{ skill.desc }}</div>
            </div>
          </li>
        </ul>
      </div>

      <!-- 教育经历 -->
      <div class="education">
        <h2 class="section-title">教育经历</h2>
        <p v-if="resume.schools.length === 0">
          还没有教育经历 👈
        </p>
        <ul v-else>
          <li v-for="(school, index) in resume.schools" :key="index" class="list-item-with-dot education-item-li" :style="{ borderLeftColor: itemColors.schools[index] }">
            <span 
              class="item-dot" 
              :style="{ backgroundColor: itemColors.schools[index] }"
              @click="openColorPicker('school', index, itemColors.schools[index])"
              title="点击调整颜色"
            ></span>
            {{ school.name }}
          </li>
        </ul>
      </div>

      <!-- 实习经历 -->
      <div class="experience">
        <h2 class="section-title">实习经历</h2>
        <p v-if="resume.experiences.length === 0">
          还没有实习经历 👈
        </p>
        <ul v-else>
          <li v-for="(exp, index) in resume.experiences" :key="index" class="exp-item list-item-with-dot" :style="{ borderLeftColor: itemColors.experiences[index] }">
            <span 
              class="item-dot" 
              :style="{ backgroundColor: itemColors.experiences[index] }"
              @click="openColorPicker('experience', index, itemColors.experiences[index])"
              title="点击调整颜色"
            ></span>
            <div class="exp-header">
              <span class="company">{{ exp.company }}</span>
            </div>
            <span class="role">{{ exp.role }}</span>
            <span class="time">{{ exp.time }}</span>
            <div class="desc">{{ exp.desc }}</div>
            <div class="desc">{{ exp.desc2 }}</div>
          </li>
        </ul>
      </div>

      <!-- 项目经历 -->
      <div class="project">
        <h2 class="section-title">项目经历</h2>
        <p v-if="resume.projects.length === 0">
          还没有项目经历 👈
        </p>
        <div v-else>
          <div v-for="(p, index) in resume.projects" :key="index" class="project-item" :style="{ borderLeftColor: itemColors.projects[index] }">
            <span 
              class="item-dot" 
              :style="{ backgroundColor: itemColors.projects[index] }"
              @click="openColorPicker('project', index, itemColors.projects[index])"
              title="点击调整颜色"
            ></span>
            <div class="project-content">
              <div class="header">
                <strong>{{ p.name }}</strong>
              </div>
              <div class="tech">{{ p.tech }}</div>
              <div class="desc">{{ p.desc }}</div>
              <a :href="p.link" target="_blank">{{ p.link }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 导出和保存按钮 -->
    <div class="export-btn">
      <button @click="saveResume" class="save-btn">💾 保存简历</button>
      <button @click="handleExport" class="export-btn-item">📥 导出 PDF</button>
    </div>

    <!-- RGB颜色选择器 -->
    <div v-if="colorPicker.show" class="color-picker-overlay" @click="closeColorPicker">
      <div class="color-picker-modal" @click.stop>
        <h3>选择颜色</h3>
        
        <!-- RGB 圆形色盘 -->
        <div class="color-wheel-container">
          <canvas 
            ref="colorWheelCanvas"
            width="300" 
            height="300"
            class="color-wheel"
            @click="onColorWheelClick"
          ></canvas>
          <div 
            class="color-indicator"
            :style="{ 
              backgroundColor: `rgb(${colorPicker.r}, ${colorPicker.g}, ${colorPicker.b})`
            }"
          ></div>
        </div>

        <!-- RGB 数值输入 -->
        <div class="rgb-inputs">
          <div class="color-input">
            <label>R</label>
            <input v-model.number="colorPicker.r" type="number" min="0" max="255" />
          </div>
          <div class="color-input">
            <label>G</label>
            <input v-model.number="colorPicker.g" type="number" min="0" max="255" />
          </div>
          <div class="color-input">
            <label>B</label>
            <input v-model.number="colorPicker.b" type="number" min="0" max="255" />
          </div>
        </div>

        <!-- RGB 显示 -->
        <div class="rgb-display">
          rgb({{ colorPicker.r }}, {{ colorPicker.g }}, {{ colorPicker.b }})
        </div>

        <!-- 按钮 -->
        <div class="color-picker-buttons">
          <button @click="applyColor" class="confirm-btn">确认</button>
          <button @click="closeColorPicker" class="cancel-btn">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #ffe4e1 0%, #ffc0cb 50%, #ffb6d9 100%);
  min-height: 100vh;
}

.a4 {
  width: 210mm;
  min-height: 297mm;
  padding: 20mm;
  background: white;
  box-sizing: border-box;
  box-shadow: 0 5px 40px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
}

.preview {
  font-family: "Segoe UI", "Helvetica Neue", "Arial", sans-serif;
  line-height: 1.7;
  color: #2c3e50;
  position: relative;
  overflow: hidden;
}

/* 装饰条纹 */
.header-decoration {
  margin: 0 0 24px 0;
  padding-bottom: 16px;
  border-bottom: 2px solid #ff69b4;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.deco-bar {
  flex: 1;
  height: 3px;
  background: linear-gradient(90deg, #ff69b4 0%, #ff1493 50%, #ffb6d9 100%);
  border-radius: 2px;
}

.deco-dots {
  display: flex;
  gap: 8px;
  margin-left: 16px;
}

.deco-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}

/* 右侧装饰圆形 */
.right-decoration {
  position: absolute;
  right: 0;
  top: 0;
  width: 200px;
  height: 100%;
  pointer-events: none;
}

.deco-circle {
  position: absolute;
  right: -80px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  filter: blur(60px);
  animation: float 6s ease-in-out infinite;
}

.deco-circle:nth-child(2) {
  animation-delay: 2s;
}

.deco-circle:nth-child(3) {
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(20px);
  }
}

/* 姓名和标题部分 */
h1 {
  margin: 0 0 10px 0;
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: -0.5px;
}

.description {
  margin: 8px 0 16px 0 !important;
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

h2 {
  margin: 0;
  font-size: 16px;
  color: #666;
  font-weight: 500;
}

p {
  margin: 3px 0;
  font-size: 14px;
  color: #555;
}

/* 段落分隔符 */
.section-title {
  font-size: 14px;
  font-weight: 700;
  margin-top: 16px;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid #ff69b4;
  color: #2c3e50;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* 技能部分 */
.skill {
  margin-top: 16px;
}

.skill ul {
  margin: 8px 0;
  padding: 0;
  list-style: none;
}

.skill li {
  margin-bottom: 6px;
  padding: 4px 0;
}

.skill-item {
  margin: 0;
}

.skill-item-li {
  list-style: none;
  margin-bottom: 10px;
  padding: 8px 0;
  border-left: 3px solid;
  padding-left: 10px;
}

.skill-item div:first-child {
  font-weight: 600;
  color: #2c3e50;
  font-size: 14px;
}

.skill-item .desc {
  font-size: 12px;
  color: #7f8c8d;
  margin-top: 2px;
}

/* 教育部分 */
.education {
  margin-top: 16px;
}

.education ul {
  margin: 8px 0;
  padding-left: 0;
  list-style: none;
}

.education-item-li {
  list-style: none;
  margin-bottom: 10px;
  padding: 8px 0;
  border-left: 3px solid;
  padding-left: 10px;
  font-size: 14px;
}

/* 实习/工作经历部分 */
.experience {
  margin-top: 16px;
}

.experience ul {
  margin: 8px 0;
  padding: 0;
  list-style: none;
}

.exp-item {
  list-style: none;
  margin-bottom: 10px;
  padding: 8px 0;
  border-left: 3px solid;
  padding-left: 10px;
}

.exp-header {
  margin-bottom: 4px;
}

.company {
  font-weight: 700;
  color: #2c3e50;
  font-size: 14px;
}

.role {
  display: inline-block;
  margin-right: 12px;
  font-size: 12px;
  color: #ff69b4;
  font-weight: 600;
}

.time {
  font-size: 12px;
  color: #95a5a6;
}

.desc {
  font-size: 12px;
  color: #555;
  margin-top: 4px;
  line-height: 1.5;
}

/* 项目部分 */
.project {
  margin-top: 16px;
}

.project-item {
  display: flex;
  margin-bottom: 10px;
  padding: 8px 0;
  border-left: 3px solid;
  padding-left: 10px;
  gap: 8px;
}

.project-content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.project-item .header {
  margin-bottom: 4px;
}

.project-item strong {
  font-weight: 700;
  color: #2c3e50;
  font-size: 14px;
}

.tech {
  font-size: 12px;
  color: #ff69b4;
  font-weight: 600;
  margin-top: 3px;
}

.project-item a {
  color: #0066cc;
  text-decoration: none;
  font-size: 11px;
  word-break: break-all;
  display: inline-block;
  margin-top: 3px;
}

.project-item a:hover {
  text-decoration: underline;
}

/* 列表通用样式 */
ul {
  margin: 5px 0;
  padding: 0;
}

/* 导出按钮 */
.export-btn {
  margin: 20px 0;
  display: flex;
  gap: 12px;
  justify-content: center;
}

.save-btn {
  padding: 12px 28px;
  font-size: 15px;
  font-weight: 600;
  background: linear-gradient(135deg, #59B9E8 0%, #667eea 100%);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(89, 185, 232, 0.3);
}

.save-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(89, 185, 232, 0.4);
}

.export-btn-item {
  padding: 12px 28px;
  font-size: 15px;
  font-weight: 600;
  background: linear-gradient(135deg, #ff69b4 0%, #ff1493 100%);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 105, 180, 0.3);
}

.export-btn-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 105, 180, 0.4);
}

.export-btn-item:active {
  transform: translateY(0);
}

/* 空状态提示 */
.skill p,
.education p,
.experience p,
.project p {
  font-style: italic;
  color: #bdc3c7;
  font-size: 13px;
}

/* 响应式设计 */
@media (max-width: 900px) {
  .a4 {
    width: 95%;
    padding: 15mm;
    margin: 10px auto;
  }

  .preview {
    width: 100%;
  }
}

/* 圆点样式 */
.item-dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 8px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, box-shadow 0.2s;
  vertical-align: middle;
}

.item-dot:hover {
  transform: scale(1.3);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
}

.list-item-with-dot {
  display: flex;
  align-items: flex-start;
}

.project-item {
  align-items: flex-start;
}

.project-item .item-dot {
  flex-shrink: 0;
  width: 12px;
  height: 12px;
  margin-top: 2px;
}

/* 颜色选择器覆盖层 */
.color-picker-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.color-picker-modal {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  max-width: 400px;
}

.color-picker-modal h3 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 18px;
}

.color-wheel-container {
  position: relative;
  width: 300px;
  height: 300px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.color-wheel {
  cursor: crosshair;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.color-indicator {
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.rgb-inputs {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  justify-content: center;
}

.color-input {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.color-input label {
  font-weight: 600;
  color: #ff69b4;
  font-size: 14px;
  margin-bottom: 5px;
}

.color-input input {
  width: 60px;
  padding: 6px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
}

.rgb-display {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 6px;
  text-align: center;
  font-size: 14px;
  color: #666;
  font-family: monospace;
  margin-bottom: 15px;
}

.color-picker-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.confirm-btn {
  padding: 10px 30px;
  background: linear-gradient(135deg, #ff69b4 0%, #ff1493 100%);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.2s;
}

.confirm-btn:hover {
  transform: translateY(-2px);
}

.cancel-btn {
  padding: 10px 30px;
  background: #e0e0e0;
  color: #333;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.2s;
}

.cancel-btn:hover {
  background: #d0d0d0;
  transform: translateY(-2px);
}

@media print {
  .page-container {
    background: white;
    padding: 0;
  }

  .a4 {
    width: 100%;
    min-height: 100%;
    padding: 0;
    box-shadow: none;
    margin: 0;
    border-radius: 0;
  }

  .export-btn {
    display: none;
  }

  .header-decoration {
    display: none;
  }

  .right-decoration {
    display: none;
  }
}
</style>