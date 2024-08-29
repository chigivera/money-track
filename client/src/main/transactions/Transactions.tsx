"use client";

import React, { useEffect, useState } from "react";
import { Pagination, Table, Button, Badge } from "flowbite-react";
import Datepicker from "react-tailwindcss-datepicker";
import { AddEditModal } from "./AddEditModal";
import { DeleteModal } from "./DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  addTransaction,
  editTransaction,
  fetchTransactions,
  importTransaction,
  removeTransaction,
} from "../../store/slice/transactionSlice";
import { fetchCategories } from "../../store/slice/categorySlice";
import { FileUploadModal } from "./FileUploadModal";
export const Transactions: React.FC = () => {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  const dispatch = useDispatch<AppDispatch>();
  const { transactions,total ,loading, error } = useSelector(
    (state: RootState) => state.transaction,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null); // For editing
  const [transactionToDelete, setTransactionToDelete] = useState<any>(null); // For deleting

  useEffect(() => {
    fetchTransactionData();
    dispatch(fetchCategories()); // Fetch categories when the modal opens
  }, [currentPage, value]); // Add `value` as a dependency

  const fetchTransactionData = () => {
    const { startDate, endDate } = value;
    dispatch(
      fetchTransactions({ page: currentPage, limit: 5, startDate, endDate })
    ); // Fetch transactions with pagination and date range
  };
  const totalPages = Math.ceil(total / 5); // Calculate total pages

  const handleValueChange = (newValue: any) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddEditData = () => {
    setSelectedTransaction(null); // Reset for adding a new transaction
    setIsModalOpen(true);
  };

  const handleEdit = (transactionId: string) => {
    const transaction = transactions.find((t) => t._id === transactionId);
    setSelectedTransaction(transaction); // Set the transaction to edit
    setIsModalOpen(true);
  };

  const handleDeleteData = (transactionId: string) => {
    setTransactionToDelete(transactionId); // Set the transaction ID to delete
    setIsDeleteModalOpen(true);
  };

  const handleExportData = () => {
    // Export data functionality
    console.log("Export Data button clicked");
  };

  const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);

  const handleImportData = () => {
    setIsFileUploadOpen(true);
  };

  return (
    <div className="m-2 mt-4">
      <h2 className="mb-2 text-4xl font-bold text-gray-800">Transactions</h2>

      <div className="h-full rounded-lg bg-gray-50 p-6 shadow-md">
        <div className="mb-4 flex justify-between">
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

        <div className="mt-4 overflow-x-auto rounded-lg shadow-lg">
          <Table>
            <Table.Head>
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
              {transactions.length > 0 &&
                transactions.map((transaction, index) => (
                  <Table.Row
                    key={index}
                    className="bg-white transition-colors duration-200 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <Table.Cell>{transaction.amount}</Table.Cell>
                    <Table.Cell>{transaction.description}</Table.Cell>
                    <Table.Cell>
                      <Badge>{transaction.category_id?.name}</Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge>{transaction.category_id?.expenseType}</Badge>
                    </Table.Cell>
                    <Table.Cell>{transaction.date}</Table.Cell>
                    <Table.Cell>
                      <Badge>{transaction.type}</Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                        onClick={() => handleEdit(transaction._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                        onClick={() => handleDeleteData(transaction._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </span>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>

        <div className="mt-6 flex justify-center">
          <Pagination
            layout="pagination"
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      </div>
      {isModalOpen && (
        <AddEditModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={(transaction) => {
            if (selectedTransaction) {
              dispatch(
                editTransaction({
                  transactionId: selectedTransaction._id,
                  transactionData: transaction,
                }),
              );
            } else {
              // If adding a new transaction
              dispatch(addTransaction(transaction));
            }
            setIsModalOpen(false); // Close the modal upon successful submission
          }}
          initialData={selectedTransaction} // Pass the data for editing
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onSubmit={() => {
            if (transactionToDelete) {
              dispatch(removeTransaction(transactionToDelete)); // Dispatch the delete action
            }
            setIsDeleteModalOpen(false); // Close the modal upon successful deletion
          }}
        />
      )}
      {isFileUploadOpen && (
        <FileUploadModal
          isOpen={isFileUploadOpen}
          onClose={() => setIsFileUploadOpen(false)}
          onSubmit={(formData: any) => {
            dispatch(importTransaction(formData));
            setIsFileUploadOpen(false);
          }}
        />
      )}
    </div>
  );
};
