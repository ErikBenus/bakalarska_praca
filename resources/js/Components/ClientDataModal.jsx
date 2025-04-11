import React from 'react';

const ClientDataModal = ({ clientData, onClose }) => {
    if (!clientData) return null;

    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('sk-SK');
    const calculateAge = (birthDate, createdAt) => {
        const birthDateObj = new Date(birthDate);
        const createdAtObj = new Date(createdAt);
        let age = createdAtObj.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = createdAtObj.getMonth() - birthDateObj.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && createdAtObj.getDate() < birthDateObj.getDate())) {
            age--;
        }
        return age;
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-4xl">
                <h2 className="text-lg font-semibold mb-4">Údaje o klientovi</h2>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-semibold mb-2">Meno a priezvisko</h4>
                            <p>{clientData.first_name} {clientData.last_name}</p>
                            <h4 className="font-semibold mb-2 mt-4">Šport</h4>
                            <p>{clientData.sport || 'Nevenuje sa špecificky žiadnému'}</p>
                            {clientData.birth_date && (
                                <p>Vek: {calculateAge(clientData.birth_date, clientData.created_at)}</p>
                            )}
                        </div>

                        <div>
                            <h4 className="font-semibold mb-2">Aktuálne biometrické údaje</h4>
                            {typeof clientData === 'object' ? (
                                <div className="space-y-2">
                                    {Object.entries(clientData)
                                        .filter(([key, value]) => value !== null && key !== 'id' && key !== 'client_id' && key !== 'updated_at'
                                            && key !== 'limb_lengths' && key !== 'created_at' && key !== 'sport' && key !== 'first_name' && key !== 'last_name' && key !== 'gender' && key !== 'dominant_hand' && key !== 'dominant_leg' && key !== 'birth_date')
                                        .map(([key, value]) => {
                                            const readableKeys = {
                                                weight: 'Váha (kg)',
                                                height: 'Výška (cm)',
                                                body_fat_percent: '% tuku',
                                                muscle_mass: 'Svalová hmota',
                                                bmi: 'BMI',
                                            };

                                            return (
                                                <p key={key}>
                                                    {readableKeys[key] || key}: {String(value)}
                                                </p>
                                            );
                                        })}

                                    {clientData.limb_lengths && clientData.limb_lengths.length > 0 && (
                                        <div>
                                            <ul>
                                                {clientData.limb_lengths.map(limb => (
                                                    <li key={limb.id} className="flex items-center">
                                                        <div className="mr-2">
                                                            {limb.limb_id === 1 ? 'Pravá ruka:' :
                                                                limb.limb_id === 2 ? 'Ľavá ruka:' :
                                                                    limb.limb_id === 3 ? 'Pravá noha:' :
                                                                        limb.limb_id === 4 ? 'Ľavá noha:' :
                                                                            `Končatina ${limb.limb_id}`}
                                                        </div>
                                                        <span>{limb.length} cm</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <p>Žiadne dáta</p>
                            )}
                        </div>
                    </div>
                </div>
                <button onClick={onClose} className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                    Zavrieť
                </button>
            </div>
        </div>
    );
};

export default ClientDataModal;
