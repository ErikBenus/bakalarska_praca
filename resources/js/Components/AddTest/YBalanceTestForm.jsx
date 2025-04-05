import React, { useEffect, useState } from 'react';

const YBalanceTestForm = ({ newTest, setNewTest }) => {
    const [activeTest, setActiveTest] = useState(null); // Track which test is expanded
    const [generatedValues, setGeneratedValues] = useState([]);


    const handleValueChange = (index, e) => {
        const updatedValues = [...newTest.values];
        updatedValues[index].value = e.target.value;
        setNewTest({ ...newTest, values: updatedValues });
    };

    const toggleTest = (muscle) => {
        if (activeTest === muscle) {
            setActiveTest(null); // Close if already open
        } else {
            setActiveTest(muscle); // Open the test
        }
    };

    return (
        <div>
            {['Anterior', 'Posteromedial', 'Posterolateral'].map((muscle) => (
                <div key={muscle} className="mb-4">
                    <button
                        onClick={() => toggleTest(muscle)}
                        className="font-semibold text-lg mb-2 w-full text-left bg-gray-200 p-2 rounded-md">
                        {muscle} Test
                    </button>
                    {activeTest === muscle && (
                        <div className="grid grid-cols-1 gap-4 mt-2">
                            {newTest.values
                                .map((val, i) => ({ val, i }))
                                .filter(({ val }) => val.muscle === muscle)
                                .map(({ val, i }) => (
                                    <div key={i} className="grid grid-cols-3 gap-2 mb-2">
                                        <div className="flex items-center">
                                            <span className="text-gray-700 text-sm">
                                                {val.id_limb === '3' ? 'Pravá noha' : 'Ľavá noha'}, pokus {val.attempt}
                                            </span>
                                        </div>
                                        <input
                                            type="number"
                                            placeholder="Hodnota"
                                            value={val.value || ''}
                                            onChange={(e) => handleValueChange(i, e)}
                                            className="border border-gray-300 rounded-md p-2"
                                        />
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default YBalanceTestForm;
