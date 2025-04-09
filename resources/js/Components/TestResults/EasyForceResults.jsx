import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TestResultsBox from '@/Components/TestResultsBox';
import { ClipLoader } from 'react-spinners'; // Import spinnera

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
                console.log(`Dáta z /api/easy-force pre klienta ${clientId}:`, response.data);
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
                            console.error(`Chyba pri načítaní hodnôt testu ${test.id} pre klienta ${clientId}:`, error);
                        })
                );

                Promise.all(promises).then(() => {
                    setLoading(false);
                });
            })
            .catch(error => {
                console.error(`Chyba pri načítaní testov pre klienta ${clientId}:`, error);
                setLoading(false);
            });
    }, [clientId]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('sk-SK');
    };

    const calculateMax = (values, limbId) => {
        const limbValues = values.filter(v => v.id_limb === limbId);
        if (limbValues.length === 0) {
            return '-';
        }
        return Math.max(...limbValues.map(v => v.value));
    };

    const calculateMaxDifference = (values) => {
        const maxLimb3 = calculateMax(values, 3);
        const maxLimb4 = calculateMax(values, 4);

        if (maxLimb3 === '-' || maxLimb4 === '-') {
            return '-';
        }

        return maxLimb4 - maxLimb3;
    };

    const calculatePercentageDifference = (values) => {
        const maxLimb3 = calculateMax(values, 3);
        const maxLimb4 = calculateMax(values, 4);

        if (maxLimb3 === '-' || maxLimb4 === '-') {
            return '-';
        }

        return (100 - (maxLimb3 / maxLimb4 * 100)).toFixed(2) + '%';
    };

    const sortData = (values, column, direction) => {
        if (!column) return values;

        return [...values].sort((a, b) => {
            let valueA = a[column];
            let valueB = b[column];

            if (column === 'value' || column === 'attempt') {
                valueA = parseFloat(valueA);
                valueB = parseFloat(valueB);
            }

            if (direction === 'asc') {
                if (valueA < valueB) return -1;
                if (valueA > valueB) return 1;
            } else {
                if (valueA > valueB) return -1;
                if (valueA < valueB) return 1;
            }
            return 0;
        });
    };

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

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
                            <table className="min-w-full divide-y divide-gray-200 text-xs">
                                <thead>
                                <tr>
                                    <th onClick={() => handleSort('attempt')}
                                        className="px-3 py-2 text-center font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                        Pokus
                                        <span className="ml-1">
                                                {sortColumn === 'attempt' ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}
                                            </span>
                                    </th>
                                    <th onClick={() => handleSort('limb_name')}
                                        className="px-3 py-2 text-center font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                        Končatina
                                        <span className="ml-1">
                                                {sortColumn === 'limb_name' ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}
                                            </span>
                                    </th>
                                    <th onClick={() => handleSort('value')}
                                        className="px-3 py-2 text-center font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                        Hodnota
                                        <span className="ml-1">
                                                {sortColumn === 'value' ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}
                                            </span>
                                    </th>
                                    <th className="px-3 py-2 text-center font-medium text-gray-500 uppercase tracking-wider">Maximum</th>
                                    <th className="px-3 py-2 text-center font-medium text-gray-500 uppercase tracking-wider">Rozdiel</th>
                                    <th className="px-3 py-2 text-center font-medium text-gray-500 uppercase tracking-wider">%
                                        Rozdiel
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {sortData(testValues[test.id], sortColumn, sortDirection).map(value => (
                                    <tr key={value.id}
                                        onMouseEnter={() => setHoveredRowId(value.id)}
                                        onMouseLeave={() => setHoveredRowId(null)}
                                        className={hoveredRowId === value.id ? 'bg-gray-100' : ''}>
                                        <td className="px-3 py-2 whitespace-nowrap text-center">{value.attempt || '-'}</td>
                                        <td className="px-3 py-2 whitespace-nowrap text-center">{value.limb_name}</td>
                                        <td className="px-3 py-2 whitespace-nowrap text-center">{value.value}</td>
                                        <td className="px-3 py-2 whitespace-nowrap text-center">{calculateMax(testValues[test.id], value.id_limb)}</td>
                                        <td className="px-3 py-2 whitespace-nowrap text-center">{calculateMaxDifference(testValues[test.id])}</td>
                                        <td className="px-3 py-2 whitespace-nowrap text-center">{calculatePercentageDifference(testValues[test.id])}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                ))
            )}
        </TestResultsBox>
    );
};

export default EasyForceResults;
