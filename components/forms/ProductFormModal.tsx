'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { productSchema } from '@/utils/validationSchemas';
import { PRODUCT_CATEGORIES } from '@/utils/constants';
import { useAddProduct, useUpdateProduct } from '@/hooks/usePharmacy';
import type { Product, ProductFormData } from '@/types';
import Modal from '@/components/ui/Modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
}

export default function ProductFormModal({ isOpen, onClose, product }: Props) {
  const isEditing = !!product;
  const { mutate: addProduct, isPending: isAdding } = useAddProduct();
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();
  const isPending = isAdding || isUpdating;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: yupResolver(productSchema),
    defaultValues: product
      ? {
          name: product.name,
          suppliers: product.suppliers,
          stock: product.stock,
          price: product.price,
          category: product.category,
          photo: product.photo,
        }
      : {
          name: '',
          suppliers: '',
          stock: '',
          price: '',
          category: '',
          photo: '',
        },
  });

  const onSubmit = (data: ProductFormData) => {
    if (isEditing && product) {
      updateProduct(
        { id: product._id, data },
        {
          onSuccess: () => {
            reset();
            onClose();
          },
        }
      );
    } else {
      addProduct(data, {
        onSuccess: () => {
          reset();
          onClose();
        },
      });
    }
  };

  // Mobile: "Edit data" / Desktop: "Edit product"
  const title = isEditing ? (
    <>
      <span className="md:hidden">Edit data</span>
      <span className="hidden md:inline">Edit product</span>
    </>
  ) : (
    'Add a new product'
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 2-col grid on desktop, 1-col on mobile */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
          <div>
            <input
              {...register('name')}
              placeholder="Product Info"
              className="h-[44px] w-full rounded-full border border-border bg-white px-4 text-sm text-text outline-none placeholder:text-text-light focus:border-primary"
            />
            {errors.name && (
              <p className="mt-1 pl-4 text-xs text-danger">
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <select
              {...register('category')}
              className="h-[44px] w-full appearance-none rounded-full border border-border bg-white px-4 text-sm text-text outline-none focus:border-primary"
            >
              <option value="">Category</option>
              {PRODUCT_CATEGORIES.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 pl-4 text-xs text-danger">
                {errors.category.message}
              </p>
            )}
          </div>
          <div>
            <input
              {...register('stock')}
              placeholder="Stock"
              className="h-[44px] w-full rounded-full border border-border bg-white px-4 text-sm text-text outline-none placeholder:text-text-light focus:border-primary"
            />
            {errors.stock && (
              <p className="mt-1 pl-4 text-xs text-danger">
                {errors.stock.message}
              </p>
            )}
          </div>
          <div>
            <input
              {...register('suppliers')}
              placeholder="Suppliers"
              className="h-[44px] w-full rounded-full border border-border bg-white px-4 text-sm text-text outline-none placeholder:text-text-light focus:border-primary"
            />
            {errors.suppliers && (
              <p className="mt-1 pl-4 text-xs text-danger">
                {errors.suppliers.message}
              </p>
            )}
          </div>
          <div>
            <input
              {...register('price')}
              placeholder="Price"
              className="h-[44px] w-full rounded-full border border-border bg-white px-4 text-sm text-text outline-none placeholder:text-text-light focus:border-primary"
            />
            {errors.price && (
              <p className="mt-1 pl-4 text-xs text-danger">
                {errors.price.message}
              </p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            disabled={isPending}
            className="h-[44px] rounded-full bg-primary px-8 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
          >
            {isEditing ? 'Save' : 'Add'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-[44px] rounded-full bg-border-light px-8 text-sm font-medium text-text-secondary transition-colors hover:bg-border"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
