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
                        Hodnota
                    </th>
                    {showLimbColumn && (
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Končatina
                        </th>
                    )}
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Metriky
                    </th>
                </tr>
                </thead>
                <tbody>
                {tests.map(test => (
                    testValues[test.id] && testValues[test.id].map(value => (
                        <tr key={value.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-center">{test.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">{value.value || 'N/A'}</td>
                            {showLimbColumn && (
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    {value.limb_name !== '-' ? value.limb_name : ''}
                                </td>
                            )}
                            <td className="px-6 py-4 whitespace-nowrap text-center">{test.metrics}</td>
                        </tr>
                    ))
                ))}
                </tbody>
            </table>
        )}
    </TestResultsBox>
);};
export default MobilityFlexibilityResults
