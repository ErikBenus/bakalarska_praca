import React, {useEffect, useState} from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import EasyForceResults from "@/Components/TestResults/EasyForceResults.jsx";
import ResultsTestContainer from "@/Components/ResultsTestContainer.jsx";

export default function ClientDetails({ client, tests, clientId }) {
     const [clientData, setClientData] = useState(null);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('sk-SK');
    };

    const calculateAge = (dateOfBirthString) => {
        const today = new Date();
        const birthDate = new Date(dateOfBirthString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();

        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };

    useEffect(() => {
        axios.get(`/api/clients/${clientId}/data`)
            .then(response => {
                setClientData(response.data);
            })
            .catch(error => {
                console.error("Chyba pri načítaní dát klienta:", error);
            });
    }, [clientId]);

    if (!client) {
        return (
            <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800">Klient nenájdený</h2>}>
                <Head title="Klient nenájdený" />
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <p>Klient s ID {clientId} nebol nájdený.</p>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800">{client.first_name} {client.last_name}</h2>}>
            <Head title={`${client.first_name} ${client.last_name}`} />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Informácie o klientovi</h3>
                    <div className="space-y-4">
                        <p>Email: {client.email}</p>
                        {client.phone_number && (
                            <p>Tel. číslo: {client.phone_number}</p>)}

                        <div>
                            {clientData && typeof clientData === 'object' ? (
                                Object.entries(clientData)
                                    .filter(([key, value]) => value !== null && key !== 'id' && key !== 'client_id' && key !== 'updated_at')
                                    .map(([key, value]) => {
                                        const readableKeys = {
                                            sport: 'Šport',
                                            weight: 'Váha (kg)',
                                            height: 'Výška (cm)',
                                            body_fat_percent: '% tuku',
                                            muscle_mass: 'Svalová hmota',
                                            bmi: 'BMI',
                                            created_at: 'Dátum vytvorenia',
                                        };

                                        return (
                                            <div key={key} className="flex items-center mb-2">
                                                <strong className="mr-2">{readableKeys[key] || key}:</strong>
                                                <span>{key === 'created_at' ? new Date(value).toLocaleDateString('sk-SK') : String(value)}</span>
                                            </div>
                                        );
                                    })
                            ) : (
                                <p>Žiadne dáta</p>
                            )}

                            {client && (
                                <>
                                    <div className="flex items-center mb-2">
                                        <strong className="mr-2">Pohlavie:</strong>
                                        <span>{client.gender}</span>
                                    </div>
                                    {client.dominant_hand && (
                                        <div className="flex items-center mb-2">
                                            <strong className="mr-2">Dominantná ruka:</strong>
                                            <span>{client.dominant_hand}</span>
                                        </div>
                                    )}
                                    {client.dominant_leg && (
                                        <div className="flex items-center mb-2">
                                            <strong className="mr-2">Dominantná noha:</strong>
                                            <span>{client.dominant_leg}</span>
                                        </div>
                                    )}
                                    {client.birth_date && (
                                        <div className="flex items-center mb-2">
                                            <strong className="mr-2">Vek:</strong>
                                            <span>{calculateAge(client.birth_date)}</span>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold mt-6 mb-4">Zoznam testov</h3>
                    <ResultsTestContainer
                        title="Easy Force"
                        component={EasyForceResults}
                        parameters={{clientId: client.id}}
                    />

                    <div className="mt-6 flex justify-end">
                        <Link href={`/clients/${clientId}/add-standardized-test`}
                              className="px-3 py-1 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 mr-2">
                            Pridať štandardizovaný test
                        </Link>
                        <Link href={`/clients/${clientId}/create-test`}
                              className="px-3 py-1 text-sm text-white bg-green-600 rounded-md hover:bg-green-700">
                            Vytvoriť test
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
