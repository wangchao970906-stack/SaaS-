
import React, { useState, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './views/Auth/LoginPage';
import RegisterPage from './views/Auth/RegisterPage';
import ProductCenter from './views/Products/ProductCenter';
import SettlementPage from './views/Finance/SettlementPage';
import OrgProfile from './views/Org/OrgProfile';
import RBACPage from './views/Settings/RBACPage';
import Dashboard from './views/Dashboard';
import { Workspace, User } from './types';

interface AppContextType {
  user: User | null;
  activeWorkspace: Workspace | null;
  workspaces: Workspace[];
  setActiveWorkspace: (ws: Workspace) => void;
  isAuthenticated: boolean;
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

const mockUser: User = {
  id: 'u1',
  name: 'Alex Chen',
  email: 'alex.chen@enterprise.com',
  avatar: 'https://picsum.photos/seed/user/200',
};

const App: React.FC = () => {
  const [isAuthenticated] = useState(true); // Simplified for demo
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace>(mockWorkspaces[0]);

  const value = {
    user: mockUser,
    activeWorkspace,
    workspaces: mockWorkspaces,
    setActiveWorkspace,
    isAuthenticated,
  };

  return (
    <AppContext.Provider value={value}>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}>
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

export default App;
