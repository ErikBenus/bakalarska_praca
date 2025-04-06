import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EasyForceForm from "@/Components/AddTest/EasyForceForm.jsx";
import YBalanceTestForm from "@/Components/AddTest/YBalanceTestForm.jsx";
import GeneralAddTestForm from "@/Components/AddTest/GeneralAddTestForm.jsx";

const AddTestForm = ({ isOpen, onRequestClose, testId, testData }) => {
    const [newTest, setNewTest] = useState({
        client_id: '',
        name: '',
        category: '',
        metrics: '',
        description: '',
        values: [
            { id_limb: '', value: '', attempt: '', weight: '' },
        ],
    });


    useEffect(() => {
        if (testData) {
            setNewTest(testData);
        }
    }, [testData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'category') {
            if (value === 'Easy Force') {
                const generatedValues = [
                    { id_limb: '3', value: '', attempt: 1, weight: '', muscle: 'Quadriceps' },
                    { id_limb: '3', value: '', attempt: 2, weight: '', muscle: 'Quadriceps' },
                    { id_limb: '4', value: '', attempt: 1, weight: '', muscle: 'Quadriceps' },
                    { id_limb: '4', value: '', attempt: 2, weight: '', muscle: 'Quadriceps' },
                    { id_limb: '3', value: '', attempt: 1, weight: '', muscle: 'Hamstring' },
                    { id_limb: '3', value: '', attempt: 2, weight: '', muscle: 'Hamstring' },
                    { id_limb: '4', value: '', attempt: 1, weight: '', muscle: 'Hamstring' },
                    { id_limb: '4', value: '', attempt: 2, weight: '', muscle: 'Hamstring' },
                ];
                setNewTest({
                    ...newTest,
                    category: value,
                    name: '',
                    metrics: 'N',
                    values: generatedValues,
                });
            } else if (value === 'Y Balance Test') {
                const yBalanceValues = [
                    // Anterior
                    { id_limb: '3', value: '', attempt: 1, weight: '', name: 'Anterior' },
                    { id_limb: '3', value: '', attempt: 2, weight: '', name: 'Anterior' },
                    { id_limb: '3', value: '', attempt: 3, weight: '', name: 'Anterior' },
                    { id_limb: '4', value: '', attempt: 1, weight: '', name: 'Anterior' },
                    { id_limb: '4', value: '', attempt: 2, weight: '', name: 'Anterior' },
                    { id_limb: '4', value: '', attempt: 3, weight: '', name: 'Anterior' },
                    // Posteromedial
                    { id_limb: '3', value: '', attempt: 1, weight: '', name: 'Posteromedial' },
                    { id_limb: '3', value: '', attempt: 2, weight: '', name: 'Posteromedial' },
                    { id_limb: '3', value: '', attempt: 3, weight: '', name: 'Posteromedial' },
                    { id_limb: '4', value: '', attempt: 1, weight: '', name: 'Posteromedial' },
                    { id_limb: '4', value: '', attempt: 2, weight: '', name: 'Posteromedial' },
                    { id_limb: '4', value: '', attempt: 3, weight: '', name: 'Posteromedial' },
                    // Posterolateral
                    { id_limb: '3', value: '', attempt: 1, weight: '', name: 'Posterolateral' },
                    { id_limb: '3', value: '', attempt: 2, weight: '', name: 'Posterolateral' },
                    { id_limb: '3', value: '', attempt: 3, weight: '', name: 'Posterolateral' },
                    { id_limb: '4', value: '', attempt: 1, weight: '', name: 'Posterolateral' },
                    { id_limb: '4', value: '', attempt: 2, weight: '', name: 'Posterolateral' },
                    { id_limb: '4', value: '', attempt: 3, weight: '', name: 'Posterolateral' },
                ];
                setNewTest({
                    ...newTest,
                    category: value,
                    name: '',
                    values: yBalanceValues,
                });
            } else {
                // Default reset for other categories
                setNewTest({
                    ...newTest,
                    category: value,
                    name: '',
                    metrics: '',
                    values: [{ id_limb: '5', value: '', attempt: '', weight: '' }],
                });
            }
        } else {
            setNewTest({ ...newTest, [name]: value });
        }
    };



    const handleValueChange = (index, e) => {
        const { name, value } = e.target;
        const updatedValues = [...newTest.values];
        updatedValues[index] = {
            ...updatedValues[index],
            [name]: value,
        };
        setNewTest({ ...newTest, values: updatedValues });
    };



    const addLimbValue = () => {
        setNewTest({
            ...newTest,
            values: [...newTest.values, { id_limb: '', value: '', attempt: '', weight: '' }],
        });
    };

    const handleSave = () => {
        let testDataToSave = {
            ...newTest,
            metrics: newTest.category === 'Easy Force' ? 'N' : newTest.metrics
        };

        const getApiUrlByCategory = (category, id) => {
            let base = '/api/tests';

            if (category === 'Y Balance Test') base = '/api/y-balance-test';
            if (category === 'Easy Force') base = '/api/easy-force';

            return id ? `${base}/${id}` : base;
        };

        const saveTest = (data) => {
            const url = getApiUrlByCategory(data.category);

            const method = 'post';


            return axios({
                method,
                url,
                data,
            });
        };

        if (newTest.category === 'Easy Force') {
            const quadricepsData = {
                ...testDataToSave,
                name: 'Quadriceps',
                values: newTest.values.slice(0, 4),
            };

            const hamstringData = {
                ...testDataToSave,
                name: 'Hamstring',
                values: newTest.values.slice(4, 8),
            };

            Promise.all([saveTest(quadricepsData), saveTest(hamstringData)])
                .then(() => {
                    toast.success(testId ? 'Testy boli upravené!' : 'Testy boli pridané!');
                    onRequestClose();
                    window.location.reload();
                })
                .catch((err) => {
                    toast.error('Chyba pri ukladaní testov!');
                    console.error(err);
                });
        } else if (newTest.category === 'Y Balance Test') {
            const anteriorData = {
                ...testDataToSave,
                name: 'Anterior',
                values: newTest.values.slice(0, 6),
            };

            const posteromedialData = {
                ...testDataToSave,
                name: 'Posteromedial',
                values: newTest.values.slice(6, 12),
            };

            const posterolateralData = {
                ...testDataToSave,
                name: 'Posterolateral',
                values: newTest.values.slice(12, 18),
            };

            Promise.all([
                saveTest(anteriorData),
                saveTest(posteromedialData),
                saveTest(posterolateralData)
            ])
                .then(() => {
                    toast.success(testId ? 'Testy boli upravené!' : 'Testy boli pridané!');
                    onRequestClose();
                    window.location.reload();
                })
                .catch((err) => {
                    toast.error('Chyba pri ukladaní testov!');
                    console.error(err);
                });
        } else {
            saveTest(testDataToSave)
                .then(() => {
                    toast.success(testId ? 'Test bol upravený!' : 'Test bol pridaný!');
                    onRequestClose();
                    window.location.reload();
                })
                .catch((err) => {
                    toast.error('Chyba pri ukladaní testu!');
                    console.error(err);
                });
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Pridať test"
            className="bg-white p-6 rounded-md shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
            <h3 className="text-lg font-medium text-gray-900 mb-4">{testId ? 'Upraviť test' : 'Pridať nový test'}</h3>
            <select
                name="category"
                value={newTest.category || ""}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            >
                <option value="">Vyberte kategóriu</option>
                <option value="Y Balance Test">Y Balance Test</option>
                <option value="Maximálna sila">Maximálna sila</option>
                <option value="Rýchlostné schopnosti">Rýchlostné schopnosti</option>
                <option value="Aeróbna kapacita">Aeróbna kapacita</option>
                <option value="Svalová vytrvalosť">Svalová vytrvalosť</option>
                <option value="Vybušná sila">Vybušná sila</option>
                <option value="Skokový profil">Skokový profil</option>
                <option value="Mobilita a flexibilita">Mobilita a flexibilita</option>
                <option value="Easy Force">Easy Force</option>
                <option value="Nedefinová kategória">Nedefinová kategória</option>
            </select>
            {newTest.category === 'Y Balance Test' && (
                <YBalanceTestForm newTest={newTest} setNewTest={setNewTest} handleValueChange={handleValueChange} addLimbValue={addLimbValue} />
            )}
            {newTest.category === 'Easy Force' && (
                <EasyForceForm newTest={newTest} setNewTest={setNewTest} handleValueChange={handleValueChange} addLimbValue={addLimbValue} />
            )}
            {newTest.category !== 'Easy Force' && newTest.category !== 'Y Balance Test' && (
                <GeneralAddTestForm
                    newTest={newTest}
                    handleInputChange={handleInputChange}
                    handleValueChange={handleValueChange}
                    addLimbValue={addLimbValue}
                />
            )}
            <div className="flex justify-end space-x-2">
                <button
                    className="px-4 py-2 bg-green-600 text-white font-medium rounded-md shadow-sm hover:bg-green-700"
                    onClick={handleSave}
                >
                    Uložiť
                </button>
                <button
                    className="px-4 py-2 bg-gray-300 text-black font-medium rounded-md shadow-sm hover:bg-gray-400"
                    onClick={onRequestClose}
                >
                    Zrušiť
                </button>
                <ToastContainer />
            </div>
        </Modal>
    );
};

export default AddTestForm;
