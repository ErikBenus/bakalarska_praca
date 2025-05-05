import React, {useEffect, useState} from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link} from "@inertiajs/react";
import EasyForceResults from "@/Components/TestResults/EasyForceResults.jsx";
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
import axios from "axios";

export default function ClientDetails({client, clientId}) {
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
        const testingDate = new Date(DateOfTesting);
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

    const handleSave = () => {
        axios.get(`/api/clients/${clientId}/data`)
            .then(response => {
                setClientData(response.data);
            })
            .catch(error => {
                console.error("Chyba pri načítaní dát klienta:", error);
            });
    };

    if (!client) {
        return (
            <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800">Klient nenájdený</h2>}
                                 rightHeader={<CreateTestingButton/>}>
                <Head title="Klient nenájdený"/>
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
                <ClientHeader
                    client={client}
                    onCreateTestClick={openModal}
                    clientId={clientId}
                    onSave={handleSave}
                />
            }
            rightHeader={<CreateTestingButton/>}>
            <Head title={`${client.first_name} ${client.last_name}`}/>

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Informácie o klientovi</h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <h4 className="font-semibold mb-2">Kontaktné údaje</h4>
                                <p>Email: {client.email}</p>
                                {client.phone_number && (
                                    <p>Tel. číslo: {client.phone_number}</p>
                                )}
                                <h4 className="font-semibold mb-2 mt-4">Šport</h4>
                                <p>{clientData && clientData.sport ? clientData.sport : 'Nevenuje sa špecificky žiadnému'}</p>
                                <h4 className="font-semibold mb-2 mt-4">Dátum vytvorenia účtu</h4>
                                <p>{formatDate(client.created_at)}</p>
                            </div>

                            <div>
                                <h4 className="font-semibold mb-2">Biometrické údaje</h4>
                                <div className="space-y-2">
                                    <p>Pohlavie: {client.gender}</p>
                                    {client.dominant_hand && (
                                        <p>Dominantná ruka: {client.dominant_hand}</p>
                                    )}
                                    {client.dominant_leg && (
                                        <p>Dominantná noha: {client.dominant_leg}</p>
                                    )}
                                    {client.birth_date && (
                                        <p>Vek: {calculateAge(client.birth_date, client.created_at)}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold mb-2">Aktuálne biometrické údaje</h4>
                                {clientData && typeof clientData === 'object' ? (
                                    <div className="space-y-2">
                                        {Object.entries(clientData)
                                            .filter(([key, value]) => value !== null && key !== 'id' && key !== 'client_id' && key !== 'updated_at'
                                                && key !== 'limb_lengths' && key !== 'created_at' && key !== 'sport'
                                                && key !== 'first_name' && key !== 'last_name' && key !== 'birth_date')
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
                    <div className="mt-4 inline-flex">
                        <Link
                            href={route('conclusions.client.view', {clientId: client.id})}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Zobraziť odporúčania
                        </Link>
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
