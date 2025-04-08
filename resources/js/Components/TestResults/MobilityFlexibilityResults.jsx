import React, {useEffect, useState} from "react";
import axios from "axios";
import TestResultsBox from "@/Components/TestResultsBox.jsx";
import {ClipLoader} from "react-spinners";


const MobilityFlexibilityResults = ({ clientId }) => {
const [tests, setTests] = useState([]);
const [testValues, setTestValues] = useState({});
const [loading, setLoading] = useState(true);
const [showLimbColumn, setShowLimbColumn] = useState(false);

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
        return (calculateDifference(leftValue, rightValue))/Math.abs(Math.max(rightValue,leftValue))*100;
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

    return (
        <TestResultsBox>
            {loading ? (
                <div className="flex justify-center">
                    <ClipLoader size={20} color={'#123abc'} />
                </div>
            ) : (
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                    <tr>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Názov testu
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Pravá strana
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ľavá strana
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Rozdiel
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Asymetria
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {processedTestData.map((data, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-center">{data.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">{data.right}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">{data.left}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">{data.difference}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">{data.asymmetry}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </TestResultsBox>
    );
};
export default MobilityFlexibilityResults
