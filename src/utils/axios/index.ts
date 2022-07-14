import axios from "axios";
import qs from "qs";
import { ElLoading } from 'element-plus'

const request = axios.create({
    // API 请求的默认前缀 `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL
    baseURL: '/api',
    timeout: 6000, // 请求超时时间
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    paramsSerializer: params => {
        return qs.stringify(params, { indices: false });
    },
});

request.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

request.interceptors.response.use(
    (response) => {
        if (response.status == 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    (error) => {
        console.log(JSON.stringify(error));
    }
);
export default request;
