'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { productSchema } from '@/utils/validationSchemas';
import { PRODUCT_CATEGORIES } from '@/utils/constants';
import { useAddProduct, useUpdateProduct } from '@/hooks/usePharmacy';
import type { Product, ProductFormData } from '@/types';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

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

  const categoryOptions = PRODUCT_CATEGORIES.map(c => ({ value: c, label: c }));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Product' : 'Add New Product'}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          {...register('name')}
          label="Product Info"
          placeholder="Product name"
          error={errors.name?.message}
        />
        <Select
          {...register('category')}
          label="Category"
          options={categoryOptions}
          error={errors.category?.message}
        />
        <Input
          {...register('stock')}
          label="Stock"
          placeholder="Quantity"
          error={errors.stock?.message}
        />
        <Input
          {...register('suppliers')}
          label="Suppliers"
          placeholder="Supplier name"
          error={errors.suppliers?.message}
        />
        <Input
          {...register('price')}
          label="Price"
          placeholder="Price"
          error={errors.price?.message}
        />
        <div className="flex gap-3 pt-2">
          <Button type="submit" isLoading={isPending} className="flex-1">
            {isEditing ? 'Save' : 'Add'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}
