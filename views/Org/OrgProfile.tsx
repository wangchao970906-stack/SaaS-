
import React from 'react';
import { Camera, FileUp, ShieldCheck, HelpCircle, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../App';

const OrgProfile: React.FC = () => {
  const { activeWorkspace } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">企业资料</h1>
        <p className="text-slate-500 mt-1">管理企业实名信息与认证状态</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Banner Profile Section */}
        <div className="h-24 bg-gradient-to-r from-blue-600 to-[#0052CC]"></div>
        <div className="px-8 pb-8">
          <div className="relative -mt-10 mb-6 flex items-end justify-between">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl border-4 border-white bg-slate-100 flex items-center justify-center text-3xl font-bold text-[#0052CC] shadow-lg">
                {activeWorkspace?.logo}
              </div>
              <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-full border border-slate-200 shadow-md hover:bg-slate-50 transition-colors">
                <Camera size={16} className="text-slate-600" />
              </button>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                activeWorkspace?.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
              }`}>
                {activeWorkspace?.status === 'active' ? '已完成认证' : '资质审核中'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">企业全称</label>
                <p className="text-slate-900 font-medium px-4 py-2 bg-slate-50 rounded-lg border border-slate-100">{activeWorkspace?.name}</p>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">统一社会信用代码</label>
                <p className="text-slate-900 font-medium px-4 py-2 bg-slate-50 rounded-lg border border-slate-100">91310115MA1H7X***</p>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">法定代表人</label>
                <p className="text-slate-900 font-medium px-4 py-2 bg-slate-50 rounded-lg border border-slate-100">陈*海</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center justify-between">
                  资质文件
                  <HelpCircle size={14} className="text-slate-400" />
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-[3/4] rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-4 group hover:border-blue-400 transition-all cursor-pointer bg-white">
                    <FileUp size={24} className="text-slate-400 group-hover:text-blue-500 mb-2" />
                    <p className="text-[11px] text-center text-slate-500 group-hover:text-blue-600 font-medium">营业执照 (副本)</p>
                  </div>
                  <div className="aspect-[3/4] rounded-xl border-2 border-slate-200 flex flex-col items-center justify-center p-4 bg-slate-50 overflow-hidden relative group">
                    <CheckCircle2 className="absolute top-2 right-2 text-emerald-500" size={16} />
                    <img src="https://picsum.photos/seed/license/200/300" className="w-full h-full object-cover opacity-30 grayscale" alt="License" />
                    <p className="absolute bottom-2 text-[10px] font-bold text-emerald-700">已上传并识别</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-end gap-3 border-t border-slate-100 pt-8">
            <button className="px-6 py-2.5 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors">
              取消更改
            </button>
            <button className="px-8 py-2.5 bg-[#0052CC] text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
              更新资料
            </button>
          </div>
        </div>
      </div>

      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 flex items-start gap-4">
        <div className="p-3 bg-white rounded-xl text-emerald-600 shadow-sm">
          <ShieldCheck size={24} />
        </div>
        <div>
          <h4 className="font-bold text-emerald-900">企业诚信评级: AA+</h4>
          <p className="text-sm text-emerald-700 mt-1 leading-relaxed">
            您的企业目前信用记录良好。保持及时的结算记录可以进一步提升信用评分，从而获得更低的费率和更高的预授信额度。
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrgProfile;
