import * as yup from 'yup';
import { PRODUCT_CATEGORIES, SUPPLIER_STATUSES } from './constants';

export const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required').trim(),
  password: yup.string().required('Password is required').min(6, 'At least 6 characters'),
});

export const productSchema: yup.ObjectSchema<{
  name: string;
  suppliers: string;
  stock: string;
  price: string;
  category: string;
  photo?: string;
}> = yup.object({
  name: yup.string().required('Product name is required').trim(),
  suppliers: yup.string().required('Supplier is required').trim(),
  stock: yup.string().required('Stock is required'),
  price: yup.string().required('Price is required'),
  category: yup
    .string()
    .required('Category is required')
    .test('valid-category', 'Select a valid category', (val) =>
      val ? (PRODUCT_CATEGORIES as readonly string[]).includes(val) : false
    ),
  photo: yup.string().optional(),
});

export const supplierSchema: yup.ObjectSchema<{
  name: string;
  address: string;
  suppliers: string;
  date: string;
  amount: string;
  status: string;
}> = yup.object({
  name: yup.string().required('Supplier name is required').trim(),
  address: yup.string().required('Address is required').trim(),
  suppliers: yup.string().required('Company is required').trim(),
  date: yup.string().required('Delivery date is required'),
  amount: yup.string().required('Amount is required'),
  status: yup
    .string()
    .required('Status is required')
    .test('valid-status', 'Select a valid status', (val) =>
      val ? (SUPPLIER_STATUSES as readonly string[]).includes(val) : false
    ),
});
