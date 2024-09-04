// Card.tsx
import React, { useEffect, useState } from 'react';
import { Card } from 'flowbite-react';
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    ArcElement,
  } from "chart.js";
  ChartJS.register(CategoryScale, LinearScale, ArcElement, Tooltip);

interface ChartData {
  labels: string[];
  datasets: {
    backgroundColor: string[];
    data: number[];
    borderRadius: number;
  }[];
}

interface PieChartProps {
    transactions:any[];
    totalThisMonth:any;
}

const PieChart: React.FC<PieChartProps> = ({transactions,totalThisMonth}) => {
    const [data, setData] = useState<ChartData | null>(null);
    useEffect(() => {
        const fetchData = async () => {
          if (transactions.length === 0) return; // Exit if there are no transactions
    
          const maxAmount = Math.max(...transactions.map((x) => x.amount));
    
          setData({
            labels: transactions.map((x) => x.type),
            datasets: [
              {
                backgroundColor: transactions.map((x) =>
                  x.amount === maxAmount ? "hsl(186,34%,60%)" : "hsl(10,79%,65%)",
                ),
                data: transactions.map((x) => x.amount),
                borderRadius: 5,
              },
            ],
          });
        };
        fetchData();
      }, [transactions]);
    return (
        <Card className="font-sans text-lg p-4 mt-4 font-normal ">
            <div className="bg-Very_pale_orange cardComponent">
            <h1 className="font-bold text-xl text-Dark_brown">
                Spending - Last 7 days
            </h1>
            {data ? <Pie height={'300'} width={"300"} data={data} options={{ responsive: true }} /> : <div>Loading</div>}
            <hr className="border-t-2 border-Cream my-1" />
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <p className="text-Medium_brown">Total this month</p>
                    <p className="text-Dark_brown text-4xl font-bold">${totalThisMonth.toFixed(2)}</p>
                </div>
                <div className="flex flex-col text-right self-end">
                    {/* <p className="font-bold">{percentageChange > 0 ? `+${percentageChange.toFixed(1)}%` : `${percentageChange.toFixed(1)}%`}</p>
                    <p className="">from last month</p> */}
                </div>
            </div>
        </div>
        </Card>
    );
};

export default PieChart;
