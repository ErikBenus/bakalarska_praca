import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const ComparisonChart = ({ data, labels, title, xAxisLabel, yAxisLabel }) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (data && labels) {
            const generatedChartData = {
                labels: labels[0],
                datasets: data.map((dataset, index) => ({
                    label: "Nameraná hodnota",
                    data: dataset,
                    backgroundColor: `rgba(54, 162, 235, 0.5)`,
                    borderColor: `rgba(54, 162, 235, 1)`,
                    borderWidth: 1,
                })),
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

    return <Bar data={chartData} options={options} />;
};

export default ComparisonChart;
