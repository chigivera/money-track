// Card.tsx
import React from 'react';
import Balance from './Balance';
import Statistic from './Statistic';
import { Card } from 'flowbite-react';

interface CardProps {
    balanceAmount: number;
    totalThisMonth: number;
    percentageChange: number;
}

const CCard: React.FC<CardProps> = ({ balanceAmount, totalThisMonth, percentageChange }) => {
    return (
        <Card className="font-sans text-lg p-4 mt-4 font-normal ">
            <Balance amount={balanceAmount} />
            <div >
                <Statistic totalThisMonth={totalThisMonth} percentageChange={percentageChange} />
            </div>
        </Card>
    );
};

export default CCard;
