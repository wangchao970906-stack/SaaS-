
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  CreditCard, 
  Building2, 
  Users, 
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useApp } from '../App';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const location = useLocation();
  const { activeWorkspace } = useApp();

  const navItems = [
    { name: '控制台', icon: LayoutDashboard, path: '/' },
    { name: '产品中心', icon: Package, path: '/products' },
    { name: '财务结算', icon: CreditCard, path: '/settlement' },
    { name: '企业资料', icon: Building2, path: '/organization' },
    { name: '权限管理', icon: Users, path: '/rbac' },
  ];

  return (
    <aside className={`
      relative bg-white border-r border-slate-200 transition-all duration-300 ease-in-out flex flex-col
      ${isCollapsed ? 'w-20' : 'w-64'}
    `}>
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-[#0052CC] flex items-center justify-center text-white font-bold shrink-0">
            E
          </div>
          {!isCollapsed && <span className="font-bold text-lg whitespace-nowrap text-slate-800 tracking-tight">EnterpriseOS</span>}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group
                ${isActive 
                  ? 'bg-blue-50 text-[#0052CC]' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
              `}
            >
              <item.icon size={20} className={isActive ? 'text-[#0052CC]' : 'text-slate-400 group-hover:text-slate-600'} />
              {!isCollapsed && <span className="text-[14px] font-medium leading-5">{item.name}</span>}
              {isActive && !isCollapsed && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#0052CC]" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Toggle */}
      <div className="p-4 border-t border-slate-100 flex flex-col gap-2">
         <button 
           onClick={onToggle}
           className="flex items-center justify-center w-full py-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all"
         >
           {isCollapsed ? <ChevronRight size={18} /> : <div className="flex items-center gap-2"><ChevronLeft size={18} /><span>收起导航</span></div>}
         </button>
      </div>
    </aside>
  );
};

export default Sidebar;
