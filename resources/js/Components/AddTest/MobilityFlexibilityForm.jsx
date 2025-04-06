import React, { useState } from 'react';

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

const MobilityFlexibilityForm = ({ newTest, handleValueChange }) => {
    const [activeTest, setActiveTest] = useState(null);

    const toggleTest = (muscle) => {
        if (activeTest === muscle) {
            setActiveTest(null); // Zavrie, ak je už otvorený
        } else {
            setActiveTest(muscle); // Otvorí test
        }
    };

    return (
        <div className="space-y-2">
            {muscles.map((name, i) => (
                <div key={i} className="border p-2 rounded-md shadow-sm">
                    <h4
                        className="font-semibold text-sm mb-1 cursor-pointer"
                        onClick={() => toggleTest(name)}
                    >
                        {name} {activeTest === name ? '▲' : '▼'}
                    </h4>
                    {activeTest === name && (
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="block text-xs font-medium">Pravá</label>
                                <input
                                    type="text"
                                    name="value"
                                    value={newTest.values[i * 2]?.value || ''}
                                    onChange={(e) => handleValueChange(i * 2, e)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-1 text-xs"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium">Ľavá</label>
                                <input
                                    type="text"
                                    name="value"
                                    value={newTest.values[i * 2 + 1]?.value || ''}
                                    onChange={(e) => handleValueChange(i * 2 + 1, e)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-1 text-xs"
                                />
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default MobilityFlexibilityForm;
