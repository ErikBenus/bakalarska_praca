import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TestResultsBox from '@/Components/TestResultsBox';
import { ClipLoader } from 'react-spinners';
import SortableTable from '@/Components/SortableTable';
import { sortData } from '@/Utils/SortData';

const EasyForceResults = ({ clientId }) => {
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredRowId, setHoveredRowId] = useState(null);

    useEffect(() => {
        axios.get(`/api/easy-force?client_id=${clientId}`)
            .then(response => {
                const processedTests = response.data.map(item => ({
                    ...item.test,
                    values: item.values,
                }));
                setTests(processedTests);
                setLoading(false);
            })
            .catch(error => {
                console.error('Chyba pri načítaní aktuálnych testov:', error);
                setLoading(false);
            });
    }, [clientId]);

    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('sk-SK');

    const calculateMaxForLimb = (values, limbId) => {
        const limbValues = values.filter(v => v.id_limb === limbId);
        if (!limbValues.length) return 0;
        return Math.max(...limbValues.map(v => v.value));
    };

    const calculateFrontalBackDifference = (values, limbId) => {
        const quadMax = calculateMaxForLimb(values, limbId);
        const hamstringMax = calculateMaxForLimb(values, limbId + 2);
        return quadMax - hamstringMax;
    };

    const calculateFrontalBackPercentageDifference = (values, limbId) => {
        const quadMax = calculateMaxForLimb(values, limbId);
        const hamstringMax = calculateMaxForLimb(values, limbId + 2);
        if (quadMax === 0) return 'N/A';
        const percentage = (100 - (hamstringMax / quadMax * 100)).toFixed(2);
        return percentage === 'NaN' ? 'N/A' : percentage + '%';
    };

    const columns = [
        { key: 'attempt', label: 'Pokus' },
        { key: 'limb_name', label: 'Končatina' },
        { key: 'value', label: 'Hodnota' },
    ];

    const frontalBackColumns = [
        { key: 'limb', label: 'Noha' },
        { key: 'difference', label: 'Rozdiel' },
        {
            key: 'percentageDifference',
            label: '% Rozdiel',
            render: (row) => {
                const percentage = parseFloat(row.percentageDifference);
                let className = '';
                if (!isNaN(percentage)) {
                    if (percentage >= 60 && percentage <= 80) {
                        className = 'text-green-500';
                    } else {
                        className = 'text-red-500';
                    }
                }
                return <span className={className}>{row.percentageDifference}</span>;
            },
        },
    ];

    const frontalBackData = (tests) => {
        if (!tests || tests.length === 0) return [];

        let allValues = [];
        tests.forEach(test => {
            if (test.values && test.values.length > 0) {
                allValues = allValues.concat(test.values);
            }
        });
        return [
            {
                limb: 'Pravá',
                difference: calculateFrontalBackDifference(allValues, 3),
                percentageDifference: calculateFrontalBackPercentageDifference(allValues, 3),
            },
            {
                limb: 'Ľavá',
                difference: calculateFrontalBackDifference(allValues, 4),
                percentageDifference: calculateFrontalBackPercentageDifference(allValues, 4),
            },
        ];
    };

    const frontalBackTableData = frontalBackData(tests);

    return (
        <TestResultsBox>
            {loading ? (
                <div className="flex justify-center">
                    <ClipLoader size={20} color={'#123abc'} />
                </div>
            ) : (
                <>
                    {tests.map(test => (
                        <div key={test.id} className="mb-4">
                            <h3 className="text-base font-semibold">{test.name} - {formatDate(test.created_at)}</h3>
                            {test.values && (
                                <SortableTable
                                    data={sortData(test.values)}
                                    columns={columns}
                                    hoveredRowId={hoveredRowId}
                                    onHover={setHoveredRowId}
                                    getRowKey={(row) => row.id}
                                    renderExtraCells={(type, row) => {
                                        if (type === 'header') {
                                            return (
                                                <>
                                                    <th className="px-3 py-2 text-center font-medium text-gray-500 uppercase tracking-wider">Maximum</th>
                                                </>
                                            );
                                        } else if (type === 'row') {
                                            return (
                                                <>
                                                    <td className="px-3 py-2 text-center">{calculateMaxForLimb(test.values, row.id_limb)}</td>
                                                </>
                                            );
                                        }
                                    }}
                                />
                            )}
                        </div>
                    ))}

                    {/* Nová tabuľka pre porovnanie svalových reťazcov */}
                    <div className="mt-8">
                        <h2 className="text-lg font-semibold mb-4">Porovnanie predného a zadného svalového reťazca (dolná končatina)</h2>
                        <SortableTable
                            data={frontalBackTableData}
                            columns={frontalBackColumns}
                            getRowKey={(row) => row.limb}
                        />
                    </div>
                </>
            )}
        </TestResultsBox>
    );
};

export default EasyForceResults;
