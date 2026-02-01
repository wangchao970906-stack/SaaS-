
import React, { useState, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './views/Auth/LoginPage';
import RegisterPage from './views/Auth/RegisterPage';
import ProductCenter from './views/Products/ProductCenter';
import SettlementPage from './views/Finance/SettlementPage';
import OrgProfile from './views/Org/OrgProfile';
import RBACPage from './views/Settings/RBACPage';
import Dashboard from './views/Dashboard';
import { Workspace } from './types';
import { AuthProvider, useAuth } from './context/AuthContext';

interface AppContextType {
  activeWorkspace: Workspace | null;
  workspaces: Workspace[];
  setActiveWorkspace: (ws: Workspace) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

const mockWorkspaces: Workspace[] = [
  { id: '1', name: 'Digital Alchemists Co.', logo: 'DA', role: 'Owner', status: 'active' },
  { id: '2', name: 'Global Logistics Ltd.', logo: 'GL', role: 'Admin', status: 'pending_kyc' },
];

// 保护路由组件
const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">加载中...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Layout />;
};

const AppContent: React.FC = () => {
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace>(mockWorkspaces[0]);

  const value = {
    activeWorkspace,
    workspaces: mockWorkspaces,
    setActiveWorkspace,
  };

  return (
    <AppContext.Provider value={value}>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<ProductCenter />} />
            <Route path="/settlement" element={<SettlementPage />} />
            <Route path="/organization" element={<OrgProfile />} />
            <Route path="/rbac" element={<RBACPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </AppContext.Provider>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};


export default App;
