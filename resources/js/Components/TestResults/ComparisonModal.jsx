import React, { useState } from 'react';
import SortableTable from '@/Components/SortableTable';
import ComparisonChart from "@/Components/GraphicCharts/ComparisonChart.jsx";

const ComparisonModal = ({ testResults, onClose }) => {
    const [comparisonData, setComparisonData] = useState([]);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [hoveredRowId, setHoveredRowId] = useState(null);
    const [showChart, setShowChart] = useState(false);

    const handleCompare = () => {
        const comparedData = [];
        const tests = [...new Set(testResults.map(item => item.testName))];

        tests.forEach(testName => {
            const testData = testResults.filter(item => item.testName === testName);

            if (testData.length > 1 && testData.length <= 5) {
                const row = {
                    kategoria: testData[0].category,
                    nazovTestu: testData[0].testName,
                    koncatina: testData[0].limbName,
                };

                for (let i = 0; i < testData.length; i++) {
                    row[`hodnota${i + 1}`] = testData[i].value;
                    row[`prebehlo${i + 1}`] = testData[i].createdAt;
                }

                for (let i = 1; i < testData.length; i++) {
                    const rozdiel = testData[i].value - testData[i - 1].value;
                    const smer = rozdiel > 0 ? '↑ ' : rozdiel < 0 ? '↓ ' : '';
                    row[`rozdiel${i}`] = smer + Math.abs(rozdiel);
                }

                comparedData.push(row);
            }
        });

        setComparisonData(comparedData);
        setShowChart(true);
    };

    const columns = [
        { key: 'kategoria', label: 'Kategória' },
        { key: 'nazovTestu', label: 'Názov testu' },
        ...Array.from({ length: Math.max(...comparisonData.map(row => Object.keys(row).filter(key => key.startsWith('hodnota')).length)) }, (_, i) => ({
            key: `hodnota${i + 1}`,
            label: `Hodnota ${i + 1}`,
        })),
        ...Array.from({ length: Math.max(...comparisonData.map(row => Object.keys(row).filter(key => key.startsWith('rozdiel')).length)) }, (_, i) => ({
            key: `rozdiel${i + 1}`,
            label: `Rozdiel ${i + 1}`,
        })),
        ...Array.from({ length: Math.max(...comparisonData.map(row => Object.keys(row).filter(key => key.startsWith('prebehlo')).length)) }, (_, i) => ({
            key: `prebehlo${i + 1}`,
            label: `Prebehlo ${i + 1}`,
        })),
    ];

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div className="bg-white rounded-lg p-8">
                <button onClick={handleCompare} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Porovnať</button>
                <button onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Zavrieť</button>

                {comparisonData.length > 0 && (
                    <>
                    <div className="mb-12 mt-16">
                        <SortableTable
                            data={comparisonData}
                            columns={columns}
                            sortColumn={sortColumn}
                            sortDirection={sortDirection}
                            onSort={handleSort}
                            hoveredRowId={hoveredRowId}
                            onHover={setHoveredRowId}
                            getRowKey={(row, index) => `${row.nazovTestu}-${row.koncatina}-${index}`}
                        />
                    </div>
                        {showChart && (
                            <ComparisonChart
                                data={comparisonData.map(row => {
                                    return Object.keys(row)
                                        .filter(key => key.startsWith('hodnota'))
                                        .map(key => row[key]);
                                })}
                                labels={comparisonData.map(row => {
                                    return Object.keys(row)
                                        .filter(key => key.startsWith('prebehlo'))
                                        .map(key => row[key]);
                                })}
                                title="Porovnanie Hodnôt"
                                xAxisLabel="Dátum Testovania"
                                yAxisLabel="Hodnota"
                            />
                        )}
                    </>
                    )}
                    </div>
                    </div>
                    );
};

export default ComparisonModal;
