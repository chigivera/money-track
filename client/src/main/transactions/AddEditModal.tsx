"use client";

import { Button, Label, Modal, TextInput, Select } from "flowbite-react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema } from "../../utils/validation";
interface Transaction {
  user_id: string;
  amount: number;
  description?: string;
  category_id: string;
  date: string;
  type: 'expense' | 'income';
}

interface AddEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (transaction: Transaction) => void;
}

export function AddEditModal({ isOpen, onClose, onSubmit }: AddEditModalProps) {
  const { control, handleSubmit, formState: { errors } } = useForm<Transaction>({
    resolver: zodResolver(transactionSchema),
  });

  const onSubmitHandler = (data: Transaction) => {
    onSubmit(data);
    onClose(); // Close the modal after submission
  };

  return (
    <Modal show={isOpen} size="md" onClose={onClose} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">Manage Transaction</h3>
          <div>
            <Label htmlFor="user_id" value="User ID" />
            <Controller
              name="user_id"
              control={control}
              render={({ field }) => (
                <TextInput
                  id="user_id"
                  placeholder="User ID"
                  {...field}
                  required
                  className={errors.user_id ? 'border-red-500' : ''}
                />
              )}
            />
            {errors.user_id && <p className="text-red-500">{errors.user_id.message}</p>}
          </div>
          <div>
            <Label htmlFor="amount" value="Amount" />
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <TextInput
                  id="amount"
                  type="number"
                  placeholder="Amount"
                  {...field}
                  required
                  className={errors.amount ? 'border-red-500' : ''}
                />
              )}
            />
            {errors.amount && <p className="text-red-500">{errors.amount.message}</p>}
          </div>
          <div>
            <Label htmlFor="description" value="Description" />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextInput
                  id="description"
                  placeholder="Description (optional)"
                  {...field}
                  className={errors.description ? 'border-red-500' : ''}
                />
              )}
            />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>
          <div>
            <Label htmlFor="category_id" value="Category ID" />
            <Controller
              name="category_id"
              control={control}
              render={({ field }) => (
                <TextInput
                  id="category_id"
                  placeholder="Category ID"
                  {...field}
                  required
                  className={errors.category_id ? 'border-red-500' : ''}
                />
              )}
            />
            {errors.category_id && <p className="text-red-500">{errors.category_id.message}</p>}
          </div>
          <div>
            <Label htmlFor="date" value="Date" />
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <TextInput
                  id="date"
                  type="date"
                  {...field}
                  required
                  className={errors.date ? 'border-red-500' : ''}
                />
              )}
            />
            {errors.date && <p className="text-red-500">{errors.date.message}</p>}
          </div>
          <div>
            <Label htmlFor="type" value="Transaction Type" />
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select
                  id="type"
                  {...field}
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </Select>
              )}
            />
            {errors.type && <p className="text-red-500">{errors.type.message}</p>}
          </div>
          <div className="w-full">
            <Button onClick={handleSubmit(onSubmitHandler)}>Save Transaction</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
