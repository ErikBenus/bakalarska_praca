import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EasyForceForm from "@/Components/AddTest/EasyForceForm.jsx";
import YBalanceTestForm from "@/Components/AddTest/YBalanceTestForm.jsx";

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
        setNewTest({ ...newTest, [name]: value });
        if (newTest.category === 'Easy Force') {
            generateEasyForceValues(value);
        }
    };

    // useEffect(() => {
    //     if (newTest.category === 'Easy Force') {
    //         const generatedValues = [
    //             // Quadriceps
    //             { id_limb: '3', value: '', attempt: 1, weight: '', muscle: 'Quadriceps' },
    //             { id_limb: '3', value: '', attempt: 2, weight: '', muscle: 'Quadriceps' },
    //             { id_limb: '4', value: '', attempt: 1, weight: '', muscle: 'Quadriceps' },
    //             { id_limb: '4', value: '', attempt: 2, weight: '', muscle: 'Quadriceps' },
    //             // Hamstring
    //             { id_limb: '3', value: '', attempt: 1, weight: '', muscle: 'Hamstring' },
    //             { id_limb: '3', value: '', attempt: 2, weight: '', muscle: 'Hamstring' },
    //             { id_limb: '4', value: '', attempt: 1, weight: '', muscle: 'Hamstring' },
    //             { id_limb: '4', value: '', attempt: 2, weight: '', muscle: 'Hamstring' },
    //         ];
    //         setNewTest(prev => ({
    //             ...prev,
    //             name: '',
    //             values: generatedValues
    //         }));
    //     }
    // }, [newTest.category]);

    const handleValueChange = (index, e) => {
        const { value } = e.target;
        const updatedValues = [...newTest.values];
        updatedValues[index].value = value;
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

        const saveTest = (data) => {
            const url = testId ? `/api/tests/${testId}` : '/api/tests';
            const method = testId ? 'put' : 'post';

            return axios({
                method,
                url,
                data: data,
            });
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
                <YBalanceTestForm newTest={newTest}
                                  setNewTest={setNewTest}
                                  handleValueChange={handleValueChange}
                                  addLimbValue={addLimbValue} />
                )}
            {newTest.category === 'Easy Force' ? (
                <EasyForceForm
                    newTest={newTest}
                    setNewTest={setNewTest}
                    handleValueChange={handleValueChange}
                    addLimbValue={addLimbValue}
                />
            ) : (
                <input
                    type="text"
                    name="name"
                    placeholder="Názov testu"
                    value={newTest.name || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                />
            )}
            {newTest.category !== 'Easy Force' && (
                <input
                    type="text"
                    name="metrics"
                    placeholder="Metrika (napr. sekundy, kg...)"
                    value={newTest.metrics || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                />
            )}

            <textarea
                name="description"
                placeholder="Popis (voliteľné)"
                value={newTest.description || ""}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            />

            {newTest.category !== 'Easy Force' && (
                <div className="mb-2">
                    {newTest.values.map((val, index) => (
                        <div key={index} className="grid grid-cols-2 gap-2 mb-2">
                            <input
                                type="number"
                                name="value"
                                placeholder="Hodnota"
                                value={val.value || ""}
                                onChange={(e) => handleValueChange(index, e)}
                                className="border border-gray-300 rounded-md p-2"
                            />
                            <input
                                type="number"
                                name="attempt"
                                placeholder="Pokus (voliteľné)"
                                value={val.attempt || ""}
                                onChange={(e) => handleValueChange(index, e)}
                                className="border border-gray-300 rounded-md p-2"
                            />
                            <input
                                type="number"
                                name="weight"
                                placeholder="Záťaž (voliteľné)"
                                value={val.weight || ""}
                                onChange={(e) => handleValueChange(index, e)}
                                className="border border-gray-300 rounded-md p-2"
                            />
                            <select
                                name="id_limb"
                                value={val.id_limb || ""}
                                onChange={(e) => handleValueChange(index, e)}
                                className="border border-gray-300 rounded-md p-2"
                            >
                                <option value="">-</option>
                                <option value="1">Pravá ruka</option>
                                <option value="2">Ľavá ruka</option>
                                <option value="3">Pravá noha</option>
                                <option value="4">Ľavá noha</option>
                            </select>
                        </div>
                    ))}
                    <button
                        onClick={addLimbValue}
                        className="text-sm text-blue-600 hover:underline mb-4"
                    >
                        + Pridať hodnotu
                    </button>
                </div>
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
                <ToastContainer/>
            </div>
        </Modal>
    );
};

export default AddTestForm;
