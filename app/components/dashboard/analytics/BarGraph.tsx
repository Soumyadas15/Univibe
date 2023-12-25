"use client"

import React, { useEffect, useState } from "react";

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
)

interface BarChartProps{
  data?: any;
}
const BarGraph: React.FC<BarChartProps> = ({
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
      },
    ],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {

    if (data) {
      const labels = Object.keys(data);
      const values = Object.values(data);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Registration by department',
            //@ts-ignore
            data: values,
            borderColor: 'rgb(216, 27, 96)',
            backgroundColor: 'rgb(216, 27, 96)',
            borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
          },
        ],
      });
    }

    setChartOptions({
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
      maintainAspectRatio: false,
      responsive: true,
    })
  }, [])
  return ( 
    <>
      <div className="w-full md:col-span-2 h-full p-4 rounded-lg flex items-center justify-center">
          <Bar data={chartData} options={chartOptions}/>
      </div>
    </>
    
   );
}
 
export default BarGraph;
