import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8081/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 请求拦截器 - 自动添加 Token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器 - 统一错误处理
apiClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if (error.response) {
            const { status, data } = error.response;

            if (status === 401) {
                // Token 过期,清除并跳转登录
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/#/login';
            }

            // 返回后端错误信息
            return Promise.reject(data.message || '请求失败');
        }

        return Promise.reject(error.message || '网络错误');
    }
);

export default apiClient;
