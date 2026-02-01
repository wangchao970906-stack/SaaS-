
import React, { useState } from 'react';
// Added Package to imports
import { Search, Filter, ShieldCheck, ChevronRight, X, Clock, FileText, Package } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  tag: string;
  description: string;
  benefits: string[];
  status: 'available' | 'signed' | 'processing';
  image: string;
}

const ProductCenter: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const products: Product[] = [
    {
      id: 'p1',
      name: '政企分期云服务',
      tag: '高效',
      description: '为政府机关及大中型企业提供的一站式采购分期解决方案，灵活调整账期。',
      benefits: ['低至 3.5% 年化', '最高 5000 万额度', '专属 1v1 客服'],
      status: 'available',
      image: 'https://picsum.photos/seed/p1/400/200',
    },
    {
      id: 'p2',
      name: '公众分期普惠贷',
      tag: '普惠',
      description: '面向大众消费者的轻量化信贷工具，极速审批，即办即用。',
      benefits: ['秒级批贷', '纯线上申请', '随借随还'],
      status: 'signed',
      image: 'https://picsum.photos/seed/p2/400/200',
    },
    {
      id: 'p3',
      name: '跨境供应链融资',
      tag: '全球',
      description: '解决跨境贸易中的资金周转难题，支持多币种结算，覆盖全球 100+ 国家。',
      benefits: ['多币种支持', '贸易链路全程可视', '无抵押信用贷'],
      status: 'processing',
      image: 'https://picsum.photos/seed/p3/400/200',
    },
  ];

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">产品中心</h1>
          <p className="text-slate-500 mt-1">探索适合您业务发展的金融服务</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="搜索产品..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm w-64 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <button className="p-2 border border-slate-200 bg-white rounded-lg hover:bg-slate-50 text-slate-600">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div 
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
          >
            <div className="h-40 overflow-hidden relative">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 bg-white/90 backdrop-blur rounded-md text-[10px] font-bold uppercase tracking-wider text-slate-700 shadow-sm">
                  {product.tag}
                </span>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-lg text-slate-800">{product.name}</h3>
                {product.status === 'signed' && (
                  <span className="text-emerald-600 bg-emerald-50 text-[11px] font-bold px-2 py-1 rounded">已签约</span>
                )}
                {product.status === 'processing' && (
                  <span className="text-amber-600 bg-amber-50 text-[11px] font-bold px-2 py-1 rounded">审核中</span>
                )}
              </div>
              <p className="text-sm text-slate-500 line-clamp-2 mb-6">
                {product.description}
              </p>
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                  <ShieldCheck size={14} className="text-[#0052CC]" />
                  <span>机构背书</span>
                </div>
                <div className="flex items-center gap-1 font-bold text-[#0052CC] text-sm group-hover:gap-2 transition-all">
                  查看详情 <ChevronRight size={16} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Drawer Overlay */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div 
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setSelectedProduct(null)}
          />
          <div className="relative w-full max-w-lg bg-white h-full shadow-2xl animate-in slide-in-from-right duration-500 flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">产品签约详情</h2>
              <button 
                onClick={() => setSelectedProduct(null)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={20} className="text-slate-400" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8">
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-[#0052CC]">
                    <Package size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{selectedProduct.name}</h3>
                    <p className="text-slate-500">发布于 2024-03-25</p>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <ShieldCheck size={18} className="text-emerald-500" />
                    核心优势
                  </h4>
                  <ul className="grid grid-cols-1 gap-3">
                    {selectedProduct.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0052CC]" />
                        <span className="text-sm font-medium text-slate-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <FileText size={18} className="text-blue-500" />
                    签约流程
                  </h4>
                  <div className="relative pl-6 space-y-6 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                    <div className="relative flex items-center gap-3">
                      <div className="absolute left-[-23px] w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-sm" />
                      <span className="text-sm font-semibold">1. 提交申请</span>
                    </div>
                    <div className="relative flex items-center gap-3 opacity-60">
                      <div className="absolute left-[-23px] w-4 h-4 rounded-full bg-slate-200 border-2 border-white shadow-sm" />
                      <span className="text-sm font-medium">2. 企业资质初筛</span>
                    </div>
                    <div className="relative flex items-center gap-3 opacity-60">
                      <div className="absolute left-[-23px] w-4 h-4 rounded-full bg-slate-200 border-2 border-white shadow-sm" />
                      <span className="text-sm font-medium">3. 额度模型测算</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50/50">
              {selectedProduct.status === 'available' ? (
                <button className="w-full bg-[#0052CC] text-white font-bold py-4 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all">
                  立即申请签约
                </button>
              ) : (
                <button disabled className="w-full bg-slate-200 text-slate-400 font-bold py-4 rounded-xl cursor-not-allowed">
                  {selectedProduct.status === 'signed' ? '已签约' : '审核中...'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCenter;
