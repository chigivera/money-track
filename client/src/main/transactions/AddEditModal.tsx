import { Button, Label, Modal, TextInput, Select } from "flowbite-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema } from "../../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/slice/categorySlice"; // Adjust the import path as necessary
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
interface Transaction {
  _id: string;
  amount: number;
  description?: string;
  category_id: string;
  date: Date;
  type: "expense" | "income";
}

interface AddEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (transaction: Transaction) => void;
  initialData: Transaction | null; // Allow initialData to be null
}

export function AddEditModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: AddEditModalProps) {
  console.log(initialData);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Transaction>({
    resolver: zodResolver(transactionSchema),
    defaultValues: initialData
      ? {
          ...initialData,
        }
      : undefined,
  });
  const { categories } = useSelector((state: RootState) => state.category); // Adjust the state type as necessary

  const onSubmitHandler = (data: Transaction) => {
    if (initialData) data._id = initialData._id;
    data.amount = Number(data.amount);
    data.date = new Date(data.date);
    onSubmit(data);
    onClose(); // Close the modal after submission
  };
  return (
    <Modal show={isOpen} size="md" onClose={onClose} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Manage Transaction
          </h3>

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
                  className={errors.amount ? "border-red-500" : ""}
                />
              )}
            />
            {errors.amount && (
              <p className="text-red-500">{errors.amount.message}</p>
            )}
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
                  className={errors.description ? "border-red-500" : ""}
                />
              )}
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>
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
          <div>
            <Label htmlFor="date" value="Date" />
            <Controller
              name="date"
              control={control}
              render={({ field: { onChange, value, ...rest } }) => (
                <TextInput
                  id="date"
                  type="date"
                  value={
                    value
                      ? typeof value === typeof Date
                        ? value.toISOString().slice(0, 10)
                        : new Date(value).toISOString().slice(0, 10)
                      : ""
                  }
                  onChange={(event) => {
                    const dateValue = event.target.value; // Get the value from the event
                    onChange(new Date(dateValue)); // Convert to Date and call onChange
                  }}
                  {...rest}
                  required
                  className={errors.date ? "border-red-500" : ""}
                />
              )}
            />
            {errors.date && (
              <p className="text-red-500">{errors.date.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="type" value="Transaction Type" />
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select id="type" {...field}>
                  <option value="">select type</option>
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </Select>
              )}
            />
            {errors.type && (
              <p className="text-red-500">{errors.type.message}</p>
            )}
          </div>
          <div className="w-full">
            <Button onClick={handleSubmit(onSubmitHandler)}>
              Save Transaction
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
