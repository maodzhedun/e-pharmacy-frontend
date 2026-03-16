import * as yup from 'yup';
import { PRODUCT_CATEGORIES, SUPPLIER_STATUSES } from './constants';

export const loginSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Minimum 6 characters')
    .required('Password is required'),
});

export const productSchema = yup.object({
  name: yup.string().required('Product name is required').trim(),
  suppliers: yup.string().required('Supplier is required').trim(),
  stock: yup.string().required('Stock is required'),
  price: yup.string().required('Price is required'),
  category: yup
    .string()
    .oneOf([...PRODUCT_CATEGORIES], 'Select a valid category')
    .required('Category is required'),
  photo: yup.string().optional(),
});

export const supplierSchema = yup.object({
  name: yup.string().required('Name is required').trim(),
  address: yup.string().required('Address is required').trim(),
  suppliers: yup.string().required('Company is required').trim(),
  date: yup.string().required('Delivery date is required'),
  amount: yup.string().required('Amount is required'),
  status: yup
    .string()
    .oneOf([...SUPPLIER_STATUSES], 'Select a valid status')
    .required('Status is required'),
});
