import React, {useState} from 'react';

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

const MobilityFlexibilityForm = ({handleValueChange}) => {
    const [selectedMuscle, setSelectedMuscle] = useState('');
    const [muscleValues, setMuscleValues] = useState([]);

    const addMuscleValue = () => {
        if (selectedMuscle) {
            setMuscleValues([
                ...muscleValues,
                {muscle: selectedMuscle, right: '', left: ''},
            ]);
            setSelectedMuscle('');
        }
    };

    const handleMuscleValueChange = (index, side, value) => {
        const updatedValues = [...muscleValues];
        updatedValues[index][side] = value;
        setMuscleValues(updatedValues);

        const muscleIndex = muscles.indexOf(updatedValues[index].muscle);
        if (muscleIndex !== -1) {
            handleValueChange(muscleIndex * 2, {
                target: {
                    value: updatedValues[index].right,
                    name: 'value',
                    id_limb: '3',
                    muscle: updatedValues[index].muscle
                }
            }); // Pravá
            handleValueChange(muscleIndex * 2 + 1, {
                target: {
                    value: updatedValues[index].left,
                    name: 'value',
                    id_limb: '4',
                    muscle: updatedValues[index].muscle
                }
            }); // Ľavá
        }
    };

    return (
        <div className="space-y-2">
            <select
                value={selectedMuscle}
                onChange={(e) => setSelectedMuscle(e.target.value)}
                className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            >
                <option value="">Vyberte sval</option>
                {muscles.map((muscle) => (
                    <option key={muscle} value={muscle}>
                        {muscle}
                    </option>
                ))}
            </select>
            <button
                onClick={addMuscleValue}
                className="text-sm text-blue-600 hover:underline mb-4"
            >
                + Pridať hodnotu
            </button>
            {muscleValues.map((muscleValue, index) => (
                <div key={index} className="border p-2 rounded-md shadow-sm">
                    <h4 className="font-semibold text-sm mb-1">{muscleValue.muscle}</h4>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="block text-xs font-medium">Pravá</label>
                            <input
                                type="text"
                                value={muscleValue.right}
                                onChange={(e) => handleMuscleValueChange(index, 'right', e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-1 text-xs"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium">Ľavá</label>
                            <input
                                type="text"
                                value={muscleValue.left}
                                onChange={(e) => handleMuscleValueChange(index, 'left', e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-1 text-xs"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MobilityFlexibilityForm;
