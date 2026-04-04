/* 1. 常量 / 数据
    2. 状态
    3. DOM 获取
    4. 函数（模板 / render / 工具）
    5. 事件绑定（最后）

    上面：定义（数据 + 状态 + 函数）
    下面：使用（事件触发）*/

// ===== 模板 =====
import { template1, template2 } from "./template.js";
// ===== 渲染函数 =====
import { render } from "./render.js";

// =====  数据（固定结构）=====
// 通过 Proxy 实现自动渲染
function createReactive(state) {
    return new Proxy(state, {
        set(target, key, value) {
            target[key] = value;
            render(preview, target.template, target.data);
            return true;
        }
    });
}

const state = createReactive({
    data: {
        name: "张三",
        phone: "13800000000",
        school: "某某大学"
    },
    template: template1
});

// =====  DOM（页面元素）=====
const inputName = document.getElementById("nameInput");
const inputPhone = document.getElementById("phoneInput");
const inputSchool = document.getElementById("schoolInput");

const preview = document.getElementById("resumePreview");
const btnTpl1 = document.getElementById("tpl1");
const btnTpl2 = document.getElementById("tpl2");


// =====  事件绑定（一定放最后！）=====

// 输入监听
/* 引入自动渲染前
inputName.addEventListener("input", function () {
    data.name = inputName.value;
    render(preview, currentTemplate, data);
});*/

inputName.addEventListener("input", e => {
    state.data = {
        ...state.data,
        name: e.target.value
    };
});
inputPhone.addEventListener("input", e => {
    state.data = {
        ...state.data,
        phone: e.target.value
    };
});
inputSchool.addEventListener("input", e => {
    state.data = {
        ...state.data,
        school: e.target.value
    };
});

// 模板切换
btnTpl1.addEventListener("click", function () {
    state.template = template1;
});

btnTpl2.addEventListener("click", function () {
    state.template = template2;
});


// ===== 初始化渲染（关键！）=====
render(preview, state.template, state.data);