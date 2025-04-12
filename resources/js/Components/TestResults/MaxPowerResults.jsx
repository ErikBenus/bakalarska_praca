import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TestResultsBox from '@/Components/TestResultsBox';
import { ClipLoader } from 'react-spinners';
import SortableTable from '@/Components/SortableTable';
import { sortData } from '@/Utils/SortData';
import MaxPowerChart from "@/Components/GraphicCharts/MaxPowerChart.jsx";

const MaxPowerResults = ({ clientId }) => {
    const [tests, setTests] = useState([]);
    const [testValues, setTestValues] = useState({});
    const [loading, setLoading] = useState(true);
    const [showLimbColumn, setShowLimbColumn] = useState(false);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [hoveredRowId, setHoveredRowId] = useState(null);

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
                    const key = (value.limb_name === '-' || value.limb_id === 5)
                        ? test.exercise_name
                        : `${test.exercise_name}${value.limb_name ? ` - ${value.limb_name}` : ''}`;
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

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const columns = [
        { key: 'attempt', label: 'Pokus' },
        { key: 'weight', label: 'Dvíhaná váha' },
        { key: 'average', label: 'Average m/s' },
        { key: 'mean_ms', label: 'Mean m/s' },
    ];

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
                            <SortableTable
                                data={sortData(group.values, sortColumn, sortDirection)}
                                columns={columns}
                                sortColumn={sortColumn}
                                sortDirection={sortDirection}
                                onSort={handleSort}
                                hoveredRowId={hoveredRowId}
                                onHover={setHoveredRowId}
                                getRowKey={(row) => row.attempt}
                                rowClassName={(row) => row.attempt === hoveredRowId ? 'bg-gray-100' : ''}
                            />
                            <MaxPowerChart
                                data={[group.values.map(value => value.mean_ms)]}
                                labels={[group.values.map(value => value.weight)]}
                                title={group.name}
                                xAxisLabel="Hmotnosť (kg)"
                                yAxisLabel="Mean m/s"
                            />
                        </div>
                    ))}
                </div>
            )}
        </TestResultsBox>
    );
};

export default MaxPowerResults;
