import React, { useEffect, useState } from "react";
import axios from "axios";
import TestResultsBox from "@/Components/TestResultsBox.jsx";
import { ClipLoader } from "react-spinners";
import SortableTable from '@/Components/SortableTable';
import { sortData } from '@/Utils/SortData';

const MobilityFlexibilityResults = ({ clientId }) => {
    const [tests, setTests] = useState([]);
    const [testValues, setTestValues] = useState({});
    const [loading, setLoading] = useState(true);
    const [showLimbColumn, setShowLimbColumn] = useState(false);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [hoveredRowId, setHoveredRowId] = useState(null);

    useEffect(() => {
        axios.get(`/api/tests/mobilita-a-flexibilita?client_id=${clientId}`)
            .then(response => {
                setTests(response.data);

                const promises = response.data.map(test =>
                    axios.get(`/api/tests/mobilita-a-flexibilita/${test.id}?client_id=${clientId}`)
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

    const calculateDifference = (leftValue, rightValue) => {
        return Math.abs((leftValue || 0) - (rightValue || 0));
    };

    const calculateAsymmetry = (leftValue, rightValue) => {
        return ((calculateDifference(leftValue, rightValue)) / Math.abs(Math.max(rightValue, leftValue)) * 100).toFixed(2);
    };

    const processTestData = () => {
        if (!tests || !testValues) return [];

        const processedData = [];

        tests.forEach(test => {
            const values = testValues[test.id];
            if (values) {
                const rightValue = values.find(value => value.id_limb === 3)?.value;
                const leftValue = values.find(value => value.id_limb === 4)?.value;

                processedData.push({
                    name: test.name,
                    right: rightValue || 'N/A',
                    left: leftValue || 'N/A',
                    difference: calculateDifference(leftValue, rightValue),
                    asymmetry: calculateAsymmetry(leftValue, rightValue),
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
        { key: 'name', label: 'Názov testu' },
        { key: 'right', label: 'Pravá strana' },
        { key: 'left', label: 'Ľavá strana' },
        { key: 'difference', label: 'Rozdiel' },
        { key: 'asymmetry', label: 'Asymetria' },
    ];

    return (
        <TestResultsBox>
            {loading ? (
                <div className="flex justify-center">
                    <ClipLoader size={20} color={'#123abc'} />
                </div>
            ) : (
                <SortableTable
                    data={sortData(processedTestData, sortColumn, sortDirection)}
                    columns={columns}
                    sortColumn={sortColumn}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                    hoveredRowId={hoveredRowId}
                    onHover={setHoveredRowId}
                    getRowKey={(row) => row.name}
                    rowClassName={(row) => row.name === hoveredRowId ? 'bg-gray-100' : ''}
                />
            )}
        </TestResultsBox>
    );
};

export default MobilityFlexibilityResults;
