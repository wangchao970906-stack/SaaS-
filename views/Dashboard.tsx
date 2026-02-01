
import React from 'react';
// Added CreditCard to imports
import { TrendingUp, Users, Package, AlertCircle, ArrowRight, CreditCard } from 'lucide-react';
import { useApp } from '../App';

const Dashboard: React.FC = () => {
  const { activeWorkspace } = useApp();

  const stats = [
    { label: '活跃订单', value: '1,284', trend: '+12.5%', icon: Package, color: 'blue' },
    { label: '结算总额', value: '¥248.5k', trend: '+8.2%', icon: TrendingUp, color: 'emerald' },
    { label: '操作员', value: '12', trend: '0%', icon: Users, color: 'indigo' },
    { label: '待办项', value: '3', trend: '-2', icon: AlertCircle, color: 'amber' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">欢迎回来, {activeWorkspace?.name}</h1>
        <p className="text-slate-500 mt-1">这是您的企业管理概览。一切运行正常。</p>
      </div>

      {/* KYC Alert */}
      {activeWorkspace?.status === 'pending_kyc' && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <AlertCircle size={20} />
            </div>
            <div>
              <p className="font-semibold text-blue-900">企业资质审核中</p>
              <p className="text-sm text-blue-700">完成 KYC 认证以开启完整业务权限。</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            立即去完善
          </button>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className={`p-2 rounded-lg bg-${stat.color}-50 text-${stat.color}-600`}>
                <stat.icon size={20} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                {stat.trend}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-800">快捷操作</h3>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50 group transition-all">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Package size={20} />
              </div>
              <div className="text-left">
                <p className="font-semibold text-slate-800">申请产品签约</p>
                <p className="text-xs text-slate-500">开启新的金融业务线</p>
              </div>
              <ArrowRight size={16} className="ml-auto text-slate-300 group-hover:text-blue-500" />
            </button>
            <button className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50 group transition-all">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <CreditCard size={20} />
              </div>
              <div className="text-left">
                <p className="font-semibold text-slate-800">发起财务结算</p>
                <p className="text-xs text-slate-500">提取账户可用余额</p>
              </div>
              <ArrowRight size={16} className="ml-auto text-slate-300 group-hover:text-emerald-500" />
            </button>
          </div>
        </div>

        <div className="bg-[#0052CC] rounded-2xl p-6 text-white relative overflow-hidden flex flex-col justify-between">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">企业升级计划</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              升级到专业版，享受更高的额度，更快的结算速度以及专属客户经理服务。
            </p>
          </div>
          <button className="relative z-10 w-full mt-8 bg-white text-[#0052CC] font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors">
            立即升级
          </button>
          {/* Decorative circles */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500 rounded-full opacity-20"></div>
          <div className="absolute top-0 -left-10 w-24 h-24 bg-blue-400 rounded-full opacity-10"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
