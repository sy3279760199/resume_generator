const express = require('express')
const router = express.Router()

const { exportPDF } = require('../controllers/pdfController')

router.post('/pdf', exportPDF)
module.exports = router