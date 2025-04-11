import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TestResultsBox from '@/Components/TestResultsBox';
import { ClipLoader } from 'react-spinners';
import SortableTable from '@/Components/SortableTable';
import { sortData } from '@/Utils/SortData';

const YBalanceTestResults = ({ clientId }) => {
    const [tests, setTests] = useState([]);
    const [testValues, setTestValues] = useState({});
    const [loading, setLoading] = useState(true);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [hoveredRowId, setHoveredRowId] = useState(null);

    useEffect(() => {
        axios.get(`/api/y-balance-test?client_id=${clientId}`)
            .then(response => {
                setTests(response.data);

                const promises = response.data.map(test =>
                    axios.get(`/api/y-balance-test/${test.id}?client_id=${clientId}`)
                        .then(response => {
                            setTestValues(prevValues => ({
                                ...prevValues,
                                [test.id]: response.data, // Ukladáme celú response.data
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
            const values = testValues[test.id]?.values;
            if (values) {
                processedData.push({
                    testId: test.id,
                    name: test.name,
                    rightLeg: values.filter(v => v.limb_name === 'Pravá noha').map(v => v.value),
                    leftLeg: values.filter(v => v.limb_name === 'Ľavá noha').map(v => v.value),
                    absoluteDistanceRight: testValues[test.id].absoluteDistanceRight,
                    absoluteDistanceLeft: testValues[test.id].absoluteDistanceLeft,
                    absoluteDifference: testValues[test.id].absoluteDifference,
                    relativeDistance: testValues[test.id].relativeDistance,
                    relativeDifference: testValues[test.id].relativeDifference,
                    relativeDistanceRight: testValues[test.id].relativeDistanceRight,
                    relativeDistanceLeft: testValues[test.id].relativeDistanceLeft,
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
        { key: 'leg', label: 'Noha' },
        { key: 'attempt1', label: '1. pokus' },
        { key: 'attempt2', label: '2. pokus' },
        { key: 'attempt3', label: '3. pokus' },
        { key: 'absoluteDistance', label: 'Absolútna vzdialenosť' },
        { key: 'absoluteDifference', label: 'Absolútny rozdiel' },
        { key: 'relativeDistance', label: 'Relatívna vzdialenosť (%)' },
        { key: 'relativeDifference', label: 'Relatívny rozdiel' },
    ];

    const generateTableData = (data) => {
        return [
            {
                leg: 'Pravá noha',
                attempt1: data.rightLeg[0],
                attempt2: data.rightLeg[1],
                attempt3: data.rightLeg[2],
                absoluteDistance: data.absoluteDistanceRight,
                absoluteDifference: data.absoluteDifference,
                relativeDistance: data.relativeDistanceRight,
                relativeDifference: data.relativeDifference,
            },
            {
                leg: 'Ľavá noha',
                attempt1: data.leftLeg[0],
                attempt2: data.leftLeg[1],
                attempt3: data.leftLeg[2],
                absoluteDistance: data.absoluteDistanceLeft,
                absoluteDifference: data.absoluteDifference,
                relativeDistance: data.relativeDistanceLeft,
                relativeDifference: data.relativeDifference,
            },
        ];
    };

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
                            <SortableTable
                                data={sortData(generateTableData(data), sortColumn, sortDirection)}
                                columns={columns}
                                sortColumn={sortColumn}
                                sortDirection={sortDirection}
                                onSort={handleSort}
                                hoveredRowId={hoveredRowId}
                                onHover={setHoveredRowId}
                                getRowKey={(row) => row.leg}
                                rowClassName={(row) => row.leg === hoveredRowId ? 'bg-gray-100' : ''}
                            />
                        </div>
                    ))}
                </div>
            )}
        </TestResultsBox>
    );
};

export default YBalanceTestResults;
