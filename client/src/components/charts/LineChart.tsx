// LineChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';

interface LineChartProps {
    data: {
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            borderColor: string;
            backgroundColor: string;
            fill: boolean;
        }[];
    };
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
    return <Line data={data} options={{ responsive: true }} />;
};

export default LineChart;
