"use client";

import { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import MailSent from '../../components/animations/mail_sent.json';
import MailVerification from '../../components/animations/mail_verified.json';
import PasswordSetup from '../../components/animations/pass.json';
import Lottie from "lottie-react";
import {  useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { register, sendCode, verifyCode } from "../../store/slice/userSlice";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { error } = useSelector((store: RootState) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch type

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send a verification email
    dispatch(sendCode(email));
    if (error) {
      alert(error)
      return
    }
    
    setStep(2); // Move to the verification step
  };

  const handleVerificationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically verify the code
    dispatch(verifyCode({ email: email, pin: verificationCode }));
    console.log("Verification code submitted:", verificationCode);
    if (error) {
      alert(error)
      return
    }
    setStep(3); // Move to the account setup step
  };

  const handleAccountSetupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(register({ email: email, password:password }));
    console.log("Account setup:", { email, password });
   
    navigate('/create-profile')
    // Reset form or navigate to another page
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex items-center justify-between">
            <form onSubmit={handleEmailSubmit} className="mb-4 w-1/2">
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mb-4"
              />
              <Button type="submit" disabled={email.trim() === ""}>
                Next
              </Button>
            </form>
            <div className="flex items-center justify-center w-1/2 pl-4">
              <Lottie animationData={MailSent} loop={true} className="w-64 h-64" />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex items-center justify-between">
            <form onSubmit={handleVerificationSubmit} className="mb-4 w-1/2">
              <div className="mb-2 block">
                <Label htmlFor="verificationCode" value="Enter verification code" />
              </div>
              <TextInput
                id="verificationCode"
                type="text"
                placeholder="123456"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
                className="mb-4"
              />
              <Button type="submit" disabled={verificationCode.trim() === ""}>
                Verify
              </Button>
            </form>
            <div className="flex items-center justify-center w-1/2 pl-4">
              <Lottie animationData={MailVerification} loop={true} className="w-64 h-64" />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex items-center justify-between">
            <form onSubmit={handleAccountSetupSubmit} className="mb-4 w-1/2">
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mb-4"
              />
              <div className="mb-2 block">
                <Label htmlFor="confirmPassword" value="Confirm password" />
              </div>
              <TextInput
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mb-4"
              />
              <Button
                type="submit"
                disabled={password.trim() === "" || confirmPassword.trim() === ""}
              >
                Create Account
              </Button>
            </form>
            <div className="flex items-center justify-center w-1/2 pl-4">
              <Lottie animationData={PasswordSetup} loop={true} className="w-64 h-64" />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex max-w-4xl w-full p-6 shadow-lg bg-white rounded-lg">
        <div className="flex max-w-md flex-col gap-4 w-full">
          <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base mb-8">
            <li className={`flex md:w-full items-center ${step === 1 ? "text-blue-600 dark:text-blue-500" : "text-gray-500 dark:text-gray-400"}`}>
              <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                1. Email
              </span>
            </li>
            <li className={`flex md:w-full items-center ${step === 2 ? "text-blue-600 dark:text-blue-500" : "text-gray-500 dark:text-gray-400"}`}>
              <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                2. Verify
              </span>
            </li>
            <li className={`flex items-center ${step === 3 ? "text-blue-600 dark:text-blue-500" : "text-gray-500 dark:text-gray-400"}`}>
              <span>3. Setup Account</span>
            </li>
          </ol>
          {renderStep()}
        </div>
      </div>
    </div>
  );
}