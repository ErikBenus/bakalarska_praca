import React, {useEffect, useState} from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import EasyForceResults from "@/Components/TestResults/EasyForceResults.jsx";
import ResultsTestContainer from "@/Components/ResultsTestContainer.jsx";
import CreateTestingButton from "@/Components/CreateTestingButton.jsx";
import ClientHeader from "@/Components/ClientHeader.jsx";
import AddTestForm from "@/Components/AddTest/CreateTestModal.jsx";
import SectionRenderer from "@/Components/SectionRenderer.jsx";
import SectionButtons from "@/Components/TestResults/SectionButtons.jsx";
import MaxPowerResults from "@/Components/TestResults/MaxPowerResults.jsx";
import YBalanceTestResults from "@/Components/TestResults/YBalanceTestResults.jsx";
import AerobicCapacityResults from "@/Components/TestResults/AerobicCapacityResults.jsx";
import SpeedAbilityResults from "@/Components/TestResults/SpeedAbilityResults.jsx";
import MuscleEnduranceResults from "@/Components/TestResults/MuscleEnduranceResults.jsx";
import ExplosivePowerResults from "@/Components/TestResults/ExplosivePowerResults.jsx";
import JumpProfileResults from "@/Components/TestResults/JumpProfileResults.jsx";
import MobilityFlexibilityResults from "@/Components/TestResults/MobilityFlexibilityResults.jsx";
import SpecialTestResults from "@/Components/TestResults/SpecialTestResults.jsx";


export default function ClientDetails({ client, tests, clientId }) {
    const [clientData, setClientData] = useState(null);
    const [showAddTestForm, setShowAddTestForm] = useState(false);
    const [activeSection, setActiveSection] = useState(null);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('sk-SK');
    };

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    const sectionComponents = {
        'Easy Force': EasyForceResults,
        'Maximálna sila': MaxPowerResults,
        'Y Balance Test': YBalanceTestResults,
        'Aeróbna kapacita': AerobicCapacityResults,
        'Rychlostné schopnosti': SpeedAbilityResults,
        'Svalová vytrvalosť': MuscleEnduranceResults,
        'Vybušná sila': ExplosivePowerResults,
        'Skokový profil': JumpProfileResults,
        'Mobilita a flexibilita': MobilityFlexibilityResults,
        'Špeciálne testy': SpecialTestResults,
    };

    const calculateAge = (dateOfBirthString, DateOfTesting) => {
        const testingDate = new Date(DateOfTesting)
        const birthDate = new Date(dateOfBirthString);
        let age = testingDate.getFullYear() - birthDate.getFullYear();
        const month = testingDate.getMonth() - birthDate.getMonth();

        if (month < 0 || (month === 0 && testingDate.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };

    const openModal = () => {
        setShowAddTestForm(!showAddTestForm);
    };
    const closeModal = () => setShowAddTestForm(false);


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
            <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800">Klient nenájdený</h2>}
            rightHeader={<CreateTestingButton/>}>
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
        <AuthenticatedLayout
            header={
                <ClientHeader client={client} onCreateTestClick={openModal} />
        }
            rightHeader={<CreateTestingButton/>}>
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
                                            <span>{calculateAge(client.birth_date, client.created_at)}</span>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold mt-6 mb-4">Zoznam testov</h3>
                    <div className="flex justify-center mb-4">
                        <SectionButtons
                            sections={sectionComponents}
                            activeSection={activeSection}
                            onSectionChange={handleSectionChange}
                        />
                    </div>
                </div>
                <SectionRenderer
                    sections={sectionComponents}
                    activeSection={activeSection}
                    parameters={{clientId: client.id}}
                />
            </div>
            {showAddTestForm && (
                <AddTestForm
                    isOpen={showAddTestForm}
                    onRequestClose={closeModal}
                    testData={{
                    client_id: client.id,
                    name: '',
                    category: '',
                    metrics: '',
                    description: '',
                    values: [],
                }}
            />)}
        </AuthenticatedLayout>
    );
}
