import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi, UserResponse } from '../api/auth';

interface AuthContextType {
    user: UserResponse | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserResponse | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // 初始化 - 从 localStorage 恢复登录状态
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }

        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        const response = await authApi.login({ email, password });
        const { token: newToken, user: newUser } = response.data;

        // 保存到状态
        setToken(newToken);
        setUser(newUser);

        // 持久化到 localStorage
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(newUser));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // 调用后端登出接口(可选)
        authApi.logout().catch(() => { });
    };

    const value = {
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
        isLoading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
