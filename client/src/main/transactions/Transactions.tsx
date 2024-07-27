"use client";

import React, { useState } from 'react';
import { Pagination, Table, Button } from "flowbite-react";
import Datepicker from "react-tailwindcss-datepicker"; 
import { AddEditModal } from './AddEditModal';
import { DeleteModal } from './DeleteModal';

export const Transactions: React.FC = () => {
  const [value, setValue] = useState({ 
    startDate: null,
    endDate: null 
  }); 
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleValueChange = (newValue: any) => {
    console.log("newValue:", newValue); 
    setValue(newValue); 
  };

  const onPageChange = (page: number) => setCurrentPage(page);
  
  const handleAddEditData = () => {
    setIsModalOpen(true);

    // Add data functionality
    console.log("Add Data button clicked");
  };

  const handleImportData = () => {
    // Import data functionality
    console.log("Import Data button clicked");
  };

  const handleExportData = () => {
    // Export data functionality
    console.log("Export Data button clicked");
  };
  const handleDeleteData = () => {
    setIsDeleteModalOpen(true);

    console.log("delete Data Click");

  }
  return (
    <div className="m-2 mt-4">
      <h2 className="text-4xl font-bold mb-2 text-gray-800">Transactions</h2>

      <div className="p-6 h-full bg-gray-50 rounded-lg shadow-md">
        <div className="flex justify-between mb-4">
          <div className="w-64">
            <Datepicker 
              value={value} 
              onChange={handleValueChange} 
              displayFormat="DD/MM/YYYY"
            />
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleAddEditData}>Add Data</Button>
            <Button onClick={handleImportData}>Import Data</Button>
            <Button onClick={handleExportData}>Export Data</Button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg mt-4 shadow-lg">
          <Table>
            <Table.Head>
              <Table.HeadCell>User ID</Table.HeadCell>
              <Table.HeadCell>Amount</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell>Category Name</Table.HeadCell>
              <Table.HeadCell>Category Type</Table.HeadCell>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Type</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Delete</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {[
                { user_id: '12345', amount: 2999, description: 'Apple MacBook Pro', categoryName: 'Laptops', categoryType: 'fixed', date: '2024-01-01', type: 'expense' },
                { user_id: '12346', amount: 1999, description: 'Microsoft Surface Pro', categoryName: 'Laptops', categoryType: 'fixed', date: '2024-01-02', type: 'expense' },
                { user_id: '12347', amount: 99, description: 'Magic Mouse 2', categoryName: 'Accessories', categoryType: 'variable', date: '2024-01-03', type: 'expense' }
              ].map((transaction, index) => (
                <Table.Row key={index} className="bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {transaction.user_id}
                  </Table.Cell>
                  <Table.Cell>{transaction.amount}</Table.Cell>
                  <Table.Cell>{transaction.description}</Table.Cell>
                  <Table.Cell>{transaction.categoryName}</Table.Cell>
                  <Table.Cell>{transaction.categoryType}</Table.Cell>
                  <Table.Cell>{transaction.date}</Table.Cell>
                  <Table.Cell>{transaction.type}</Table.Cell>
                  <Table.Cell>
                    <a onClick={handleAddEditData} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>

                    </a>
                  </Table.Cell>
                  <Table.Cell>
                    <a onClick={handleDeleteData} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>


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
      {isModalOpen && (
      <AddEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(transaction) => {
          console.log('New transaction added:', transaction);
          setIsModalOpen(false); // Close the modal upon successful submission
        }}
      />
    )}
     {isDeleteModalOpen && (
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onSubmit={() => {
          console.log('Data deleted');
          setIsDeleteModalOpen(false); // Close the modal upon successful deletion
        }}
      />
    )}
    </div>
  );
};
