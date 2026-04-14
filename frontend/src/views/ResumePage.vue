<script setup>
import { ref } from "vue"
import { exportPDF } from "@/api/export"

const props = defineProps({
  resume: Object
})

const previewRef = ref(null)

const handleExport = async () => {
  const previewElement = previewRef.value
  if (!previewElement) {
    alert("预览组件加载失败")
    return
  }

  const html = previewElement.innerHTML
  
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
        p {
          margin: 5px 0;
        }
        ul {
          margin: 5px 0;
          padding-left: 20px;
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
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "resume.pdf"
    a.click()

    URL.revokeObjectURL(url)
  } catch (err) {
    console.error("PDF导出失败:", err)
    alert("PDF导出失败，请重试")
  }
}

</script>

<template>
  <div class="page-container">
    <!-- 预览区域 -->
    <div class="preview a4" ref="previewRef">
      <!-- 姓名 -->
      <h2 class="section-title">姓名</h2>
      <h1 v-if="resume.name">
        {{ resume.name }}
      </h1>
      <p v-else>请填写你的名字</p>

      <!-- 技能 -->
      <div class="skill">
        <h2 class="section-title">技能</h2>
        <p v-if="resume.skills.length === 0">
          还没有技能，请在左侧添加 👈
        </p>
        <ul v-else>
          <li v-for="(skill, index) in resume.skills" :key="index">
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
          <li v-for="(school, index) in resume.schools" :key="index">
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
          <li v-for="(exp, index) in resume.experiences" :key="index" class="exp-item">
            <div class="exp-header">
              <span class="company">{{ exp.company }}</span>
            </div>
            <span class="role">{{ exp.role }}</span>
            <span class="time">{{ exp.time }}</span>
            <div class="desc">{{ exp.desc }}</div>
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
          <div v-for="(p, index) in resume.projects" :key="index" class="project-item">
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

    <!-- 导出按钮 -->
    <div class="export-btn">
      <button @click="handleExport">📥 导出 PDF</button>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.a4 {
  width: 210mm;
  min-height: 297mm;
  padding: 20mm;
  background: white;
  box-sizing: border-box;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.preview {
  font-family: "Helvetica", "Arial", sans-serif;
  line-height: 1.6;
  color: #333;
  width: 800px;
  margin: 0 auto;
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

.exp-item {
  list-style: none;
  margin-bottom: 12px;
}

.exp-header {
  margin-bottom: 4px;
}

.company {
  font-weight: bold;
}

.project-item {
  margin-bottom: 12px;
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
  word-break: break-all;
}

h1 {
  margin: 10px 0 20px 0;
  font-size: 28px;
}

h2 {
  margin: 0;
}

p {
  margin: 5px 0;
}

ul {
  margin: 5px 0;
  padding-left: 20px;
}

.export-btn {
  margin: 20px 0;
}

.export-btn button {
  padding: 10px 30px;
  font-size: 16px;
  background-color: #5919c1;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.export-btn button:hover {
  background-color: #4a158a;
}
</style>