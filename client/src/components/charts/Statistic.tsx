// Statistic.tsx
import React from 'react';
import CChart from './Chart';

interface StatisticProps {
    totalThisMonth: number;
    percentageChange: number;
}

const Statistic: React.FC<StatisticProps> = ({ totalThisMonth, percentageChange }) => {
    return (
        <div className="bg-Very_pale_orange cardComponent">
            <h1 className="font-bold text-xl text-Dark_brown">
                Spending - Last 7 days
            </h1>
            <CChart />
            <hr className="border-t-2 border-Cream my-1" />
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <p className="text-Medium_brown">Total this month</p>
                    <p className="text-Dark_brown text-4xl font-bold">${totalThisMonth.toFixed(2)}</p>
                </div>
                <div className="flex flex-col text-right self-end">
                    <p className="font-bold">{percentageChange > 0 ? `+${percentageChange.toFixed(1)}%` : `${percentageChange.toFixed(1)}%`}</p>
                    <p className="">from last month</p>
                </div>
            </div>
        </div>
    );
};

export default Statistic;
