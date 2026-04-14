const express = require('express')
const router = express.Router()

const { exportPDF } = require('../controllers/pdfController')

// ========== 改动：修改路由以匹配前端API调用 /api/export/pdf ==========
router.post('/pdf', exportPDF)
module.exports = router