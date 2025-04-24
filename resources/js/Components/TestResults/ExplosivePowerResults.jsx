import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TestResultsBox from '@/Components/TestResultsBox';
import SortableTable from '@/Components/SortableTable';
import { ClipLoader } from 'react-spinners';
import { sortData } from '@/Utils/SortData';
const ExplosivePowerResults = ({ clientId }) => {
    const [tests, setTests] = useState([]);
    const [testValues, setTestValues] = useState({});
    const [loading, setLoading] = useState(true);
    const [hoveredRowId, setHoveredRowId] = useState(null);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [showLimbColumn, setShowLimbColumn] = useState(false);

    useEffect(() => {
        axios.get(`/api/tests/vybusna-sila?client_id=${clientId}`)
            .then(response => {
                setTests(response.data);

                const promises = response.data.map(test =>
                    axios.get(`/api/tests/vybusna-sila/${test.id}?client_id=${clientId}`)
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
                            console.error(`Chyba pri načítaní hodnôt testu ${test.id}:`, error);
                        })
                );

                Promise.all(promises).then(() => setLoading(false));
            })
            .catch(error => {
                console.error(`Chyba pri načítaní testov:`, error);
                setLoading(false);
            });
    }, [clientId]);

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const baseColumns = [
        { key: 'test_name', label: 'Názov testu' },
        { key: 'value', label: 'Hodnota' },
    ];

    if (showLimbColumn) {
        baseColumns.push({ key: 'limb_name', label: 'Končatina' });
    }

    baseColumns.push({ key: 'metrics', label: 'Metriky' });

    return (
        <TestResultsBox>
            {loading ? (
                <div className="flex justify-center">
                    <ClipLoader size={20} color={'#123abc'} />
                </div>
            ) : (
                tests.map(test => {
                    const values = testValues[test.id]?.map(v => ({
                        ...v,
                        test_name: test.name,
                        metrics: test.metrics,
                    })) || [];

                    return (
                        <div key={test.id} className="mb-4">
                            <SortableTable
                                data={sortData(values, sortColumn, sortDirection)}
                                columns={baseColumns}
                                sortColumn={sortColumn}
                                sortDirection={sortDirection}
                                onSort={handleSort}
                                hoveredRowId={hoveredRowId}
                                onHover={setHoveredRowId}
                                getRowKey={(row) => row.id}
                            />
                        </div>
                    );
                })
            )}
        </TestResultsBox>
    );
};

export default ExplosivePowerResults;
