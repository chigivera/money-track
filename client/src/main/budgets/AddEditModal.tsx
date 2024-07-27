
"use client";

import { Button, Label, Modal, TextInput, Select } from "flowbite-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { budgetSchema } from "../../utils/validation";



interface Budget {
    user_id: string;
    category_id: string;
    budget_amount: number;
    budgetType: 'monthly' | 'yearly';
    month_year: string; // Format: YYYY-MM
    status: 'active' | 'exceeded' | 'completed';
  }
  
  interface AddEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (budget: Budget) => void;
  }
  
  export function AddEditModal({ isOpen, onClose, onSubmit }: AddEditModalProps) {
    const { control, handleSubmit, formState: { errors } } = useForm<Budget>({
      resolver: zodResolver(budgetSchema),
    });
  
    const onSubmitHandler = (data: Budget) => {
      onSubmit(data);
      onClose(); // Close the modal after submission
    };
  
    return (
      <Modal show={isOpen} size="md" onClose={onClose} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Manage Budget</h3>
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
              <Label htmlFor="budget_amount" value="Budget Amount" />
              <Controller
                name="budget_amount"
                control={control}
                render={({ field }) => (
                  <TextInput
                    id="budget_amount"
                    type="number"
                    placeholder="Budget Amount"
                    {...field}
                    required
                    className={errors.budget_amount ? 'border-red-500' : ''}
                  />
                )}
              />
              {errors.budget_amount && <p className="text-red-500">{errors.budget_amount.message}</p>}
            </div>
            <div>
              <Label htmlFor="budgetType" value="Budget Type" />
              <Controller
                name="budgetType"
                control={control}
                render={({ field }) => (
                  <Select
                    id="budgetType"
                    {...field}
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </Select>
                )}
              />
              {errors.budgetType && <p className="text-red-500">{errors.budgetType.message}</p>}
            </div>
            <div>
              <Label htmlFor="month_year" value="Month/Year (YYYY-MM)" />
              <Controller
                name="month_year"
                control={control}
                render={({ field }) => (
                  <TextInput
                    id="month_year"
                    placeholder="YYYY-MM"
                    {...field}
                    required
                    className={errors.month_year ? 'border-red-500' : ''}
                  />
                )}
              />
              {errors.month_year && <p className="text-red-500">{errors.month_year.message}</p>}
            </div>
            <div>
              <Label htmlFor="status" value="Status" />
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    id="status"
                    {...field}
                  >
                    <option value="active">Active</option>
                    <option value="exceeded">Exceeded</option>
                    <option value="completed">Completed</option>
                  </Select>
                )}
              />
              {errors.status && <p className="text-red-500">{errors.status.message}</p>}
            </div>
            <div className="w-full">
              <Button onClick={handleSubmit(onSubmitHandler)}>Save Budget</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }