// PieChart.tsx
import React from 'react';
import { Pie } from 'react-chartjs-2';

interface PieChartProps {
    data: {
        labels: string[];
        datasets: {
            data: number[];
            backgroundColor: string[];
        }[];
    };
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
    return <Pie data={data} options={{ responsive: true }} />;
};

export default PieChart;
