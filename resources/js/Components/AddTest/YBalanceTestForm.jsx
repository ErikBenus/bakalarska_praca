import React, {useState} from 'react';

const YBalanceTestForm = ({newTest, setNewTest}) => {
    const [activeSection, setActiveSection] = useState('Anterior');

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
                    className={`px-4 py-2 rounded-l-md ${activeSection === 'Anterior' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => handleSectionChange('Anterior')}
                >
                    Anterior
                </button>
                <button
                    className={`px-4 py-2 ${activeSection === 'Posteromedial' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => handleSectionChange('Posteromedial')}
                >
                    Posteromedial
                </button>
                <button
                    className={`px-4 py-2 rounded-r-md ${activeSection === 'Posterolateral' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => handleSectionChange('Posterolateral')}
                >
                    Posterolateral
                </button>
            </div>

            <div className="mb-4">
                <h4 className="font-semibold text-base mb-2">{activeSection} Test</h4>
                {newTest.values
                    .map((val, i) => ({val, i}))
                    .filter(({val}) => val.name === activeSection)
                    .map(({val, i}) => (
                        <div key={i} className="grid grid-cols-3 gap-1 mt-1 mb-2">
                            <div className="flex items-center">
                                <span className="text-gray-700 text-xs">
                                    {val.id_limb === '3' ? 'Pravá noha' : 'Ľavá noha'}, pokus {val.attempt}
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
        </div>
    );
};

export default YBalanceTestForm;
