import React, { useState } from 'react';
import SortableTable from '@/Components/SortableTable';

const ComparisonModal = ({ testResults, onClose }) => {
    const [comparisonData, setComparisonData] = useState([]);

    const handleCompare = () => {
        const comparedData = [];
        const dates = [...new Set(testResults.map(item => item.createdAt))];
        const tests = [...new Set(testResults.map(item => item.testName))];

        tests.forEach(testName => {
            dates.forEach((date, index) => {
                const testData = testResults.filter(item => item.testName === testName && item.createdAt === date);

                testData.forEach(data => {
                    const otherData = dates
                        .filter((otherDate, otherIndex) => otherIndex !== index)
                        .map(otherDate => testResults.find(item => item.testName === testName && item.createdAt === otherDate && item.limbName === data.limbName));

                    const differences = otherData.map(other => other ? data.value - other.value : null);

                    comparedData.push({
                        date: date,
                        testName: testName,
                        limbName: data.limbName,
                        value: data.value,
                        ...differences.reduce((acc, diff, diffIndex) => ({
                            ...acc,
                            [`difference_${dates.filter((otherDate, otherIndex) => otherIndex !== index)[diffIndex]}`]: diff,
                        }), {}),
                    });
                });
            });
        });

        setComparisonData(comparedData);
    };

    const dates = [...new Set(testResults.map(item => item.createdAt))];

    const columns = [
        { key: 'date', label: 'Dátum' },
        { key: 'testName', label: 'Názov testu' },
        { key: 'limbName', label: 'Končatina' },
        { key: 'value', label: 'Hodnota' },
        ...dates.filter((_, index) => index !== 0).map(date => ({ key: `difference_${date}`, label: `Rozdiel (${date})` })),
    ];

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div className="bg-white rounded-lg p-8">
                <button onClick={handleCompare} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Porovnať</button>
                <button onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Zavrieť</button>

                {comparisonData.length > 0 && (
                    <SortableTable
                        data={comparisonData}
                        columns={columns}
                        getRowKey={(row) => `${row.date}-${row.testName}-${row.limbName}`}
                    />
                )}
            </div>
        </div>
    );
};

export default ComparisonModal;
