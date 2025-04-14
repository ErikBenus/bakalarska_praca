import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head, usePage } from "@inertiajs/react";
import CreateTestingButton from "@/Components/CreateTestingButton.jsx";
import axios from "axios";
import * as response from "autoprefixer";

response.data.clientCount = undefined;
response.data.testCount = undefined;
response.data.latestClients = undefined;
response.data.latestTests = undefined;

export default function TrainerDashboard() {
    const { auth } = usePage().props;
    const [clientCount, setClientCount] = useState(0);
    const [testCount, setTestCount] = useState(0);
    const [latestClients, setLatestClients] = useState([]);
    const [latestTests, setLatestTests] = useState([]);

    useEffect(() => {
        axios.get('/api/trainer/dashboard')
            .then(response => {
                setClientCount(response.data.clientCount);
                setTestCount(response.data.testCount);
                setLatestClients(response.data.latestClients);
                setLatestTests(response.data.latestTests);
            })
            .catch(error => {
                console.error("Chyba pri načítaní dát dashboardu:", error);
            });
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Ahoj, {auth.user.first_name} {auth.user.last_name}!
                </h2>
            }
            rightHeader={
                <CreateTestingButton user={auth.user} />
            }
        >
            <Head title="Dashboard trénera" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-4">Štatistiky</h3>
                            <p>Počet klientov: {clientCount}</p>
                            <p>Počet testov: {testCount}</p>
                        </div>

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-4">Najnovší klienti</h3>
                            <ul>
                                {latestClients.map(client => (
                                    <li key={client.id} className="mb-2">
                                        {client.first_name} {client.last_name}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-4">Najnovšie testy</h3>
                            <ul>
                                {latestTests.map(test => (
                                    <li key={test.id} className="mb-2">
                                        {test.user ? `${test.name} - ${test.user.first_name} ${test.user.last_name}` : `${test.name} - Neznámy klient`}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
