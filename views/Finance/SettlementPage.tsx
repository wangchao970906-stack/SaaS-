
import React, { useState } from 'react';
import { Search, Download, CheckCircle2, Clock, XCircle, ChevronRight, Filter } from 'lucide-react';
import { SettlementOrder } from '../../types';

const mockOrders: SettlementOrder[] = [
  { id: 'ORD-20240325-001', productName: '政企分期云服务', amount: 12500.00, date: '2024-03-25 14:22', status: 'completed' },
  { id: 'ORD-20240325-002', productName: '公众分期普惠贷', amount: 4800.50, date: '2024-03-25 15:10', status: 'pending' },
  { id: 'ORD-20240324-098', productName: '政企分期云服务', amount: 82000.00, date: '2024-03-24 10:05', status: 'processing' },
  { id: 'ORD-20240324-045', productName: '跨境供应链融资', amount: 15400.00, date: '2024-03-24 11:30', status: 'failed' },
  { id: 'ORD-20240323-012', productName: '政企分期云服务', amount: 6200.00, date: '2024-03-23 09:45', status: 'completed' },
];

const SettlementPage: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelectAll = () => {
    if (selectedIds.length === mockOrders.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(mockOrders.map(o => o.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const getStatusStyle = (status: SettlementOrder['status']) => {
    switch (status) {
      case 'completed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'processing': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'pending': return 'bg-slate-50 text-slate-600 border-slate-100';
      case 'failed': return 'bg-red-50 text-red-600 border-red-100';
    }
  };

  const getStatusIcon = (status: SettlementOrder['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle2 size={14} />;
      case 'processing': return <Clock size={14} />;
      case 'pending': return <Clock size={14} />;
      case 'failed': return <XCircle size={14} />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">财务结算</h1>
          <p className="text-slate-500 mt-1">管理订单结算进度与款项提取</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            <Download size={16} /> 导出账单
          </button>
          <button 
            disabled={selectedIds.length === 0}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm
              ${selectedIds.length > 0 ? 'bg-[#0052CC] text-white hover:bg-blue-700' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}
            `}
          >
            发起批量结算 ({selectedIds.length})
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="通过订单号搜索..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select className="bg-slate-50 border-none rounded-lg text-sm px-4 py-2 text-slate-600 focus:ring-2 focus:ring-blue-500">
          <option>全部产品</option>
          <option>政企分期云服务</option>
          <option>公众分期普惠贷</option>
        </select>
        <button className="flex items-center gap-2 px-4 py-2 text-slate-600 text-sm font-medium hover:bg-slate-50 rounded-lg transition-colors">
          <Filter size={16} /> 高级筛选
        </button>
      </div>

      {/* Table Content */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 w-10">
                  <input 
                    type="checkbox" 
                    checked={selectedIds.length === mockOrders.length && mockOrders.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-4 text-[13px] font-bold text-slate-500 uppercase tracking-wider">订单编号</th>
                <th className="px-6 py-4 text-[13px] font-bold text-slate-500 uppercase tracking-wider">产品类型</th>
                <th className="px-6 py-4 text-[13px] font-bold text-slate-500 uppercase tracking-wider">结算金额</th>
                <th className="px-6 py-4 text-[13px] font-bold text-slate-500 uppercase tracking-wider">申请时间</th>
                <th className="px-6 py-4 text-[13px] font-bold text-slate-500 uppercase tracking-wider">状态</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {mockOrders.map((order) => (
                <tr 
                  key={order.id} 
                  className={`group transition-colors hover:bg-slate-50/80 ${selectedIds.includes(order.id) ? 'bg-blue-50/30' : ''}`}
                >
                  <td className="px-6 py-4">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(order.id)}
                      onChange={() => toggleSelect(order.id)}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-slate-800">{order.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{order.productName}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-900">¥ {order.amount.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-bold ${getStatusStyle(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status === 'completed' && '已完成'}
                      {order.status === 'processing' && '处理中'}
                      {order.status === 'pending' && '待审核'}
                      {order.status === 'failed' && '失败'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg transition-all opacity-0 group-hover:opacity-100">
                      <ChevronRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
          <p className="text-sm text-slate-500">显示 1 到 5 条，共 24 条记录</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-slate-200 rounded bg-white text-sm text-slate-400 cursor-not-allowed">上一页</button>
            <button className="px-3 py-1 border border-blue-200 rounded bg-blue-50 text-sm font-bold text-[#0052CC]">1</button>
            <button className="px-3 py-1 border border-slate-200 rounded bg-white text-sm text-slate-600 hover:bg-slate-50">2</button>
            <button className="px-3 py-1 border border-slate-200 rounded bg-white text-sm text-slate-600 hover:bg-slate-50">下一页</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettlementPage;
