import axios from 'axios'
const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 2000,
    headers: {}
});

// 添加请求拦截器
instance.interceptors.request.use(function(config) {
    return config;
}, function(error) {
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function(resp) {
    return resp.data;
}, function(error) {
    console.log(error)
    return Promise.reject(error);
});

export default instance