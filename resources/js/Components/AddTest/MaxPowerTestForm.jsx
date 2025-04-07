import React, {useEffect, useState} from 'react';
import axios from 'axios';

const MaxPowerTestForm = ({ newTest, setNewTest, handleValueMaxTestChange }) => {
    useEffect(() => {
        if (newTest.values && newTest.values.length > 0) {
            const updatedValues = newTest.values.map((val, index) => ({
                ...val,
                attempt: index + 1,
            }));
            setNewTest({ ...newTest, values: updatedValues });
        }
    }, []);

    const addAttempt = () => {
        if (newTest.values.length < 10) {
            const newAttempt = newTest.values.length + 1;
            setNewTest({
                ...newTest,
                values: [...newTest.values, { weight: '', mean_ms: '', average: '', attempt: newAttempt, id_limb: '5' }],
            });
        }
    };

    return (
        <>
            <input
                type="text"
                name="exercise_name"
                placeholder="Názov cvičenia"
                value={newTest.exercise_name}
                onChange={(e) => setNewTest({...newTest, exercise_name: e.target.value})}
                className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            />
            <textarea
                name="description"
                placeholder="Popis (voliteľné)"
                value={newTest.description}
                onChange={(e) => setNewTest({...newTest, description: e.target.value})}
                className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            />

            <div className="mb-2">
                {newTest.values.map((val, index) => (
                    <div key={index} className="grid grid-cols-4 gap-2 mb-2">
                        <input
                            type="number"
                            name="weight"
                            placeholder="Váha (kg)"
                            value={val.weight}
                            onChange={(e) => handleValueMaxTestChange(index, e)}
                            className="border border-gray-300 rounded-md p-2"
                        />
                        <input
                            type="number"
                            name="mean_ms"
                            placeholder="Mean m/s"
                            value={val.mean_ms}
                            onChange={(e) => handleValueMaxTestChange(index, e)}
                            className="border border-gray-300 rounded-md p-2"
                        />
                        <input
                            type="number"
                            name="average"
                            placeholder="Average"
                            value={val.average}
                            onChange={(e) => handleValueMaxTestChange(index, e)}
                            className="border border-gray-300 rounded-md p-2"
                        />
                        <select
                            name="id_limb"
                            value={val.id_limb ?? "5"}
                            onChange={(e) => handleValueMaxTestChange(index, e)}
                            className="border border-gray-300 rounded-md p-2"
                        >
                            <option value="5">Končatina</option>
                            <option value="1">Pravá ruka</option>
                            <option value="2">Ľavá ruka</option>
                            <option value="3">Pravá noha</option>
                            <option value="4">Ľavá noha</option>
                        </select>
                    </div>
                ))}
                <button
                    onClick={addAttempt}
                    className="text-sm text-blue-600 hover:underline mb-4"
                >
                    + Pridať pokus
                </button>
            </div>
        </>
    );
};

export default MaxPowerTestForm;
