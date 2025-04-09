import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TestResultsBox from '@/Components/TestResultsBox';
import { ClipLoader } from 'react-spinners';
import SortableTable from '@/Components/SortableTable';
import { sortData } from '@/Utils/SortData';

const EasyForceResults = ({ clientId }) => {
    const [tests, setTests] = useState([]);
    const [testValues, setTestValues] = useState({});
    const [loading, setLoading] = useState(true);
    const [hoveredRowId, setHoveredRowId] = useState(null);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    useEffect(() => {
        axios.get(`/api/easy-force?client_id=${clientId}`)
            .then(response => {
                setTests(response.data);

                const promises = response.data.map(test =>
                    axios.get(`/api/easy-force/${test.id}?client_id=${clientId}`)
                        .then(response => {
                            setTestValues(prevValues => ({
                                ...prevValues,
                                [test.id]: response.data
                            }));
                        })
                        .catch(error => {
                            console.error(`Chyba pri načítaní hodnôt testu ${test.id}:`, error);
                        })
                );

                Promise.all(promises).then(() => {
                    setLoading(false);
                });
            })
            .catch(error => {
                console.error(`Chyba pri načítaní testov:`, error);
                setLoading(false);
            });
    }, [clientId]);

    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('sk-SK');

    const calculateMax = (values, limbId) => {
        const limbValues = values.filter(v => v.id_limb === limbId);
        if (!limbValues.length) return '-';
        return Math.max(...limbValues.map(v => v.value));
    };

    const calculateMaxDifference = (values) => {
        const maxLimb3 = calculateMax(values, 3);
        const maxLimb4 = calculateMax(values, 4);
        if (maxLimb3 === '-' || maxLimb4 === '-') return '-';
        return maxLimb4 - maxLimb3;
    };

    const calculatePercentageDifference = (values) => {
        const maxLimb3 = calculateMax(values, 3);
        const maxLimb4 = calculateMax(values, 4);
        if (maxLimb3 === '-' || maxLimb4 === '-') return '-';
        return (100 - (maxLimb3 / maxLimb4 * 100)).toFixed(2) + '%';
    };

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const columns = [
        { key: 'attempt', label: 'Pokus' },
        { key: 'limb_name', label: 'Končatina' },
        { key: 'value', label: 'Hodnota' },
    ];

    return (
        <TestResultsBox>
            {loading ? (
                <div className="flex justify-center">
                    <ClipLoader size={20} color={'#123abc'} />
                </div>
            ) : (
                tests.map(test => (
                    <div key={test.id} className="mb-4">
                        <h3 className="text-base font-semibold">{test.name} - {formatDate(test.created_at)}</h3>
                        {testValues[test.id] && (
                            <SortableTable
                                data={sortData(testValues[test.id], sortColumn, sortDirection)}
                                columns={columns}
                                sortColumn={sortColumn}
                                sortDirection={sortDirection}
                                onSort={handleSort}
                                hoveredRowId={hoveredRowId}
                                onHover={setHoveredRowId}
                                getRowKey={(row) => row.id}
                                renderExtraCells={(type, row) => {
                                    if (type === 'header') {
                                        return (
                                            <>
                                                <th className="px-3 py-2 text-center font-medium text-gray-500 uppercase tracking-wider">Maximum</th>
                                                <th className="px-3 py-2 text-center font-medium text-gray-500 uppercase tracking-wider">Rozdiel</th>
                                                <th className="px-3 py-2 text-center font-medium text-gray-500 uppercase tracking-wider">% Rozdiel</th>
                                            </>
                                        );
                                    } else if (type === 'row') {
                                        return (
                                            <>
                                                <td className="px-3 py-2 text-center">{calculateMax(testValues[test.id], row.id_limb)}</td>
                                                <td className="px-3 py-2 text-center">{calculateMaxDifference(testValues[test.id])}</td>
                                                <td className="px-3 py-2 text-center">{calculatePercentageDifference(testValues[test.id])}</td>
                                            </>
                                        );
                                    }
                                }}
                            />
                        )}
                    </div>
                ))
            )}
        </TestResultsBox>
    );
};

export default EasyForceResults;
