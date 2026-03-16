export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

// ============ Product ============
export interface Product {
  _id: string;
  photo: string;
  name: string;
  suppliers: string;
  stock: string;
  price: string;
  category: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductFormData {
  name: string;
  suppliers: string;
  stock: string;
  price: string;
  category: string;
  photo?: string;
}

// ============ Customer ============
export interface Customer {
  _id: string;
  image?: string;
  photo?: string;
  name: string;
  email: string;
  spent: string;
  phone: string;
  address: string;
  register_date: string;
}

// ============ Order ============
export interface Order {
  _id: string;
  photo: string;
  name: string;
  address: string;
  products: string;
  price: string;
  status: string;
  order_date: string;
}

// ============ Supplier ============
export interface Supplier {
  _id: string;
  name: string;
  address: string;
  suppliers: string;
  date: string;
  amount: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SupplierFormData {
  name: string;
  address: string;
  suppliers: string;
  date: string;
  amount: string;
  status: string;
}

// ============ Income/Expense ============
export interface IncomeExpense {
  _id: string;
  name: string;
  amount: string;
  type: 'Income' | 'Expense' | 'Error';
}

// ============ Dashboard ============
export interface DashboardData {
  statistics: {
    products: number;
    suppliers: number;
    customers: number;
  };
  recentCustomers: Customer[];
  incomeExpenses: IncomeExpense[];
}

// ============ Paginated Responses ============
export interface PaginatedResponse {
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface ProductsResponse extends PaginatedResponse {
  products: Product[];
}

export interface OrdersResponse extends PaginatedResponse {
  orders: Order[];
}

export interface SuppliersResponse extends PaginatedResponse {
  suppliers: Supplier[];
}

export interface CustomersResponse extends PaginatedResponse {
  customers: Customer[];
}

// ============ Filters ============
export interface ListFilters {
  name?: string;
  page?: number;
  limit?: number;
}
