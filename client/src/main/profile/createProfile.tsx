"use client";

import React, { useEffect } from 'react';
import Lottie from 'lottie-react';
import ProfileAnimation from '../../components/animations/make_profile.json';
import {
    Button,
    Label,
    TextInput,
} from "flowbite-react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createProfileSchema } from '../../utils/validation'; // Adjust the import path as necessary
import { createProfile } from '../../store/slice/userSlice';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
interface FormData {
    firstname: string;
    lastname: string;
    city?: string;
    country?: string;
    zipcode?: string;
    phone_number?: string;
}

export default function CreateProfile() {
    const {user, accessToken} = useSelector((store:RootState) => store.user)
    console.log(user,accessToken)
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch type
  
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(createProfileSchema),
    });
    useEffect(() => {
        if (user) {
            if (user.verified) {
                navigate('/');
            } 
        } else {
            navigate('/login');
        }
    }, [user, navigate]); 
    const onSubmit = async(data: FormData) => {
        const combinedData = { ...data, userId: user }; // Combine user ID with form data
   
  if (accessToken) {
    const payload = { userData: combinedData, token: accessToken };
    await dispatch(createProfile(payload)); // Dispatch with the combined payload
    console.log("Profile Data Submitted:", data);
  } else {
    // Handle the case when accessToken is null
    console.error("accessToken is null");
  }
    };
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="flex max-w-4xl w-full p-6 shadow-lg bg-white rounded-lg">
                <div className="flex flex-col gap-4 w-full">
                    <h2 className="text-2xl font-bold mb-4 text-center">Create Your Profile</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="firstname" value="First Name" />
                            <TextInput
                                id="firstname"
                                {...register("firstname", { required: true })}
                                placeholder="John"
                                className={errors.firstname ? 'border-red-500' : ''}
                            />
                            {errors.firstname && <span className="text-red-500">First name is required</span>}
                        </div>
                        <div>
                            <Label htmlFor="lastname" value="Last Name" />
                            <TextInput
                                id="lastname"
                                {...register("lastname", { required: true })}
                                placeholder="Doe"
                                className={errors.lastname ? 'border-red-500' : ''}
                            />
                            {errors.lastname && <span className="text-red-500">Last name is required</span>}
                        </div>
                        <div>
                            <Label htmlFor="city" value="City" />
                            <TextInput
                                id="city"
                                {...register("city")}
                                placeholder="New York"
                            />
                        </div>
                        <div>
                            <Label htmlFor="country" value="Country" />
                            <TextInput
                                id="country"
                                {...register("country")}
                                placeholder="USA"
                            />
                        </div>
                        <div>
                            <Label htmlFor="zipcode" value="Zip Code" />
                            <TextInput
                                id="zipcode"
                                {...register("zipcode")}
                                placeholder="10001"
                            />
                        </div>
                        <div>
                            <Label htmlFor="phone_number" value="Phone Number" />
                            <TextInput
                                id="phone_number"
                                {...register("phone_number")}
                                placeholder="(123) 456-7890"
                            />
                        </div>
                        <div className="col-span-1 md:col-span-3">
                            <Button type="submit" className="w-full">
                                Create Profile
                            </Button>
                        </div>
                    </form>
                </div>
                <div className="flex items-center justify-center w-1/2 pl-4">
                    <Lottie animationData={ProfileAnimation} loop={true} className="w-64 h-64" />
                </div>
            </div>
        </div>
    );
}
