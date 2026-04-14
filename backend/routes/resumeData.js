const express = require('express')
const router = express.Router()

const resume = require('../data/resumeStore')

// GET /api/resume
router.get('/', (req, res) => {
    res.json(resume)
})

// PUT /api/resume
router.put('/', (req, res) => {
    Object.assign(resume, req.body)
    res.json(resume)
})

/*----------------------name------------------------*/
router.post('/name', (req, res) => {
    console.log('name:', req.body)//用于调试，查看请求体中的数据
    resume.name = req.body.name
    res.json(resume)
})

/*------------------skills-------------------*/
router.post('/skill', (req, res) => {
    console.log('body:', req.body)

    // 确保 resume.skills 是一个数组，如果不是，则初始化为一个空数组
    if (!Array.isArray(resume.skills)) {
        resume.skills = []
    }

    // 将请求体中的技能数据添加到 resume.skills 数组中，使用默认值避免 undefined
    resume.skills.push({
        name: req.body.name || '',
        desc: req.body.desc || ''
    })

    res.json(resume)
})

//根据索引（index）删除某个技能，然后返回最新简历
router.delete('/skill/:index', (req, res) => {
    //注意前端请求的req.params.index === "1"是字符串！
    //转成数字
    const index = Number(req.params.index)

    //校验 index，防止用户乱传
    if (Number.isNaN(index)) {
        return res.status(400).json({ error: 'invalid index' })
    }

    if (index >= 0 && index < resume.skills.length) {
        resume.skills.splice(index, 1)
    }

    res.json(resume)
})

/*------------------education-------------------*/
router.post('/school', (req, res) => {
    console.log('收到school:', req.body)

    if (!Array.isArray(resume.schools)) {
        resume.schools = []
    }

    resume.schools.push(req.body)

    res.json(resume)
})

router.delete('/school/:id', (req, res) => {
    const index = Number(req.params.id)

    if (Number.isNaN(index)) {
        return res.status(400).json({ error: 'invalid index' })
    }

    if (index >= 0 && index < resume.schools.length) {
        resume.schools.splice(index, 1)
    }

    res.json(resume)
})

/*------------------experience-------------------*/
router.post('/experience', (req, res) => {
    console.log('收到experience:', req.body)

    if (!Array.isArray(resume.experiences)) {
        resume.experiences = []
    }

    resume.experiences.push({
        company: req.body.company || '',
        role: req.body.role || '',
        time: req.body.time || '',
        desc: req.body.desc || ''
    })

    res.json(resume)
})

router.delete('/experience/:index', (req, res) => {
    const index = Number(req.params.index)

    if (Number.isNaN(index)) {
        return res.status(400).json({ error: 'invalid index' })
    }

    if (index >= 0 && index < resume.experiences.length) {
        resume.experiences.splice(index, 1)
    }

    res.json(resume)
})

/*------------------project-------------------*/
router.post('/project', (req, res) => {
    console.log('收到project:', req.body)

    if (!Array.isArray(resume.projects)) {
        resume.projects = []
    }

    resume.projects.push({
        name: req.body.name || '',
        tech: req.body.tech || '',
        desc: req.body.desc || '',
        link: req.body.link || ''
    })

    res.json(resume)
})

router.delete('/project/:index', (req, res) => {
    const index = Number(req.params.index)

    if (Number.isNaN(index)) {
        return res.status(400).json({ error: 'invalid index' })
    }

    if (index >= 0 && index < resume.projects.length) {
        resume.projects.splice(index, 1)
    }

    res.json(resume)
})

module.exports = router
