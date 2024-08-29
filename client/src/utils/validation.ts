import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  email: z.string().email("Invalid email format"),
  verificationCode: z.string().length(6, "Verification code must be 6 digits"),
  password: z.string().min(8, "Password must be at least 8 characters long")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[!@#$%^&*]/, "Password must contain at least one special character"),
  confirmPassword: z.string().min(1, "Confirm password is required"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // This will attach the error to the confirmPassword field
});

export const createProfileSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  city: z.string().optional(),
  country: z.string().optional(),
  zipcode: z.string().optional(),
  phone_number: z.string().optional(),
});


// Define the Zod schema for the Budget model
export const budgetSchema = z.object({
  category_id: z.string().length(24, "Category ID must be a valid ObjectId"), // Assuming ObjectId is a 24-character hex string
  budget_amount: z.string(),
  budgetType: z.enum(['monthly', 'yearly'], {
    required_error: "Budget type is required",
    invalid_type_error: "Budget type must be either 'monthly' or 'yearly'",
  }),
  month_year: z.string().regex(/^\d{4}-\d{2}$/, "Month/Year must be in format YYYY-MM"),
  status: z.enum(['active', 'exceeded', 'completed'], {
    required_error: "Status is required",
    invalid_type_error: "Status must be either 'active', 'exceeded', or 'completed'",
  }),
});


export const transactionSchema = z.object({
  amount: z.string(),
  description: z.string().max(200, "Description cannot exceed 200 characters").optional(),
  category_id: z.string().length(24, "Category ID must be a valid ObjectId"), // Assuming ObjectId is a 24-character hex string
  date: z.date().refine(date => !isNaN(date.getTime()), {
    message: "Date must be a valid date",
  }),
  type: z.enum(['expense', 'income'], {
    required_error: "Transaction type is required",
    invalid_type_error: "Transaction type must be either 'expense' or 'income'",
  }),
});