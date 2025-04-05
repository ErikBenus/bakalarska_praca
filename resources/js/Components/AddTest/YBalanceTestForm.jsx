import React, { useEffect, useState } from 'react';
import axios from 'axios';

const YBalanceTestForm = ({ newTest, setNewTest }) => {
    const [limbs, setLimbs] = useState([]); // Pre uchovávanie končatín (limbs) z tabuľky testing_limb

    useEffect(() => {
        // Načítanie končatín (limb) z API, ktoré sú definované v testing_limb
        axios.get('/api/testing-limbs') // Predpokladáme, že existuje endpoint, ktorý vráti všetky limb hodnoty
            .then(response => {
                setLimbs(response.data); // Uložíme získané údaje do stavu limbs
            })
            .catch(error => {
                console.error('Chyba pri načítaní končatín:', error);
            });

        // Generovanie hodnôt testu
        const generatedValues = [];

        // Pre každý test (Anterior, Posteromedial, Posterolateral) pridáme hodnoty pre končatiny a pokusy
        ['Anterior', 'Posteromedial', 'Posterolateral'].forEach((muscle) => {
            limbs.forEach((limb) => {
                for (let attempt = 1; attempt <= 3; attempt++) {
                    generatedValues.push({
                        id_limb: limb.id,
                        value: '',
                        attempt,
                        muscle, // Nastavíme hodnotu pre sval (Anterior, Posteromedial, Posterolateral)
                    });
                }
            });
        });

        setNewTest(prev => ({
            ...prev,
            name: '',
            values: generatedValues,
        }));
    }, [limbs, setNewTest]);

    const handleValueChange = (index, e) => {
        const updatedValues = [...newTest.values];
        updatedValues[index].value = e.target.value;
        setNewTest({ ...newTest, values: updatedValues });
    };

    return (
        <div>
            {['Anterior', 'Posteromedial', 'Posterolateral'].map((muscle) => (
                <div key={muscle} className="mb-4">
                    <h4 className="font-semibold text-lg mb-2">{muscle}</h4>
                    {newTest.values
                        .map((val, i) => ({val, i}))
                        .filter(({val}) => val.muscle === muscle)
                        .map(({val, i}) => (
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

export default YBalanceTestForm;
