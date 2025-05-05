import React, {useState} from 'react';

const jumpTests = {
    obojnozne: [
        {name: 'RSI', id_limb: 5},
        {name: 'GCT', id_limb: 5},
        {name: 'CMJ', id_limb: 5},
        {name: 'SJ', id_limb: 5},
        {name: 'H', id_limb: 5},
    ],
    pravaNoha: [
        {name: 'CMJ Right', id_limb: 3},
        {name: 'SJ Right', id_limb: 3},
    ],
    lavaNoha: [
        {name: 'CMJ Left', id_limb: 4},
        {name: 'SJ Left', id_limb: 4},
    ],
};

const JumpProfileForm = ({newTest, setNewTest}) => {
    const [activeSection, setActiveSection] = useState('obojnozne');

    const handleValueChange = (index, e) => {
        const updatedValues = [...newTest.values];
        updatedValues[index].value = e.target.value;
        setNewTest({...newTest, values: updatedValues});
    };

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    return (
        <div>
            <div className="flex justify-center mb-4">
                <button
                    className={`px-4 py-2 rounded-l-md ${activeSection === 'obojnozne' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => handleSectionChange('obojnozne')}
                >
                    Obojnožné skoky
                </button>
                <button
                    className={`px-4 py-2 ${activeSection === 'pravaNoha' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => handleSectionChange('pravaNoha')}
                >
                    Pravá noha
                </button>
                <button
                    className={`px-4 py-2 rounded-r-md ${activeSection === 'lavaNoha' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => handleSectionChange('lavaNoha')}
                >
                    Ľavá noha
                </button>
            </div>

            {jumpTests[activeSection].map((test) => (
                <div key={test.name} className="mb-4">
                    <h4 className="font-semibold text-base mb-2">{test.name}</h4>
                    {newTest.values
                        .map((val, i) => ({val, i}))
                        .filter(({val}) => val.name === test.name)
                        .map(({val, i}) => (
                            <div key={i} className="grid grid-cols-3 gap-1 mt-1 mb-2">
                                <div className="flex items-center">
                                    <span className="text-gray-700 text-xs">
                                        {test.id_limb === 3
                                            ? 'Pravá noha'
                                            : test.id_limb === 4
                                                ? 'Ľavá noha'
                                                : 'Obe nohy'
                                        }, pokus {val.attempt}
                                    </span>
                                </div>
                                <input
                                    type="number"
                                    placeholder="Hodnota"
                                    value={val.value || ''}
                                    onChange={(e) => handleValueChange(i, e)}
                                    className="border border-gray-300 rounded-md p-2 text-sm"
                                />
                            </div>
                        ))}
                </div>
            ))}
        </div>
    );
};

export default JumpProfileForm;
