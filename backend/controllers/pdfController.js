const { generatePDF } = require('../services/pdfService')

// ========== 改动：从请求体中提取html内容 ==========
const exportPDF = async (req, res) => {
    const { html } = req.body

    if (!html) {
        return res.status(400).send('HTML内容不能为空')
    }

    try {
        const pdfBuffer = await generatePDF(html)

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=resume.pdf'
        })

        res.send(pdfBuffer)
    } catch (err) {
        console.error(err)
        res.status(500).send('PDF生成失败')
    }
}

module.exports = { exportPDF }