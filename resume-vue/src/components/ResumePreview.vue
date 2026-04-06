<script setup>

defineProps({
  resume: Object
})


</script>

<template>
    <div class="preview">

    <!-- ********************name******************* -->
    <h4>姓名</h4>
    <h1 v-if="resume.name">
        {{ resume.name }}
    </h1>
    <p v-else>请填写你的名字</p> 

    <hr class="divider" />


    <!-- ********************skill******************* -->
    <div class="skill">
    <h4>技能</h4>
    <!-- 没有技能时 -->
    <p v-if="resume.skills.length === 0">
      还没有技能，请在左侧添加 👈
    </p>

    <!-- 有技能时 -->
    <ul v-else>
      <li v-for="(skill, index) in resume.skills" :key="index">
        <div class="skill-item">
            <div>{{ skill.name }}</div>
            <div class="desc">{{ skill.desc }}</div>
        </div>
      </li>
    </ul>
  </div>
    
    <hr class="divider" />


    <!-- ********************education******************* -->
     <div class="education">
    </div>

    <div class="education">
  <h4>教育经历</h4>

  <p v-if="resume.schools.length === 0">
    还没有教育经历 👈
  </p>

  <ul v-else>
    <li v-for="(school, index) in resume.schools" :key="index">
      {{ school }}
    </li>
  </ul>
</div>

    <hr class="divider" />


    <!-- ********************experience******************* -->
     <div class="experience">
  <h4>实习经历</h4>

  <p v-if="resume.experiences.length === 0">
    还没有实习经历 👈
  </p>

  <ul v-else>
    <li
      v-for="(exp, index) in resume.experiences"
      :key="index"
      class="exp-item"
    >
      <div class="exp-header">
        <span class="company">{{ exp.company }}</span>
      </div>

      <span class="role">{{ exp.role }}</span>
      <span class="time">{{ exp.time }}</span>

      <div class="desc">{{ exp.desc }}</div>
    </li>
  </ul>
</div>

<hr class="divider" />

    <!-- ********************project******************* -->
     <div class="project">
  <h4>项目经历</h4>

  <p v-if="resume.projects.length === 0">
    还没有项目经历 👈
  </p>

  <div v-else>
    <div
      v-for="(p, index) in resume.projects"
      :key="index"
      class="project-item"
    >
      <div class="header">
        <strong>{{ p.name }}</strong>
      </div>

      <div class="tech">{{ p.tech }}</div>
      <div class="desc">{{ p.desc }}</div>

      <a :href="p.link" target="_blank">{{ p.link }}</a>
    </div>
  </div>
</div>

<hr class="divider" />
</div>
</template>

<style scoped>
.preview {
  background: white;
  border-radius: 12px;
  padding: 20px;
}

.skill {
  margin-top: 20px;
}

.role {
  display: inline-block;
  margin-right: 20px;
}

.divider {
  margin: 20px 0;
  border: none;
  border-top: 1px solid #5919c1;
}

.project-item {
  margin-bottom: 12px;
}

.tech {
  font-size: 12px;
  color: #666;
}

.desc {
  font-size: 12px;
  color: #888;
  margin-top: 4px;
}

</style>