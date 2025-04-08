import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TestResultsBox from '@/Components/TestResultsBox';
import { ClipLoader } from 'react-spinners';

const AerobicCapacityResults = ({ clientId }) => {
    const [tests, setTests] = useState([]);
    const [testValues, setTestValues] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/tests/aerobna-kapacita?client_id=${clientId}`)
            .then(response => {
                setTests(response.data);

                const promises = response.data.map(test =>
                    axios.get(`/api/tests/aerobna-kapacita/${test.id}?client_id=${clientId}`)
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

    return (
        <TestResultsBox>
            {loading ? (
                    <div className="flex justify-center">
                        <ClipLoader size={20} color={'#123abc'} />
                    </div>
                ) : (
            tests.map(test => (
                <div key={test.id} className="mb-4">
                    {testValues[test.id] && (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                            <tr>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Názov Testu</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Hodnota</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Metrika</th>
                            </tr>
                            </thead>
                            <tbody>
                            {testValues[test.id].map(value => (
                                <tr key={value.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{test.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{value.value}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{test.metrics}</td>
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

export default AerobicCapacityResults;
