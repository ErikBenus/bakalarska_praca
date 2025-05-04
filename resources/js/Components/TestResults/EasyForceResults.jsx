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

    useEffect(() => {
        axios.get(`/api/tests/easy-force?client_id=${clientId}`)
            .then(response => {
                setTests(response.data);
                setLoading(true);

                const promises = response.data.map(test =>
                    axios.get(`/api/tests/easy-force/${test.id}?client_id=${clientId}`)
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
                console.error('Chyba pri načítaní aktuálnych testov:', error);
                setLoading(false);
            });
    }, [clientId]);


    const calculateMaxForLimb = (values, limbId) => {
        const limbValues = values.filter(v => v.id_limb === limbId);
        if (!limbValues.length) return 0;
        return Math.max(...limbValues.map(v => v.value));
    };


    const columns = [
        { key: 'attempt', label: 'Pokus' },
        { key: 'limb_name', label: 'Končatina' },
        { key: 'value', label: 'Hodnota' },
    ];


    const processedTestData = () => {
        return tests.map(test => ({
            ...test,
            values: testValues[test.id] || []
        }));
    };

    const processedTestsWithValues = processedTestData();

    return (
        <TestResultsBox>
            {loading ? (
                <div className="flex justify-center">
                    <ClipLoader size={20} color={'#123abc'} />
                </div>
            ) : (
                <>
                    {processedTestsWithValues.map(test => (
                        <div key={test.id} className="mb-4">
                            <h3 className="text-base font-semibold">{test.name}</h3>
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
                </>
            )}
        </TestResultsBox>
    );
};

export default EasyForceResults;
