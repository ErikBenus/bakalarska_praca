import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TestResultsBox from '@/Components/TestResultsBox';
import { ClipLoader } from 'react-spinners';

const ExplosivePowerResults = ({ clientId }) => {
    const [tests, setTests] = useState([]);
    const [testValues, setTestValues] = useState({});
    const [loading, setLoading] = useState(true);
    const [showLimbColumn, setShowLimbColumn] = useState(false);

    useEffect(() => {
        axios.get(`/api/tests/skokovy-profil?client_id=${clientId}`)
            .then(response => {
                setTests(response.data);

                const promises = response.data.map(test =>
                    axios.get(`/api/tests/skokovy-profil/${test.id}?client_id=${clientId}`)
                        .then(response => {
                            setTestValues(prevValues => ({
                                ...prevValues,
                                [test.id]: response.data
                            }));
                            if (response.data.some(value => value.limb_name !== '-')) {
                                setShowLimbColumn(true);
                            }
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
        if (!tests || !testValues) return { bothLegs: [], rightLeg: [], leftLeg: [] };

        const bothLegs = [];
        const rightLeg = [];
        const leftLeg = [];

        tests.forEach(test => {
            const values = testValues[test.id];
            if (values) {
                const groupedValues = {};
                values.forEach(value => {
                    if (!groupedValues[value.name]) {
                        groupedValues[value.name] = { name: test.name, attempts: {} };
                    }
                    groupedValues[value.name].attempts[value.attempt] = value.value;
                });

                Object.values(groupedValues).forEach(groupedValue => {
                    const row = {
                        name: groupedValue.name,
                        attempt1: groupedValue.attempts[1] || 'N/A',
                        attempt2: groupedValue.attempts[2] || 'N/A',
                    };

                    if (!values[0].limb_name || values[0].limb_name === '-') {
                        bothLegs.push(row);
                    } else if (Number(values[0].id_limb) === 3) {
                        rightLeg.push(row);
                    } else if (Number(values[0].id_limb) === 4) {
                        leftLeg.push(row);
                    }

                });
            }
        });

        return { bothLegs, rightLeg, leftLeg };
    };

    const { bothLegs, rightLeg, leftLeg } = processTestData();

    return (
        <TestResultsBox>
            {loading ? (
                <div className="flex justify-center">
                    <ClipLoader size={20} color={'#123abc'} />
                </div>
            ) : (
                <>
                    {/* Obojnožné skoky */}
                    {bothLegs.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Skokový profil</h3>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                <tr>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Názov skoku</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">1. pokus</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">2. pokus</th>
                                </tr>
                                </thead>
                                <tbody>
                                {bothLegs.map(value => (
                                    <tr key={value.name}>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">{value.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">{value.attempt1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">{value.attempt2}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pravá noha */}
                    {rightLeg.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold mb-2">Skokový profil - Pravá noha</h3>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                <tr>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Názov skoku</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">1. pokus</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">2. pokus</th>
                                </tr>
                                </thead>
                                <tbody>
                                {rightLeg.map(value => (
                                    <tr key={value.name}>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">{value.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">{value.attempt1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">{value.attempt2}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Ľavá noha */}
                    {leftLeg.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold mb-2">Skokový profil - Ľavá noha</h3>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                <tr>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Názov skoku</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">1. pokus</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">2. pokus</th>
                                </tr>
                                </thead>
                                <tbody>
                                {leftLeg.map(value => (
                                    <tr key={value.name}>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">{value.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">{value.attempt1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">{value.attempt2}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
        </TestResultsBox>
    );
};

export default ExplosivePowerResults;
