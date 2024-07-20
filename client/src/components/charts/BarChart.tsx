// BarChart.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';

interface BarChartProps {
    data: {
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            backgroundColor: string[];
        }[];
    };
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
    return <Bar data={data} options={{ responsive: true }} />;
};

export default BarChart;
