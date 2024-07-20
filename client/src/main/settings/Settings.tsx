"use client"
import React from 'react';
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";

export const Settings: React.FC = () => {
    return (
        <div className="m-2 mt-4">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Settings</h2>

            <div className="p-6 h-full bg-gray-50 rounded-lg shadow-md flex">
                <div className="w-1/4">
                    <ul className="flex flex-col space-y-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                        <li>
                            <a href="#" className="flex items-center px-4 py-3 text-white bg-blue-700 rounded-lg active dark:bg-blue-600" aria-current="page">
                                <HiUserCircle className="w-4 h-4 mr-2" />
                                Profile
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                <MdDashboard className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                <HiAdjustments className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                                Settings
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                <HiClipboardList className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                                Contacts
                            </a>
                        </li>
                        <li>
                            <a className="flex items-center px-4 py-3 text-gray-400 rounded-lg cursor-not-allowed bg-gray-50 w-full dark:bg-gray-800 dark:text-gray-500">
                                <svg className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                                </svg>
                                Disabled
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="w-3/4 p-4 bg-white rounded-lg shadow-inner">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Profile Tab</h3>
                    <p className="mb-2">This is some placeholder content for the Profile tab's associated content. Clicking another tab will toggle the visibility of this one for the next.</p>
                    <p>The tab JavaScript swaps classes to control the content visibility and styling.</p>
                </div>
            </div>
        </div>
    );
};
