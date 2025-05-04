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
        const maxVal = Math.abs(Math.max(rightValue || 0, leftValue || 0));
        return maxVal === 0 ? 0 : ((calculateDifference(leftValue, rightValue)) / maxVal * 100).toFixed(2);
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

    const columns = [
        { key: 'name', label: 'Názov testu' },
        { key: 'right', label: 'Pravá strana' },
        { key: 'left', label: 'Ľavá strana' },
        { key: 'difference', label: 'Rozdiel' },
        {
            key: 'asymmetry',
            label: 'Asymetria',
            render: (row) => {
                const asymmetry = parseFloat(row.asymmetry);
                let className = '';
                if (!isNaN(asymmetry)) {
                    if (asymmetry > 10) {
                        className = 'text-red-500';
                    } else if (asymmetry >= 7 && asymmetry <= 10) {
                        className = 'text-yellow-500';
                    } else {
                        className = 'text-green-500';
                    }
                }
                return <span className={className}>{isNaN(asymmetry) ? 'N/A' : `${asymmetry}%`}</span>;
            },
        },
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
                    getRowKey={(row) => row.name}
                    rowClassName={(row) => row.name === hoveredRowId ? 'bg-gray-100' : ''}
                />
            )}
        </TestResultsBox>
    );
};

export default MobilityFlexibilityResults;
