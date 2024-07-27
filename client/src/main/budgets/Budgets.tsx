"use client";

import React, { useState } from 'react';
import { Pagination, Table, Button } from "flowbite-react";
import Datepicker from "react-tailwindcss-datepicker"; 
import { AddEditModal } from './AddEditModal'; // Adjust the import path as necessary
import { DeleteModal } from './DeleteModal'; // Adjust the import path as necessary
interface Budget {
  user_id: string;
  category_id: string;
  budget_amount: number;
  budgetType: string;
  month_year: string;
  status: string;
}
export const Budgets: React.FC = () => {
  const [value, setValue] = useState({ 
    startDate: null,
    endDate: null 
  }); 
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddEditModalOpen, setAddEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
  
  const handleValueChange = (newValue: any) => {
    console.log("newValue:", newValue); 
    setValue(newValue); 
  };

  const onPageChange = (page: number) => setCurrentPage(page);

  const handleAddData = () => {
    setAddEditModalOpen(true);
  };

  const handleImportData = () => {
    console.log("Import Data button clicked");
  };

  const handleExportData = () => {
    console.log("Export Data button clicked");
  };

  const handleDeleteBudget = (budget:Budget) => {
    setSelectedBudget(budget);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // Logic to delete the selected budget
    console.log("Deleted budget:", selectedBudget);
    setDeleteModalOpen(false);
    setSelectedBudget(null); // Clear the selected budget
  };

  return (
    <div className="m-2">
      <h2 className="text-4xl font-bold mb-2 text-gray-800">Budgets</h2>

      <div className="p-6 h-full bg-gray-50 rounded-lg shadow-md">
        <div className="flex justify-between mb-4">
          <div className="w-64">
            <Datepicker 
              value={value} 
              onChange={handleValueChange} 
              displayFormat="DD/MM/YYYY"
            />
          </div>
          <div className="space-x-2">
            <Button onClick={handleAddData}>Add Data</Button>
            <Button onClick={handleImportData}>Import Data</Button>
            <Button onClick={handleExportData}>Export Data</Button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg mt-4 shadow-lg">
          <Table>
            <Table.Head>
              <Table.HeadCell>User ID</Table.HeadCell>
              <Table.HeadCell>Category ID</Table.HeadCell>
              <Table.HeadCell>Budget Amount</Table.HeadCell>
              <Table.HeadCell>Budget Type</Table.HeadCell>
              <Table.HeadCell>Month/Year</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Delete</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {[
                { user_id: '12345', category_id: '67890', budget_amount: 500, budgetType: 'monthly', month_year: '2024-01', status: 'active' },
                { user_id: '12346', category_id: '67891', budget_amount: 1000, budgetType: 'yearly', month_year: '2024-01', status: 'active' },
                { user_id: '12347', category_id: '67892', budget_amount: 200, budgetType: 'monthly', month_year: '2024-02', status: 'exceeded' }
              ].map((budget, index) => (
                <Table.Row key={index} className="bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {budget.user_id}
                  </Table.Cell>
                  <Table.Cell>{budget.category_id}</Table.Cell>
                  <Table.Cell>{budget.budget_amount}</Table.Cell>
                  <Table.Cell>{budget.budgetType}</Table.Cell>
                  <Table.Cell>{budget.month_year}</Table.Cell>
                  <Table.Cell>{budget.status}</Table.Cell>
                  <Table.Cell>
                    <Button onClick={() => setAddEditModalOpen(true)} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                      Edit
                    </Button>
                  </Table.Cell>
                  <Table.Cell>
                    <Button onClick={() => handleDeleteBudget(budget)} className="font-medium text-red-600 hover:underline dark:text-red-500">
                      Delete
                    </Button>
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

      {/* Add/Edit Modal */}
      <AddEditModal 
        isOpen={isAddEditModalOpen} 
        onClose={() => setAddEditModalOpen(false)} 
        onSubmit={(budget) => {
          console.log("Submitted budget:", budget);
          setAddEditModalOpen(false);
        }} 
      />

      {/* Delete Modal */}
      <DeleteModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setDeleteModalOpen(false)} 
        onSubmit={confirmDelete} 
      />
    </div>  
  );
};
