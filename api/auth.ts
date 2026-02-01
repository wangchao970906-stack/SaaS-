import apiClient from './client';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    name: string;
}

export interface UserResponse {
    id: number;
    email: string;
    name: string;
    avatar: string;
}

export interface LoginResponse {
    token: string;
    user: UserResponse;
}

export const authApi = {
    // 用户注册
    register: (data: RegisterRequest) => {
        return apiClient.post('/auth/register', data);
    },

    // 用户登录
    login: (data: LoginRequest): Promise<{ code: number; message: string; data: LoginResponse }> => {
        return apiClient.post('/auth/login', data);
    },

    // 用户登出
    logout: () => {
        return apiClient.post('/auth/logout');
    },
};
