import React, {useEffect, useState} from 'react';
import axios from 'axios';
import TestResultsBox from '@/Components/TestResultsBox';
import {ClipLoader} from 'react-spinners';
import SortableTable from '@/Components/SortableTable';
import {sortData} from '@/Utils/SortData';

const JumpProfileResults = ({clientId}) => {
    const [tests, setTests] = useState([]);
    const [testValues, setTestValues] = useState({});
    const [loading, setLoading] = useState(true);

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
                console.error(`Chyba pri načítaní testov pre klienta ${clientId}:`, error);
                setLoading(false);
            });
    }, [clientId]);

    const processTestData = () => {
        if (!tests || !testValues) return {bothLegs: [], rightLeg: [], leftLeg: []};

        const bothLegsData = [];
        const rightLegData = [];
        const leftLegData = [];

        tests.forEach(test => {
            const values = testValues[test.id];
            if (values) {
                const groupedValues = {};
                values.forEach(value => {
                    if (!groupedValues[value.name]) {
                        groupedValues[value.name] = {name: test.name, attempts: {}};
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
                        bothLegsData.push(row);
                    } else if (Number(values[0].id_limb) === 3) {
                        rightLegData.push(row);
                    } else if (Number(values[0].id_limb) === 4) {
                        leftLegData.push(row);
                    }
                });
            }
        });

        const calculateEUR = (data) => {
            const cmjValues = data.filter(item => item.name.includes('CMJ')).map(item => Math.max(Number(item.attempt1) || 0, Number(item.attempt2) || 0));
            const sjValues = data.filter(item => item.name.includes('SJ')).map(item => Math.max(Number(item.attempt1) || 0, Number(item.attempt2) || 0));

            const maxCMJ = cmjValues.length > 0 ? Math.max(...cmjValues) : 0;
            const maxSJ = sjValues.length > 0 ? Math.max(...sjValues) : 0;

            return maxSJ !== 0 ? (maxCMJ / maxSJ).toFixed(2) : 'N/A';
        };

        const addEURRow = (data) => {
            const eurValue = calculateEUR(data);
            return [...data, {name: 'EUR', attempt1: eurValue, attempt2: eurValue, __eur_value: eurValue}];
        };

        return {
            bothLegs: addEURRow(bothLegsData),
            rightLeg: addEURRow(rightLegData),
            leftLeg: addEURRow(leftLegData)
        };
    };

    const {bothLegs, rightLeg, leftLeg} = processTestData();

    const columns = [
        {key: 'name', label: 'Názov skoku'},
        {key: 'attempt1', label: '1. pokus'},
        {key: 'attempt2', label: '2. pokus'},
        {
            key: '__eur_value',
            label: 'EUR',
            render: (row) => {
                if (row.name === 'EUR') {
                    const eurValue = parseFloat(row.__eur_value);
                    let className = '';
                    if (!isNaN(eurValue)) {
                        if (eurValue >= 1.05 && eurValue <= 1.1) {
                            className = 'text-green-500';
                        } else {
                            className = 'text-red-500';
                        }
                    }
                    return <span className={className}>{row.__eur_value}</span>;
                }
                return null;
            },
        },
    ].filter(col => col.key !== '__eur_value' || bothLegs.some(item => item.name === 'EUR') || rightLeg.some(item => item.name === 'EUR') || leftLeg.some(item => item.name === 'EUR'));


    return (
        <TestResultsBox>
            {loading ? (
                <div className="flex justify-center">
                    <ClipLoader size={20} color={'#123abc'}/>
                </div>
            ) : (
                <>
                    {/* Obojnožné skoky */}
                    {bothLegs.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Skokový profil</h3>
                            <SortableTable
                                data={sortData(bothLegs)}
                                columns={columns}
                                getRowKey={(row) => row.name}
                            />
                        </div>
                    )}

                    {/* Pravá noha */}
                    {rightLeg.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold mb-2">Skokový profil - Pravá noha</h3>
                            <SortableTable
                                data={sortData(rightLeg)}
                                columns={columns}
                                getRowKey={(row) => row.name}
                            />
                        </div>
                    )}

                    {/* Ľavá noha */}
                    {leftLeg.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold mb-2">Skokový profil - Ľavá noha</h3>
                            <SortableTable
                                data={sortData(leftLeg)}
                                columns={columns}
                                getRowKey={(row) => row.name}
                            />
                        </div>
                    )}
                </>
            )}
        </TestResultsBox>
    );
};

export default JumpProfileResults;
