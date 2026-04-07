const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const resume = {
    name: '',
    skills: [],
    schools: [],
    experiences: [],
    projects: []
}

//GET /api/resume
app.get('/api/resume', (req, res) => {
    res.json(resume)
})

//PUT /api/resume
app.put('/api/resume', (req, res) => {
    Object.assign(resume, req.body)
    res.json(resume)
})

// 更新
/*----------------------name------------------------*/
app.post('/api/name', (req, res) => {
    console.log('name:', req.body)

    resume.name = req.body.name

    res.json(resume)
})

/*------------------skills-------------------*/
app.post('/api/skill', (req, res) => {
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

app.delete('/api/skill/:index', (req, res) => {
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
app.post('/api/school', (req, res) => {
    console.log('收到school:', req.body)

    if (!Array.isArray(resume.schools)) {
        resume.schools = []
    }

    resume.schools.push(req.body)

    res.json(resume)
})

app.delete('/api/school/:id', (req, res) => {
    const index = parseInt(req.params.id)
    resume.schools.splice(index, 1)
    res.json(resume)
})



app.listen(3000, () => {
    console.log('server running on http://localhost:3000')
})
