import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const MaxPowerChart = ({ data, labels, title, xAxisLabel, yAxisLabel }) => {
    const [chartData, setChartData] = useState(null);
    const chartColors = useRef([]);

    useEffect(() => {
        if (data && labels) {
            if (chartColors.current.length === 0) {
                chartColors.current = data.map(() => ({
                    borderColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`,
                    pointBackgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(255, 99, 132)',
                }));
            }

            const datasets = data.map((dataset, index) => ({
                label: `Nameraná hodnota ${index + 1}`,
                data: dataset.map((value, valueIndex) => ({
                    x: labels[index][valueIndex],
                    y: value,
                })),
                borderColor: chartColors.current[index].borderColor,
                backgroundColor: 'transparent',
                pointBackgroundColor: chartColors.current[index].pointBackgroundColor,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(255, 99, 132)',
                fill: false,
                pointRadius: 5, // Zväčšenie veľkosti bodov
                pointHoverRadius: 7, // Zväčšenie veľkosti bodov pri hoveri
                pointHitRadius: 10, // Zväčšenie hit radiusu pre lepšiu interakciu
            }));

            const generatedChartData = {
                datasets: datasets,
            };
            setChartData(generatedChartData);
        }
    }, [data, labels]);

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: yAxisLabel,
                },
            },
            x: {
                title: {
                    display: true,
                    text: xAxisLabel,
                },
            },
        },
    };

    if (!chartData) {
        return null;
    }

    return <Line data={chartData} options={options} />;
};

export default MaxPowerChart;
