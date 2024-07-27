"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { fetchUserProfile } from "../../store/slice/userSlice";


export default function Profile() {
  const { accessToken,profile } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch<AppDispatch>(); 

useEffect(() => {
  if (accessToken) {
    dispatch(fetchUserProfile(accessToken)).unwrap()
      .then(profile => {
        console.log('Profile fetched:', profile);
      })
      .catch(error => {
        console.error('Failed to fetch profile:', error);
      });
  }
}, [dispatch, accessToken]);

if (!profile) {
  return <div>Loading profile...</div>; // Or any loading indicator
}
  return (
    <div className="h-full bg-white dark:bg-black">
      <div className="flex flex-col items-start p-10">
        <img
          alt="User profile"
          height="96"
          src="https://thispersondoesnotexist.com/"
          width="96"
          className="mb-3 rounded-full shadow-lg"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{profile.profile.firstname} {profile.profile.lastname}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
        
        {/* Financial Portfolio Section */}
          <h5 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">Financial Portfolio</h5>
          <div className="flex flex-col">
            <p className="text-sm text-gray-500 dark:text-gray-400">Current Balance: <span className="font-medium text-gray-900 dark:text-white">$25,000</span></p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Investments: <span className="font-medium text-gray-900 dark:text-white">$15,000</span></p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Annual Return: <span className="font-medium text-gray-900 dark:text-white">8%</span></p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Transactions: <span className="font-medium text-gray-900 dark:text-white">150</span></p>
          </div>
          <div className="mt-4 flex space-x-3 lg:mt-6">
      
            <a
              href="#"
              className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              View Transactions
            </a>
          </div>
        
      </div>
    </div>
  );
}
