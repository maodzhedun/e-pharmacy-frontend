export const PRODUCT_CATEGORIES = [
  'Medicine',
  'Head',
  'Hand',
  'Heart',
  'Leg',
  'Dental Care',
  'Skin Care',
  'Eye Care',
  'Vitamins & Supplements',
  'Orthopedic Products',
  'Baby Care',
] as const;

export const ORDER_STATUSES = [
  'Completed',
  'Confirmed',
  'Pending',
  'Cancelled',
  'Processing',
  'Shipped',
  'Delivered',
] as const;

export const SUPPLIER_STATUSES = ['Active', 'Deactive'] as const;

export const BREAKPOINTS = {
  mobile: 375,
  tablet: 768,
  desktop: 1440,
} as const;

export const ITEMS_PER_PAGE = 5;
