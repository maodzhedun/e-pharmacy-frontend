'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { supplierSchema } from '@/utils/validationSchemas';
import { SUPPLIER_STATUSES } from '@/utils/constants';
import { useAddSupplier, useUpdateSupplier } from '@/hooks/usePharmacy';
import type { Supplier, SupplierFormData } from '@/types';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

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

  const statusOptions = SUPPLIER_STATUSES.map(s => ({ value: s, label: s }));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Supplier' : 'Add New Supplier'}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          {...register('name')}
          label="Suppliers Info"
          placeholder="Supplier name"
          error={errors.name?.message}
        />
        <Input
          {...register('address')}
          label="Address"
          placeholder="Address"
          error={errors.address?.message}
        />
        <Input
          {...register('suppliers')}
          label="Company"
          placeholder="Company name"
          error={errors.suppliers?.message}
        />
        <Input
          {...register('date')}
          label="Delivery date"
          placeholder="e.g. September 19, 2023"
          error={errors.date?.message}
        />
        <Input
          {...register('amount')}
          label="Amount"
          placeholder="Amount"
          error={errors.amount?.message}
        />
        <Select
          {...register('status')}
          label="Status"
          options={statusOptions}
          error={errors.status?.message}
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
