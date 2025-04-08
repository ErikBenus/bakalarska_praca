import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TestResultsBox from '@/Components/TestResultsBox';
import { ClipLoader } from 'react-spinners'; // Import spinnera

const EasyForceResults = ({ clientId }) => {
    const [tests, setTests] = useState([]);
    const [testValues, setTestValues] = useState({});
    const [loading, setLoading] = useState(true);

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
    }, [clientId]); // clientId ako závislosť useEffect

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

    return (
        <TestResultsBox>
            {loading ? (
                <div className="flex justify-center">
                    <ClipLoader size={20} color={'#123abc'} />
                </div>
            ) : (
                tests.map(test => (
                    <div key={test.id} className="mb-4">
                        <h3 className="text-lg font-semibold">{test.name} - {formatDate(test.created_at)}</h3>
                        {testValues[test.id] && (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pokus</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Končatina</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hodnota</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Maximum</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rozdiel</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Rozdiel</th>
                                </tr>
                                </thead>
                                <tbody>
                                {testValues[test.id].map(value => (
                                    <tr key={value.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{value.attempt || '-'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{value.limb_name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{value.value}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{calculateMax(testValues[test.id], value.id_limb)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{calculateMaxDifference(testValues[test.id])}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{calculatePercentageDifference(testValues[test.id])}</td>
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
