
export type UserRole = 'Owner' | 'Admin' | 'Operator' | 'Finance';

export interface Workspace {
  id: string;
  name: string;
  logo: string;
  role: UserRole;
  status: 'active' | 'pending_kyc' | 'suspended';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface SettlementOrder {
  id: string;
  productName: string;
  amount: number;
  date: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
}
