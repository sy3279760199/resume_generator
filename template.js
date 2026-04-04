// 模板
export const template1 = (data) => `
<div class="resume">
    <h1>${data.name}</h1>

    <h2>联系方式</h2>
    <p>${data.phone}</p>

    <h2>教育背景</h2>
    <p>${data.school}</p>
</div>
`;

export const template2 = (data) => `
<div class="resume">
    <h2>${data.name}</h2>
    <p>📞 ${data.phone}</p>
    <p>🎓 ${data.school}</p>
</div>
`;