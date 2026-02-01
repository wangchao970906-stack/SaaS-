
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building, Users, ArrowRight, ChevronLeft } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const [step, setStep] = useState<'type' | 'info'>('type');
  const [regType, setRegType] = useState<'create' | 'join' | null>(null);

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
          {step === 'type' ? (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h1 className="text-2xl font-bold text-slate-900 mb-2">开启您的企业空间</h1>
              <p className="text-slate-500 mb-8 text-sm">选择最适合您现状的加入方式</p>

              <div className="space-y-4">
                <button 
                  onClick={() => { setRegType('create'); setStep('info'); }}
                  className="w-full flex items-center gap-4 p-5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all text-left group"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Building size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-800">创建新企业</p>
                    <p className="text-xs text-slate-500 mt-1">我是管理员，需要建立新的管理后台</p>
                  </div>
                  <ArrowRight size={18} className="text-slate-300 group-hover:text-blue-500" />
                </button>

                <button 
                  onClick={() => { setRegType('join'); setStep('info'); }}
                  className="w-full flex items-center gap-4 p-5 rounded-2xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 transition-all text-left group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-800">加入已有企业</p>
                    <p className="text-xs text-slate-500 mt-1">输入团队邀请码或点击邀请链接加入</p>
                  </div>
                  <ArrowRight size={18} className="text-slate-300 group-hover:text-emerald-500" />
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100 text-center">
                <p className="text-sm text-slate-500">
                  已有账号? <Link to="/login" className="font-bold text-[#0052CC] hover:underline">立即登录</Link>
                </p>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <button 
                onClick={() => setStep('type')}
                className="mb-6 flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                <ChevronLeft size={14} /> 返回选择
              </button>

              <h1 className="text-2xl font-bold text-slate-900 mb-2">
                {regType === 'create' ? '创建企业空间' : '输入加入代码'}
              </h1>
              <p className="text-slate-500 mb-8 text-sm">
                {regType === 'create' ? '请填写您的企业基本资料' : '通过管理员提供的 6 位代码快速加入'}
              </p>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                {regType === 'create' ? (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">企业全称</label>
                      <input type="text" placeholder="例如: 某某信息技术有限公司" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">所在行业</label>
                      <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
                        <option>电子商务</option>
                        <option>金融科技</option>
                        <option>传统制造</option>
                        <option>政企云服务</option>
                      </select>
                    </div>
                  </>
                ) : (
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">邀请码</label>
                    <div className="grid grid-cols-6 gap-2">
                       {[1,2,3,4,5,6].map(i => (
                         <input key={i} type="text" maxLength={1} className="w-full h-12 text-center text-lg font-bold bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none uppercase" />
                       ))}
                    </div>
                  </div>
                )}

                <button className="w-full bg-[#0052CC] text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30">
                  {regType === 'create' ? '立即创建' : '确认加入'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
