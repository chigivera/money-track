"use client";

import { Button, Label, Modal, TextInput, Select } from "flowbite-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { budgetSchema } from "../../utils/validation";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface Budget {
  _id: string;
  category_id: string;
  budget_amount: number;
  budgetType: "monthly" | "yearly";
  month_year: string; // Format: YYYY-MM
  status: "active" | "exceeded" | "completed";
}

interface AddEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (budget: Budget) => void;
  initialData: Budget | null; // Allow initialData to be null
}

export function AddEditModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: AddEditModalProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Budget>({
    resolver: zodResolver(budgetSchema),
    defaultValues: initialData ? { ...initialData } : undefined, // Set default values if initialData is provided
  });
  const { categories } = useSelector((state: RootState) => state.category); // Adjust the state type as necessary

  const onSubmitHandler = (data: Budget) => {
    if (initialData) data._id = initialData._id; // Preserve user_id if editing
    data.budget_amount = Number(data.budget_amount);
    onSubmit(data);
    onClose(); // Close the modal after submission
  };

  return (
    <Modal show={isOpen} size="md" onClose={onClose} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Manage Budget
          </h3>
          {/* Category ID Input */}
          <div>
            <Label htmlFor="category_id" value="Category" />
            <Controller
              name="category_id"
              control={control}
              render={({ field: { onChange, value, ref, ...rest } }) => (
                <Select
                  id="category_id"
                  value={value || ""} // Ensure the value is controlled
                  onChange={(event) => {
                    const selectedValue = event.target.value;
                    onChange(selectedValue); // Update the form state with the selected category ID
                  }}
                  required
                  className={errors.category_id ? "border-red-500" : ""}
                  ref={ref} // Pass the ref for accessibility
                  {...rest}
                >
                  <option value="">Select a category</option>
                  {categories.map((category: { _id: string; name: string }) => (
                    <option key={category._id} value={category._id}>
                      {" "}
                      {/* Use category._id here */}
                      {category.name}
                    </option>
                  ))}
                </Select>
              )}
            />
            {errors.category_id && (
              <p className="text-red-500">{errors.category_id.message}</p>
            )}
          </div>

          {/* Budget Amount Input */}
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
                  className={errors.budget_amount ? "border-red-500" : ""}
                />
              )}
            />
            {errors.budget_amount && (
              <p className="text-red-500">{errors.budget_amount.message}</p>
            )}
          </div>

          {/* Budget Type Input */}
          <div>
            <Label htmlFor="budgetType" value="Budget Type" />
            <Controller
              name="budgetType"
              control={control}
              render={({ field }) => (
                <Select id="budgetType" {...field}>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </Select>
              )}
            />
            {errors.budgetType && (
              <p className="text-red-500">{errors.budgetType.message}</p>
            )}
          </div>

          {/* Month/Year Input */}
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
                  className={errors.month_year ? "border-red-500" : ""}
                />
              )}
            />
            {errors.month_year && (
              <p className="text-red-500">{errors.month_year.message}</p>
            )}
          </div>

          {/* Status Input */}
          <div>
            <Label htmlFor="status" value="Status" />
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select id="status" {...field}>
                  <option value="active">Active</option>
                  <option value="exceeded">Exceeded</option>
                  <option value="completed">Completed</option>
                </Select>
              )}
            />
            {errors.status && (
              <p className="text-red-500">{errors.status.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="w-full">
            <Button onClick={handleSubmit(onSubmitHandler)}>Save Budget</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
