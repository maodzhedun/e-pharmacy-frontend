'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { supplierSchema } from '@/utils/validationSchemas';
import { SUPPLIER_STATUSES } from '@/utils/constants';
import { useAddSupplier, useUpdateSupplier } from '@/hooks/usePharmacy';
import type { Supplier, SupplierFormData } from '@/types';
import Modal from '@/components/ui/Modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  supplier?: Supplier | null;
}

export default function SupplierFormModal({
  isOpen,
  onClose,
  supplier,
}: Props) {
  const isEditing = !!supplier;
  const { mutate: addSupplier, isPending: isAdding } = useAddSupplier();
  const { mutate: updateSupplier, isPending: isUpdating } = useUpdateSupplier();
  const isPending = isAdding || isUpdating;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SupplierFormData>({
    resolver: yupResolver(supplierSchema),
    defaultValues: supplier
      ? {
          name: supplier.name,
          address: supplier.address,
          suppliers: supplier.suppliers,
          date: supplier.date,
          amount: supplier.amount,
          status: supplier.status,
        }
      : {
          name: '',
          address: '',
          suppliers: '',
          date: '',
          amount: '',
          status: 'Active',
        },
  });

  const onSubmit = (data: SupplierFormData) => {
    if (isEditing && supplier) {
      updateSupplier(
        { id: supplier._id, data },
        {
          onSuccess: () => {
            reset();
            onClose();
          },
        }
      );
    } else {
      addSupplier(data, {
        onSuccess: () => {
          reset();
          onClose();
        },
      });
    }
  };

  const title = isEditing ? (
    <>
      <span className="md:hidden">Edit data</span>
      <span className="hidden md:inline">Edit supplier</span>
    </>
  ) : (
    'Add a new suppliers'
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
          <div>
            <input
              {...register('name')}
              placeholder="Suppliers Info"
              className="h-[44px] w-full rounded-full border border-border bg-white px-4 text-sm text-text outline-none placeholder:text-text-light focus:border-primary"
            />
            {errors.name && (
              <p className="mt-1 pl-4 text-xs text-danger">
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <input
              {...register('address')}
              placeholder="Address"
              className="h-[44px] w-full rounded-full border border-border bg-white px-4 text-sm text-text outline-none placeholder:text-text-light focus:border-primary"
            />
            {errors.address && (
              <p className="mt-1 pl-4 text-xs text-danger">
                {errors.address.message}
              </p>
            )}
          </div>
          <div>
            <input
              {...register('suppliers')}
              placeholder="Company"
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
              {...register('date')}
              placeholder="Delivery date"
              className="h-[44px] w-full rounded-full border border-border bg-white px-4 text-sm text-text outline-none placeholder:text-text-light focus:border-primary"
            />
            {errors.date && (
              <p className="mt-1 pl-4 text-xs text-danger">
                {errors.date.message}
              </p>
            )}
          </div>
          <div>
            <input
              {...register('amount')}
              placeholder="Ammount"
              className="h-[44px] w-full rounded-full border border-border bg-white px-4 text-sm text-text outline-none placeholder:text-text-light focus:border-primary"
            />
            {errors.amount && (
              <p className="mt-1 pl-4 text-xs text-danger">
                {errors.amount.message}
              </p>
            )}
          </div>
          <div>
            <select
              {...register('status')}
              className="h-[44px] w-full appearance-none rounded-full border border-border bg-white px-4 text-sm text-text outline-none focus:border-primary"
            >
              <option value="">Status</option>
              {SUPPLIER_STATUSES.map(s => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {errors.status && (
              <p className="mt-1 pl-4 text-xs text-danger">
                {errors.status.message}
              </p>
            )}
          </div>
        </div>

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
