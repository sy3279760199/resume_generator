import axios from "axios"

//定义并导出一个函数 exportPDF，把html字符串作为参数，发送一个POST请求到后端的/api/export/pdf接口，
// 携带html数据，并指定响应类型为blob（表示二进制数据），以便后续处理PDF文件的下载或显示。
export const exportPDF = (html) => {
    return axios.post("/api/export/pdf", {
        html
    }, {
        responseType: "blob"
    })
}