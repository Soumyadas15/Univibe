"use client"

import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


interface LineChartProps {
    data?: any;
}

const LineChart: React.FC<LineChartProps> = ({
    data,
}) => {
    const [chartData, setChartData] = useState({
        labels: ["ECE", "CSE", "ME", "AUE", "CSE DS", "ECE VLSI"],
        datasets: [
          {
            label: 'Registration by department',
            data: [1, 1, 0, 0, 0, 0, 0],
            borderColor: 'rgb(216, 27, 96)',
            backgroundColor: 'rgb(216, 27, 96)',
            borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
            pointStyle: 'circle',
            pointRadius: 10,
            pointHoverRadius: 15
          },
        ],
      });

      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
        scales: {
            x: {
              grid: {
                display: false
              }
            },
            y: {
              grid: {
                display: false
              }
            }
          },
      };

    return ( 
        <div className="w-full md:col-span-2 h-full p-4 rounded-lg flex items-center justify-center">
            <Line data={chartData} options={options}/>
        </div>
     );
}
 
export default LineChart;