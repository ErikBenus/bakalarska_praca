import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EasyForceForm from "@/Components/AddTest/EasyForceForm.jsx";
import YBalanceTestForm from "@/Components/AddTest/YBalanceTestForm.jsx";
import GeneralAddTestForm from "@/Components/AddTest/GeneralAddTestForm.jsx";
import MobilityFlexibilityForm from "@/Components/AddTest/MobilityFlexibilityForm.jsx";
import JumpProfileForm from "@/Components/AddTest/JumpProfileForm.jsx";
import MaxPowerTestForm from "@/Components/AddTest/MaxPowerTestForm.jsx";
import {Transition} from "@headlessui/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

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

    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);


    const [newMaxPowerTest, setNewMaxPowerTest] = useState({
        exercise_name: '',
        description: '',
        values: [{ weight: '', mean_ms: '', average: '', attempt: 1, id_limb: '' }],
    });

    const muscles = [
        'Illiopsoas',
        'Rectus pemuas',
        'Piriformis',
        'Hamstring prox',
        'Hamstring dist.',
        'Gastrocnemius',
        'Soleus',
        'Flexia KK',
        'Extenzia RK',
        'Abdukcia',
        'Extenzia v Abdukcii',
    ];

    const jumpTests = [
        { name: 'RSI', id_limb: 5 },
        { name: 'GCT', id_limb: 5 },
        { name: 'CMJ', id_limb: 5 },
        { name: 'SJ', id_limb: 5 },
        { name: 'H', id_limb: 5 },
        { name: 'CMJ Right', id_limb: 3 },
        { name: 'SJ Right', id_limb: 3 },
        { name: 'CMJ Left', id_limb: 4 },
        { name: 'SJ Left', id_limb: 4 },
    ];


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
            } else if (value === 'Mobilita a flexibilita') {
                setNewTest({
                    ...newTest,
                    category: value,
                    name: '',
                    metrics: 'Stupne',
                    values: [], // Inicializácia prázdneho poľa values
                });
        } else if (value === 'Skokový profil') {
                const jumpProfileValues = jumpTests.flatMap((test) => [
                    {id_limb: test.id_limb, value: '', attempt: 1, name: test.name},
                    {id_limb: test.id_limb, value: '', attempt: 2, name: test.name},
                ]);
                setNewTest({
                    ...newTest,
                    category: value,
                    name: '',
                    metrics: 'Hodnota',
                    values: jumpProfileValues,
                });
            } else if (value === 'Maximálna sila') {
                setNewMaxPowerTest({
                    exercise_name: '',
                    description: '',
                    values: [{ weight: '', mean_ms: '', average: '', attempt: '', id_limb: '5' }],
                });
                setNewTest({
                    ...newTest,
                    category: value,
                });
            } else {
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
        setNewTest(prevTest => {
            const updatedValues = [...prevTest.values];
            updatedValues[index] = {
                ...updatedValues[index],
                [name]: value
            };
            return {
                ...prevTest,
                values: updatedValues
            };
        });
    };

    const handleValueChangeMobilityFlexibility = (index, e) => {
        const { name, value, id_limb, muscle } = e.target || {};
        setNewTest(prevTest => {
            const updatedValues = [...prevTest.values];
            updatedValues[index] = {
                ...updatedValues[index],
                [name]: value,
                id_limb: id_limb || '',
                muscle: muscle || '',
            };
            return {
                ...prevTest,
                values: updatedValues,
            };
        });
    };


    const handleValueMaxTestChange = (index, e) => {
        const { name, value } = e.target;
        const updatedValues = [...newMaxPowerTest.values];
        updatedValues[index] = {
            ...updatedValues[index],
            [name]: value,
        };
        setNewMaxPowerTest({ ...newMaxPowerTest, values: updatedValues });
    };

    const handleSaveSuccess = () => {
        setIsSaving(false);
        setIsSaved(true);
        toast.success(testId ? 'Testy boli upravené!' : 'Testy boli pridané!');
        onRequestClose();
        window.location.reload();

        setTimeout(() => {
            setIsSaved(false);
        }, 3000);
    };

    const handleSaveError = (err) => {
        setIsSaving(false);
        toast.error('Chyba pri ukladaní testov!');
        console.error(err);
    };


    const addLimbValue = () => {
        setNewTest({
            ...newTest,
            values: [...newTest.values, { id_limb: '5', value: '', attempt: '', weight: '' }],
        });
    };

    const handleSave = () => {
        setIsSaving(true);
        let testDataToSave = {
            ...newTest,
            metrics: newTest.category === 'Easy Force' ? 'N' : newTest.metrics
        };

        const getApiUrlByCategory = (category, id) => {
            let base = '/api/tests';

            if (category === 'Y Balance Test') base = '/api/y-balance-test';
            if (category === 'Easy Force') base = '/api/easy-force';
            if (category === 'Maximálna sila') base = '/api/max-power-tests';

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

        const handleSaveSuccess = () => {
            setIsSaving(false);
            setIsSaved(true);
            toast.success(testId ? 'Testy boli upravené!' : 'Testy boli pridané!');
            onRequestClose();
            window.location.reload();
            setTimeout(() => setIsSaved(false), 3000);
        };

        const handleSaveError = (err) => {
            setIsSaving(false);
            toast.error('Chyba pri ukladaní testov!');
            console.error(err);
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
                .then(handleSaveSuccess)
                .catch(handleSaveError);
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
                .then(handleSaveSuccess)
                .catch(handleSaveError);
        } else if (newTest.category === 'Mobilita a flexibilita') {
            const promises = muscles.map((muscleName) => {
                const rightValueObj = newTest.values.find(val => val && val.id_limb === '3' && val.muscle === muscleName);
                const leftValueObj = newTest.values.find(val => val && val.id_limb === '4' && val.muscle === muscleName);

                const rightValue = rightValueObj?.value || '';
                const leftValue = leftValueObj?.value || '';

                if (rightValue || leftValue) {
                    const muscleData = {
                        ...testDataToSave,
                        name: muscleName,
                        values: [
                            { id_limb: '3', value: rightValue },
                            { id_limb: '4', value: leftValue },
                        ],
                    };
                    return saveTest(muscleData);
                }
                return null;
            }).filter(promise => promise);

            Promise.all(promises)
                .then(handleSaveSuccess)
                .catch(handleSaveError);
        } else if (newTest.category === 'Skokový profil') {
            const promises = jumpTests.map((test) => {
                const testValues = newTest.values.filter((val) => val.name === test.name);
                const jumpData = {
                    ...testDataToSave,
                    name: test.name,
                    values: testValues,
                };
                return saveTest(jumpData);
            });

            Promise.all(promises)
                .then(handleSaveSuccess)
                .catch(handleSaveError);
        } else if (newTest.category === 'Maximálna sila') {
            const maxPowerData = {
                client_id: newTest.client_id,
                exercise_name: newMaxPowerTest.exercise_name,
                description: newMaxPowerTest.description,
                values: newMaxPowerTest.values,
                category: 'Maximálna sila',
            };

            saveTest(maxPowerData)
                .then(handleSaveSuccess)
                .catch(handleSaveError);
        } else {
            saveTest(testDataToSave)
                .then(handleSaveSuccess)
                .catch(handleSaveError);
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
            {newTest.category === 'Maximálna sila' && (
                <MaxPowerTestForm
                    newTest={newMaxPowerTest}
                    setNewTest={setNewMaxPowerTest}
                    handleValueMaxTestChange={handleValueMaxTestChange}
                />
            )}

            {newTest.category === 'Y Balance Test' && (
                <YBalanceTestForm
                    newTest={newTest}
                    setNewTest={setNewTest}
                    handleValueChange={handleValueChange}
                    addLimbValue={addLimbValue}
                />
            )}

            {newTest.category === 'Easy Force' && (
                <EasyForceForm
                    newTest={newTest}
                    setNewTest={setNewTest}
                    handleValueChange={handleValueChange}
                    addLimbValue={addLimbValue}
                />
            )}

            {newTest.category === 'Mobilita a flexibilita' && (
                <MobilityFlexibilityForm
                    newTest={newTest}
                    setNewTest={setNewTest}
                    handleValueChange={handleValueChangeMobilityFlexibility}
                />
            )}

            {newTest.category === 'Skokový profil' &&
                (<JumpProfileForm
                    newTest={newTest}
                    setNewTest={setNewTest}
                    handleValueChange={handleValueChange}
                />
                )}


            {newTest.category !== 'Easy Force' &&
                newTest.category !== 'Y Balance Test' &&
                newTest.category !== 'Mobilita a flexibilita' &&
                newTest.category !== 'Maximálna sila' &&
                newTest.category !== 'Skokový profil' &&(
                    <GeneralAddTestForm
                        newTest={newTest}
                        handleInputChange={handleInputChange}
                        handleValueChange={handleValueChange}
                        addLimbValue={addLimbValue}
                    />
                )}

            <div className="flex justify-start space-x-2">
                <PrimaryButton disabled={isSaving} onClick={handleSave}>
                    {isSaving ? 'Ukladám test...' : 'Uložiť'}
                </PrimaryButton>

                <Transition
                    show={isSaved}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-gray-600">
                        Uložené.
                    </p>
                </Transition>
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
