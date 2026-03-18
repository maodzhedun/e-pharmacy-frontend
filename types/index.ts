export interface AuthCredentials {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface DashboardData {
  statistics: {
    products: number;
    suppliers: number;
    customers: number;
  };
  recentCustomers: Customer[];
  incomeExpenses: IncomeExpense[];
}

export interface IncomeExpense {
  type: string;
  name: string;
  amount: string;
}

export interface Order {
  _id: string;
  name: string;
  photo?: string;
  address: string;
  products: number;
  order_date: string;
  price: string;
  status: string;
}

export interface Product {
  _id: string;
  name: string;
  category: string;
  stock: string;
  suppliers: string;
  price: string;
  photo?: string;
}

export interface ProductFormData {
  name: string;
  suppliers: string;
  stock: string;
  price: string;
  category: string;
  photo?: string;
}

export interface Supplier {
  _id: string;
  name: string;
  address: string;
  suppliers: string;
  date: string;
  amount: string;
  status: string;
}

export interface SupplierFormData {
  name: string;
  address: string;
  suppliers: string;
  date: string;
  amount: string;
  status: string;
}

export interface Customer {
  _id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  register_date: string;
  spent?: string;
  image?: string;
  photo?: string;
}

export interface PaginatedResponse<T> {
  [key: string]: T[] | number;
  totalPages: number;
}
