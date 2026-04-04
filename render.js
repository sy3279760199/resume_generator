// 渲染
export function render(el, template, data) {
    el.innerHTML = template(data);
}