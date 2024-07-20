// Balance.tsx
import React from 'react';

interface BalanceProps {
    amount: number;
}

const Balance: React.FC<BalanceProps> = ({ amount }) => {
    return (
        <div className="bg-Soft_red flex cardComponent justify-between">
            <div className="flex flex-col">
                <p className="text-Very_pale_orange">My balance</p>
                <p className="text-Very_pale_orange text-3xl font-bold">${amount.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default Balance;
