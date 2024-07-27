import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import FinanceAnimation from '../../components/animations/Animation - 1721492035967.json';
import Lottie from "lottie-react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../utils/validation'; // Adjust the import path as necessary
import { login } from "../../store/slice/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { Link, useNavigate } from "react-router-dom";
interface FormData {
  email: string;
  password: string;
}

export function Login() {
  const dispatch = useDispatch<AppDispatch>(); 
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  
  const onSubmit = async (data: FormData) => {
    try {
      // Dispatch the login action with the form data
      await dispatch(login(data)); // Assuming login is a thunk or action creator
      console.log("Login successful");
      // Handle successful login (e.g., redirect or show a success message)
      navigate("/create-profile")
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error (e.g., show error message)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex max-w-4xl w-full p-6 shadow-lg">
        <div className="flex-1 pr-4">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <div className="mb-2">
                <Label htmlFor="email" value="Your email" className="font-medium text-gray-700" />
              </div>
              <TextInput
                id="email"
                {...register("email", { required: true })}
                type="email"
                placeholder="name@example.com"
              />
            </div>
            <div>
              <div className="mb-2">
                <Label htmlFor="password" value="Your password" className="font-medium text-gray-700" />
              </div>
              <TextInput
                id="password"
                {...register("password", { required: true })}
                type="password"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-gray-700">Remember me</Label>
              </div>
              <a href="#" className="text-lime-600 text-xs block hover:underline">Forgot password?</a>
            </div>
            <Button type="submit" className="bg-lime-600   hover:bg-lime-700 text-white font-medium">
              Login
            </Button>
          </form>
          <div className="mt-4 flex justify-center">
            <p className="text-gray-700">Don't have an account? <Link  to="/register" className="text-lime-600 block hover:underline">Sign up</Link></p>
          </div>
        </div>

        <div className="flex items-center justify-center w-1/2 pl-4">
          <Lottie animationData={FinanceAnimation} loop={true} className="w-64 h-64" />
        </div>
      </div>
    </div>
  );
}
