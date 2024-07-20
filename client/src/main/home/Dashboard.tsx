import React from 'react';
import CCard from '../../components/charts/Card';
import { Card } from 'flowbite-react';

const Dashboard: React.FC = () => {
    const barChartData = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
            {
                label: 'Sales',
                data: [30, 20, 50, 40, 60],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const lineChartData = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
            {
                label: 'Revenue',
                data: [20, 30, 25, 35, 50],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
            },
        ],
    };

    const pieChartData = {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
            {
                data: [12, 19, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                ],
            },
        ],
    };

    return (
        <div className='flex flex-wrap'>
            <div className="flex flex-col flex-1  p-2">
                <Card className='text-2xl text-lime-700 font-bold'>Expenses</Card>
                <CCard balanceAmount={9221.48} totalThisMonth={478.33} percentageChange={2.4} />
                <CCard balanceAmount={9221.48} totalThisMonth={478.33} percentageChange={2.4} />

            </div>
            <div className="flex flex-col-reverse  flex-1  p-2">
            <Card className="mt-4">
  <a className=' bg-lime-700 text-white text-xl font-bold p-1   rounded-xs' href="">Go To Transaction </a>
</Card>                <CCard balanceAmount={9221.48} totalThisMonth={478.33} percentageChange={2.4} />
                <CCard balanceAmount={9221.48} totalThisMonth={478.33} percentageChange={2.4} />

            </div>
          
        </div>
    );
};

export default Dashboard;
