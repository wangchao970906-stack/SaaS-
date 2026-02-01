
import React, { useState } from 'react';
import { Plus, Search, Shield, UserCheck, MoreHorizontal, Check } from 'lucide-react';

interface Permission {
  id: string;
  name: string;
  description: string;
}

const permissions: Permission[] = [
  { id: 'view_dashboard', name: '查看控制台', description: '允许查看仪表盘全局数据' },
  { id: 'manage_products', name: '产品签约权限', description: '允许发起并管理产品签约' },
  { id: 'initiate_settlement', name: '发起结算', description: '允许选择订单并发起结算流程' },
  { id: 'audit_settlement', name: '审核结算', description: '对他人发起的结算进行审批' },
  { id: 'edit_org_info', name: '修改企业信息', description: '允许修改企业基本资料及上传资质' },
  { id: 'manage_users', name: '成员与权限管理', description: '允许添加/移除成员及分配角色' },
];

const RBACPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'roles' | 'members'>('roles');
  
  const [rolePermissions, setRolePermissions] = useState<Record<string, string[]>>({
    'Owner': permissions.map(p => p.id),
    'Admin': ['view_dashboard', 'manage_products', 'initiate_settlement', 'edit_org_info'],
    'Operator': ['view_dashboard', 'initiate_settlement'],
    'Finance': ['view_dashboard', 'initiate_settlement', 'audit_settlement'],
  });

  const togglePermission = (role: string, permissionId: string) => {
    if (role === 'Owner') return; // Owner permissions are fixed
    const current = rolePermissions[role] || [];
    if (current.includes(permissionId)) {
      setRolePermissions({ ...rolePermissions, [role]: current.filter(id => id !== permissionId) });
    } else {
      setRolePermissions({ ...rolePermissions, [role]: [...current, permissionId] });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">权限与角色</h1>
          <p className="text-slate-500 mt-1">定义团队职责与操作权限边界</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#0052CC] text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-md transition-all">
          <Plus size={16} /> 创建新角色
        </button>
      </div>

      <div className="flex border-b border-slate-200 gap-8">
        <button 
          onClick={() => setActiveTab('roles')}
          className={`pb-3 text-sm font-bold transition-all relative ${activeTab === 'roles' ? 'text-[#0052CC]' : 'text-slate-400 hover:text-slate-600'}`}
        >
          角色与权限矩阵
          {activeTab === 'roles' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0052CC]" />}
        </button>
        <button 
          onClick={() => setActiveTab('members')}
          className={`pb-3 text-sm font-bold transition-all relative ${activeTab === 'members' ? 'text-[#0052CC]' : 'text-slate-400 hover:text-slate-600'}`}
        >
          操作员管理
          {activeTab === 'members' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0052CC]" />}
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {activeTab === 'roles' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-4 text-[13px] font-bold text-slate-500 uppercase">权限项目</th>
                  {Object.keys(rolePermissions).map(role => (
                    <th key={role} className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-[13px] font-bold text-slate-700">{role}</span>
                        {role === 'Owner' && <span className="text-[10px] text-blue-500 font-bold mt-1 bg-blue-50 px-1.5 rounded">不可修改</span>}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {permissions.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800 text-sm">{p.name}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{p.description}</div>
                    </td>
                    {Object.keys(rolePermissions).map(role => {
                      const hasPerm = rolePermissions[role].includes(p.id);
                      return (
                        <td key={role} className="px-6 py-4 text-center">
                          <button 
                            disabled={role === 'Owner'}
                            onClick={() => togglePermission(role, p.id)}
                            className={`
                              mx-auto w-6 h-6 rounded-md border flex items-center justify-center transition-all
                              ${hasPerm ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white border-slate-200 hover:border-slate-300'}
                              ${role === 'Owner' ? 'cursor-default opacity-100' : 'cursor-pointer'}
                            `}
                          >
                            {hasPerm && <Check size={14} strokeWidth={3} />}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
              <UserCheck size={32} />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-slate-800">暂无外部操作员</h3>
              <p className="text-sm text-slate-500 mt-1 max-w-sm">
                目前该企业仅有您一位成员。您可以通过邮箱邀请同事加入，并为他们分配预设好的角色。
              </p>
            </div>
            <button className="px-6 py-2 bg-[#0052CC] text-white rounded-xl font-bold hover:bg-blue-700 transition-all">
              立即邀请成员
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RBACPage;
