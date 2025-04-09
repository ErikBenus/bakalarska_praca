import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TestResultsBox from '@/Components/TestResultsBox';
import { ClipLoader } from 'react-spinners';

const YBalanceTestResults = ({ clientId }) => {
    const [tests, setTests] = useState([]);
    const [testValues, setTestValues] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/y-balance-test?client_id=${clientId}`)
            .then(response => {
                setTests(response.data);

                const promises = response.data.map(test =>
                    axios.get(`/api/y-balance-test/${test.id}?client_id=${clientId}`)
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
                    const key = `${test.name}`; // Používame test.name pre Y Balance Test
                    if (!groupedValues[key]) {
                        groupedValues[key] = {
                            name: key,
                            values: [],
                        };
                    }
                    groupedValues[key].values.push({
                        attempt: value.attempt,
                        value: value.value,
                        limb_name: value.limb_name,
                    });
                });

                Object.values(groupedValues).forEach(group => {
                    const rightLegValues = group.values.filter(v => v.limb_name === 'Pravá noha').map(v => v.value);
                    const leftLegValues = group.values.filter(v => v.limb_name === 'Ľavá noha').map(v => v.value);

                    if (rightLegValues.length >= 3 && leftLegValues.length >= 3) {
                        const rightLegAvg = rightLegValues.reduce((a, b) => a + b, 0) / rightLegValues.length;
                        const leftLegAvg = leftLegValues.reduce((a, b) => a + b, 0) / leftLegValues.length;

                        const absoluteDistance = Math.abs(rightLegAvg - leftLegAvg);
                        const absoluteDifference = rightLegAvg - leftLegAvg;
                        const relativeDistance = (absoluteDistance / Math.max(rightLegAvg, leftLegAvg)) * 100;
                        const relativeDifference = (absoluteDifference / Math.max(rightLegAvg, leftLegAvg)) * 100;

                        processedData.push({
                            name: group.name,
                            rightLeg: rightLegValues,
                            leftLeg: leftLegValues,
                            absoluteDistance: absoluteDistance.toFixed(2),
                            absoluteDifference: absoluteDifference.toFixed(2),
                            relativeDistance: relativeDistance.toFixed(2),
                            relativeDifference: relativeDifference.toFixed(2),
                        });
                    }
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
                    {processedTestData.map(data => (
                        <div key={data.name} className="mb-4">
                            <h3 className="text-lg font-semibold mb-2">{data.name}</h3>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                <tr>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Noha</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">1. pokus</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">2. pokus</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">3. pokus</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Absolútna vzdialenosť</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Absolútny rozdiel</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Relatívna vzdialenosť (%)</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Relatívny rozdiel (%)</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">Pravá noha</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{data.rightLeg[0]}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{data.rightLeg[1]}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{data.rightLeg[2]}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{data.absoluteDistance}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{data.absoluteDifference}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{data.relativeDistance}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{data.relativeDifference}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">Ľavá noha</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{data.leftLeg[0]}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{data.leftLeg[1]}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{data.leftLeg[2]}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{data.absoluteDistance}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{data.absoluteDifference}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{data.relativeDistance}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{data.relativeDifference}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            )}
        </TestResultsBox>
    );
};

export default YBalanceTestResults;
