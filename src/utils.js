export const setStorage = (key, value) => {
    localStorage.setItem(key, btoa(value));
}

export const getStorage = (key) => {
    const val = localStorage.getItem(key);
    if (val !== null) return atob(val);
    return null;
}

export const getFormValues = (formEle) => {
    let obj = {};
    for (let ele of formEle.elements) {
        obj[ele.name] = ele.value;
    }
    return obj;
}

export const setFormValues = (formEle, obj) => {
    for (const ele of formEle.elements) {
        if (!obj[ele.name].includes('/static/media/') && !obj[ele.name].includes('data:image')) {
            ele.value = obj[ele.name];
        }
    }
}

export const loadWidgetJsAndCss = (settings, callback) => {
    let node = document.createElement('script');
    node.src = settings.tenantUrl + "/vfslow/lib/uibuild/standalonelogin/login.js";
    node.type = 'text/javascript';
    node.onload = callback;
    document.getElementsByTagName('head')[0].appendChild(node);

    let linkNode = document.createElement('link');
    linkNode.href = settings.tenantUrl + "/vfslow/lib/uibuild/standalonelogin/css/login.css";
    linkNode.type = 'text/css';
    linkNode.rel = 'stylesheet';
    document.getElementsByTagName('head')[0].appendChild(linkNode);
}