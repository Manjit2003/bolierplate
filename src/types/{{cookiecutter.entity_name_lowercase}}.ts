export interface {{cookiecutter.entity_name}} {
  id: string;
  address1?: string;
  address2?: string;
  avatar?: string;
  balance?: number;
  city?: string;
  country?: string;
  currency?: string;
  email: string;
  hasAcceptedMarketing?: boolean;
  hasDiscount?: boolean;
  isProspect?: boolean;
  isReturning?: boolean;
  isVerified?: boolean;
  name: string;
  phone?: string;
  state?: string;
  totalAmountSpent?: number;
  totalOrders?: number;
  updatedAt?: number;
  vatRate?: number;
  zipCode?: string;
}

export interface {{cookiecutter.entity_name}}Log {
  id: string;
  createdAt: number;
  description: string;
  ip: string;
  method: string;
  route: string;
  status: number;
}

export interface {{cookiecutter.entity_name}}Email {
  id: string;
  description: string;
  createdAt: number;
}

export interface {{cookiecutter.entity_name}}Invoice {
  id: string;
  issueDate: number;
  status: string;
  amount: number;
}
