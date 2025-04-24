import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TestResultsBox from '@/Components/TestResultsBox';
import { ClipLoader } from 'react-spinners';
import SortableTable from '@/Components/SortableTable';
import { sortData } from '@/Utils/SortData';

const MuscleEnduranceResults = ({ clientId }) => {
    const [tests, setTests] = useState([]);
    const [testValues, setTestValues] = useState({});
    const [loading, setLoading] = useState(true);
    const [showLimbColumn, setShowLimbColumn] = useState(false);
    const [hoveredRowId, setHoveredRowId] = useState(null);

    useEffect(() => {
        axios.get(`/api/tests/specialne-testy?client_id=${clientId}`)
            .then(response => {
                setTests(response.data);

                const promises = response.data.map(test =>
                    axios.get(`/api/tests/specialne-testy/${test.id}?client_id=${clientId}`)
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
        if (!tests || !testValues) return [];

        const processedData = [];

        tests.forEach(test => {
            if (testValues[test.id]) {
                testValues[test.id].forEach(value => {
                    processedData.push({
                        testName: test.name,
                        attempt: value.attempt || '1',
                        limbName: value.limb_name !== '-' ? value.limb_name : '',
                        value: value.value || 'N/A',
                        metrics: test.metrics,
                        id: value.id,
                    });
                });
            }
        });

        return processedData;
    };

    const processedTestData = processTestData();

    const columns = [
        { key: 'testName', label: 'Názov testu' },
        { key: 'attempt', label: 'Pokus' },
        ...(showLimbColumn ? [{ key: 'limbName', label: 'Končatina' }] : []),
        { key: 'value', label: 'Hodnota' },
        { key: 'metrics', label: 'Metrika' },
    ];

    return (
        <TestResultsBox>
            {loading ? (
                <div className="flex justify-center">
                    <ClipLoader size={20} color={'#123abc'} />
                </div>
            ) : (
                <SortableTable
                    data={sortData(processedTestData)}
                    columns={columns}
                    hoveredRowId={hoveredRowId}
                    onHover={setHoveredRowId}
                    getRowKey={(row) => row.id}
                    rowClassName={(row) => row.id === hoveredRowId ? 'bg-gray-100' : ''}
                />
            )}
        </TestResultsBox>
    );
};

export default MuscleEnduranceResults;
