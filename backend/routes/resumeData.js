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
    console.log('name:', req.body)
    resume.name = req.body.name
    res.json(resume)
})

/*------------------skills-------------------*/
router.post('/skill', (req, res) => {
    console.log('🔥 skill route hit')
    console.log('body:', req.body)

    if (!Array.isArray(resume.skills)) {
        resume.skills = []
    }

    resume.skills.push({
        name: req.body.name || '',
        desc: req.body.desc || ''
    })

    res.json(resume)
})

router.delete('/skill/:index', (req, res) => {
    const index = Number(req.params.index)

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
    const index = parseInt(req.params.id)
    resume.schools.splice(index, 1)
    res.json(resume)
})

module.exports = router
