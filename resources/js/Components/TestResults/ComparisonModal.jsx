import React, { useState } from 'react';
import SortableTable from '@/Components/SortableTable';

const ComparisonModal = ({ testResults, onClose }) => {
    const [comparisonData, setComparisonData] = useState([]);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [hoveredRowId, setHoveredRowId] = useState(null);

    const handleCompare = () => {
        const comparedData = [];
        const dates = [...new Set(testResults.map(item => item.createdAt))];
        const tests = [...new Set(testResults.map(item => item.testName))];

        tests.forEach(testName => {
            const testData = testResults.filter(item => item.testName === testName);

            if (testData.length === 2) {
                const rozdiel = testData[1].value - testData[0].value;
                const smer = rozdiel > 0 ? '↑ ' : rozdiel < 0 ? '↓ ' : '';

                comparedData.push({
                    kategoria: testData[0].category,
                    nazovTestu: testData[0].testName,
                    hodnota1: testData[0].value,
                    hodnota2: testData[1].value,
                    rozdiel: smer + Math.abs(rozdiel), // Spojíme smer a rozdiel
                    koncatina: testData[0].limbName,
                    prebehlo1: testData[0].createdAt,
                    prebehlo2: testData[1].createdAt,
                });
            }
        });

        setComparisonData(comparedData);
    };

    const columns = [
        { key: 'kategoria', label: 'Kategória' },
        { key: 'nazovTestu', label: 'Názov testu' },
        { key: 'hodnota1', label: 'Hodnota 1' },
        { key: 'hodnota2', label: 'Hodnota 2' },
        { key: 'rozdiel', label: 'Rozdiel' },
        { key: 'koncatina', label: 'Končatina' },
        { key: 'prebehlo1', label: 'Prebehlo 1' },
        { key: 'prebehlo2', label: 'Prebehlo 2' },
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
                )}
            </div>
        </div>
    );
};

export default ComparisonModal;
