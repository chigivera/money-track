import React, { useEffect, useState } from 'react';
import Bar from '../../components/charts/BarChart';
import { Card } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchTransactions } from '../../store/slice/transactionSlice';
import BarChart from '../../components/charts/BarChart';
import PieChart from '../../components/charts/PieChart';

const Dashboard: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [value, setValue] = useState({
      startDate: null,
      endDate: null,
      budget_id: null,
    });
    const { transactions, loading } = useSelector(
        (state: RootState) => state.transaction,
      );
    useEffect(() => {
        fetchTransactionData();
      }, [dispatch ]);
    const fetchTransactionData = () => {
        const { startDate, endDate, budget_id } = value; // Include budget_id
        dispatch(
          fetchTransactions({
            page: 0,
            limit: 5,
            startDate,
            endDate,
            budget_id,
          }),
        ); // Fetch transactions with pagination, date range, and budget filter
      };
    return (
        <div className='flex flex-wrap'>
            <div className="flex flex-col flex-1  p-2">
                <Card className='text-2xl text-lime-700 font-bold'>Expenses</Card>
                <BarChart totalThisMonth={478.33} transactions={transactions}/>

            </div>
            <div className="flex flex-col-reverse  flex-1  p-2">

            <Card className="mt-4">
  <a className=' text-lime-700 text-xl font-bold p-1   rounded-xs' href="">Go To Transaction </a>
</Card>                
            <PieChart totalThisMonth={478.33} transactions={transactions}/>

            </div>
          
        </div>
    );
};

export default Dashboard;
