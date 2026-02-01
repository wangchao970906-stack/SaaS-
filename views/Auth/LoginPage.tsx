import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || '登录失败，请检查账号密码');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Brand */}
        <div className="flex items-center gap-3 mb-10 justify-center">
          <div className="w-10 h-10 rounded-xl bg-[#0052CC] flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20">
            E
          </div>
          <span className="font-bold text-2xl tracking-tight text-slate-900">EnterpriseOS</span>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">欢迎回来</h1>
          <p className="text-slate-500 mb-8 text-sm">请输入您的工作账号继续</p>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm flex items-center gap-2">
              <span className="font-bold">错误:</span> {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">工作邮箱</label>
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0052CC] focus:bg-white transition-all outline-none"
                required
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-bold text-slate-700">登录密码</label>
                <a href="#" className="text-[13px] font-bold text-[#0052CC] hover:underline">忘记密码?</a>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0052CC] focus:bg-white transition-all outline-none"
                required
              />
            </div>

            <button
              disabled={isLoading}
              className="w-full bg-[#0052CC] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>正在登录...</>
              ) : (
                <>
                  登录系统
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              还没有账号? <Link to="/register" className="font-bold text-[#0052CC] hover:underline">免费注册</Link>
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-slate-400">
          <div className="flex items-center gap-1.5 text-xs font-medium">
            <Shield size={14} /> 安全合规
          </div>
          <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
          <div className="text-xs font-medium hover:text-slate-600 cursor-pointer">服务条款</div>
          <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
          <div className="text-xs font-medium hover:text-slate-600 cursor-pointer">隐私政策</div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
