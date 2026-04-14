const express = require('express')
const cors = require('cors')

const pdfRoutes = require('./routes/pdf')

const app = express()


app.use(cors())

app.use(express.json({ limit: '10mb' }))

app.use('/api/export', pdfRoutes)

const resumeRoutes = require('./routes/resumeData')
app.use('/api/resume', resumeRoutes)

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000')
})