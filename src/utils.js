/*
* Copyright (c) 2022 CyberArk Software Ltd. All rights reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

export const OIDC_DEFAULT_SCOPE = ['openid', 'email', 'profile', 'address', 'phone'];
export const redirectOIDCAPI = "http://localhost:3000/RedirectResource";

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