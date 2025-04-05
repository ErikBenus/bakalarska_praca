import React, { useEffect } from 'react';

const EasyForceForm = ({ newTest, setNewTest }) => {
    useEffect(() => {
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

        setNewTest(prev => ({
            ...prev,
            name: '',
            metrics: 'N',
            values: generatedValues,
        }));
    }, [setNewTest]);

    const handleValueChange = (index, e) => {
        const updatedValues = [...newTest.values];
        updatedValues[index].value = e.target.value;
        setNewTest({ ...newTest, values: updatedValues });
    };

    return (
        <div>
            {['Quadriceps', 'Hamstring'].map((muscle) => (
                <div key={muscle} className="mb-4">
                    <h4 className="font-semibold text-lg mb-2">{muscle}</h4>
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
            ))}
        </div>
    );
};

export default EasyForceForm;
