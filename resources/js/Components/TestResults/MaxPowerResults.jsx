import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TestResultsBox from '@/Components/TestResultsBox';
import { ClipLoader } from 'react-spinners';

const MuscleEnduranceResults = ({ clientId }) => {
    const [tests, setTests] = useState([]);
    const [testValues, setTestValues] = useState({});
    const [loading, setLoading] = useState(true);
    const [showLimbColumn, setShowLimbColumn] = useState(false);

    useEffect(() => {
        axios.get(`/api/max-power-tests?client_id=${clientId}`)
            .then(response => {
                setTests(response.data);

                const promises = response.data.map(test =>
                    axios.get(`/api/max-power-tests/${test.id}?client_id=${clientId}`)
                        .then(response => {
                            const values = response.data.values;
                            setTestValues(prevValues => ({
                                ...prevValues,
                                [test.id]: values,
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

    const processTestData = () => {
        if (!tests || !testValues) return [];

        const processedData = [];

        tests.forEach(test => {
            const values = testValues[test.id];
            if (values) {
                const groupedValues = {};
                values.forEach(value => {
                    const key = `${test.exercise_name}${value.limb_name ? ` - ${value.limb_name}` : ''}`;
                    if (!groupedValues[key]) {
                        groupedValues[key] = {
                            name: key,
                            values: [],
                        };
                    }
                    groupedValues[key].values.push({
                        attempt: value.attempt,
                        weight: value.weight,
                        average: value.avg_value,
                        mean_ms: value.value,
                        limb_name: value.limb_name,
                    });
                });

                Object.values(groupedValues).forEach(group => {
                    processedData.push(group);
                });
            }
        });

        return processedData;
    };


    const processedTestData = processTestData();

    return (
        <TestResultsBox>
            {loading ? (
                <div className="flex justify-center">
                    <ClipLoader size={20} color={'#123abc'} />
                </div>
            ) : (
                <div>
                    {processedTestData.map(group => (
                        <div key={group.name} className="mb-4">
                            <h3 className="text-lg font-semibold mb-2">
                                {showLimbColumn && group.values[0].limb_name && group.values[0].limb_name !== '-'
                                    ? `${group.name} - ${group.values[0].limb_name}`
                                    : group.name}
                            </h3>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                <tr>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Pokus</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Dvíhaná
                                        váha
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Average
                                        m/s
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Mean
                                        m/s
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {group.values.map(value => (
                                    <tr key={value.attempt}>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">{value.attempt}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">{value.weight}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">{value.average}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">{value.mean_ms}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            )}
        </TestResultsBox>
    );
};

export default MuscleEnduranceResults;
