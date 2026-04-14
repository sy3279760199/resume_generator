import axios from "axios"

// ========== 改动：参数改为html（HTML字符串），而不是resume对象 ==========
export const exportPDF = (html) => {
    return axios.post("/api/export/pdf", {
        html
    }, {
        responseType: "blob"
    })
}