"use client"
import React, { useState } from 'react';
import { Pagination, Table } from "flowbite-react";
import Datepicker from "react-tailwindcss-datepicker"; 


export const Transactions: React.FC = () => {
  const [value, setValue] = useState({ 
    startDate: null ,
    endDate: null 
    }); 
    const [currentPage, setCurrentPage] = useState(1);

    const handleValueChange = (newValue:any) => {
      console.log("newValue:", newValue); 
      setValue(newValue); 
      } 
    const onPageChange = (page: number) => setCurrentPage(page);

    return (
        <div className="m-2 mt-4">
            <h2 className="text-4xl font-bold mb-2 text-gray-800">Transactions</h2>

        <div className=" p-6 h-full bg-gray-50 rounded-lg shadow-md">
            <div className="w-64">
            <Datepicker 
                value={value} 
                onChange={handleValueChange} 
                displayFormat="DD/MM/YYYY"
              
            />

            </div>

            <div className="overflow-x-auto rounded-lg mt-4 shadow-lg">
                <Table>
                    <Table.Head>
                        <Table.HeadCell>Product Name</Table.HeadCell>
                        <Table.HeadCell>Color</Table.HeadCell>
                        <Table.HeadCell>Category</Table.HeadCell>
                        <Table.HeadCell>Price</Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {[
                            { name: 'Apple MacBook Pro 17"', color: 'Silver', category: 'Laptop', price: '$2999' },
                            { name: 'Microsoft Surface Pro', color: 'White', category: 'Laptop PC', price: '$1999' },
                            { name: 'Magic Mouse 2', color: 'Black', category: 'Accessories', price: '$99' }
                        ].map((product, index) => (
                            <Table.Row key={index} className="bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {product.name}
                                </Table.Cell>
                                <Table.Cell>{product.color}</Table.Cell>
                                <Table.Cell>{product.category}</Table.Cell>
                                <Table.Cell>{product.price}</Table.Cell>
                                <Table.Cell>
                                    <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                        Edit
                                    </a>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>

            <div className="flex justify-center mt-6">
                <Pagination 
                    layout="table" 
                    currentPage={currentPage} 
                    totalPages={100} 
                    onPageChange={onPageChange} 
                    />
            </div>
        </div>
                    </div>
    );
};