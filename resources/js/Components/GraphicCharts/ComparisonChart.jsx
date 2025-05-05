import React, {useEffect, useRef, useState} from 'react';
import {Bar} from 'react-chartjs-2';
import {Chart, registerables} from 'chart.js';

Chart.register(...registerables);

const ComparisonChart = ({data, labels, title, xAxisLabel, yAxisLabel}) => {
    const [chartData, setChartData] = useState(null);
    const chartColors = useRef([]);

    useEffect(() => {
        if (data && labels) {
            if (chartColors.current.length === 0) {
                chartColors.current = data.map(() => ({
                    backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
                    borderColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`,
                }));
            }


            const datasets = data.map((dataset, index) => ({
                label: `Nameraná hodnota ${index + 1}`,
                data: dataset,
                backgroundColor: chartColors.current[index].backgroundColor,
                borderColor: chartColors.current[index].borderColor,
                borderWidth: 1,
            }));


            const xAxisLabels = labels[0];

            const generatedChartData = {
                labels: xAxisLabels,
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

    return <Bar data={chartData} options={options}/>;
};

export default ComparisonChart;
