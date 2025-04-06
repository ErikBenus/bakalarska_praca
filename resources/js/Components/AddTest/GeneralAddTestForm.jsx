import React from 'react';

const GeneralAddTestForm = ({ newTest, handleInputChange, handleValueChange, addLimbValue }) => {

    return (
        <>
            <input
                type="text"
                name="name"
                placeholder="Názov testu"
                value={newTest.name || ""}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            />
            <input
                type="text"
                name="metrics"
                placeholder="Metrika (napr. sekundy, kg...)"
                value={newTest.metrics || ""}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            />
            <textarea
                name="description"
                placeholder="Popis (voliteľné)"
                value={newTest.description || ""}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            />

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
                            value={val.id_limb ?? "5"}
                            onChange={(e) => handleValueChange(index, e)}
                            className="border border-gray-300 rounded-md p-2"
                        >
                            <option value="5">Zvoľte končatinu (voliteľné)</option>
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
        </>
    );
};

export default GeneralAddTestForm;
