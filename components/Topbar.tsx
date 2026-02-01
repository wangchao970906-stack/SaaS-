import React, { useState } from 'react';
import { Bell, Search, ChevronDown, User, LogOut, Check } from 'lucide-react';
import { useApp } from '../App';
import { useAuth } from '../context/AuthContext';
import { Workspace } from '../types';

const Topbar: React.FC = () => {
  const { activeWorkspace, workspaces, setActiveWorkspace } = useApp();
  const { user, logout } = useAuth();
  const [isWorkspaceMenuOpen, setIsWorkspaceMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10">
      <div className="flex items-center gap-4">
        {/* Workspace Switcher */}
        <div className="relative">
          <button
            onClick={() => setIsWorkspaceMenuOpen(!isWorkspaceMenuOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
          >
            <div className="w-6 h-6 rounded bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold uppercase">
              {activeWorkspace?.logo}
            </div>
            <span className="font-semibold text-sm text-slate-700">{activeWorkspace?.name}</span>
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          {isWorkspaceMenuOpen && (
            <>
              <div className="fixed inset-0 z-20" onClick={() => setIsWorkspaceMenuOpen(false)} />
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl z-30 py-2">
                <div className="px-4 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">切换企业空间</div>
                {workspaces.map((ws) => (
                  <button
                    key={ws.id}
                    onClick={() => {
                      setActiveWorkspace(ws);
                      setIsWorkspaceMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                      {ws.logo}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium text-slate-700">{ws.name}</div>
                      <div className="text-[11px] text-slate-400">{ws.role}</div>
                    </div>
                    {activeWorkspace?.id === ws.id && <Check size={16} className="text-[#0052CC]" />}
                  </button>
                ))}
                <div className="border-t border-slate-100 mt-2 pt-2">
                  <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#0052CC] hover:bg-blue-50 transition-colors font-medium">
                    + 创建或加入新企业
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Global Search */}
        <div className="hidden sm:flex items-center relative mr-2">
          <Search className="absolute left-3 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="搜索功能或订单..."
            className="pl-10 pr-4 py-1.5 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#0052CC] transition-all w-64"
          />
        </div>

        {/* Notifications */}
        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 p-1 pl-2 rounded-full border border-slate-200 hover:border-slate-300 transition-colors bg-white shadow-sm"
          >
            <span className="text-sm font-medium text-slate-600 px-1 hidden md:inline">{user?.name}</span>
            <img src={user?.avatar} alt="Avatar" className="w-8 h-8 rounded-full border border-slate-100" />
          </button>

          {isUserMenuOpen && (
            <>
              <div className="fixed inset-0 z-20" onClick={() => setIsUserMenuOpen(false)} />
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-30 py-2 overflow-hidden">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs text-slate-400">当前账户</p>
                  <p className="text-sm font-semibold truncate">{user?.email}</p>
                </div>
                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
                  <User size={16} /> 个人中心
                </button>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} /> 退出登录
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
