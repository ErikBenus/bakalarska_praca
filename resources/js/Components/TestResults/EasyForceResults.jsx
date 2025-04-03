import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TestResultsBox from '@/Components/TestResultsBox';

const EasyForceResults = () => {
    const [tests, setTests] = useState([]);
    const [testValues, setTestValues] = useState({});

    useEffect(() => {
        axios.get('/api/easy-force')
            .then(response => {
                console.log("Dáta z /api/easy-force:", response.data);
                setTests(response.data);
            })
            .catch(error => {
                console.error("Chyba pri načítaní testov:", error);
            });
    }, []);

    const fetchTestValues = (testId) => {
        axios.get(`/api/easy-force/${testId}`)
            .then(response => {
                console.log("Dáta z /api/easy-force/${testId}:", response.data);
                setTestValues({ ...testValues, [testId]: response.data });
            })
            .catch(error => {
                console.error("Chyba pri načítaní hodnôt testu:", error);
            });
    };

    return (
        <TestResultsBox title="Easy Force">
            {tests.map(test => (
                <div key={test.id} className="mb-4">
                    <h3 className="text-lg font-semibold">{test.name} - {test.created_at}</h3>
                    <button onClick={() => fetchTestValues(test.id)}>Zobraziť výsledky</button>
                    {testValues[test.id] && (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pokus</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Končatina</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hodnota</th>
                            </tr>
                            </thead>
                            <tbody>
                            {testValues[test.id].map(value => (
                                <tr key={value.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{value.attempt || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{value.id_limb}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{value.value}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>
            ))}
        </TestResultsBox>
    );
};

export default EasyForceResults;
