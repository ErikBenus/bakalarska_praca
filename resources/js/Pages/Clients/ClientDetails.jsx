import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function ClientDetails({ client, tests, clientId }) {
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
                    <p>Email: {client.email}</p>

                    <h3 className="text-lg font-semibold mt-6 mb-4">Zoznam testov</h3>
                    {tests.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Názov testu</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dátum</th>
                            </tr>
                            </thead>
                            <tbody>
                            {tests.map((test) => (
                                <tr key={test.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{test.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{new Date(test.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Žiadne testy pre tohto klienta.</p>
                    )}

                    <div className="mt-6 flex justify-end">
                        <Link href={`/clients/${clientId}/add-standardized-test`} className="px-3 py-1 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 mr-2">
                            Pridať štandardizovaný test
                        </Link>
                        <Link href={`/clients/${clientId}/create-test`} className="px-3 py-1 text-sm text-white bg-green-600 rounded-md hover:bg-green-700">
                            Vytvoriť test
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
