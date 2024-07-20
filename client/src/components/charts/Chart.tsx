// CChart.tsx
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface ChartData {
    labels: string[];
    datasets: {
        backgroundColor: string[];
        data: number[];
        borderRadius: number;
    }[];
}

const CChart: React.FC = () => {
    const [data, setData] = useState<ChartData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const json = [
                { day: 'Mon', amount: 20 },
                { day: 'Tue', amount: 30 },
                { day: 'Wed', amount: 25 },
            ];

            const maxAmount = Math.max(...json.map(x => x.amount));

            setData({
                labels: json.map(x => x.day),
                datasets: [
                    {
                        backgroundColor: json.map(x =>
                            x.amount === maxAmount ? 'hsl(186,34%,60%)' : 'hsl(10,79%,65%)'
                        ),
                        data: json.map(x => x.amount),
                        borderRadius: 5,
                    },
                ],
            });
        };

        fetchData();
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    return <Bar data={data} options={{ responsive: true }} />;
};

export default CChart;
