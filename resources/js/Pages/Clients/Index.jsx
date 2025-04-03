import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AddClientForm from '@/Components/AddClientForm.jsx';
import {usePermissions} from "@/Components/UsePermissions.jsx";

export default function ClientsIndex({ clients }) {
    const { auth } = usePage().props;
    const [permissions, setPermissions] = useState([]);
    const [filter, setFilter] = useState('');
    const [showAddClientForm, setShowAddClientForm] = useState(false);

    const openModal = () => {
        setShowAddClientForm(!showAddClientForm);
    };
    const closeModal = () => setShowAddClientForm(false);

    const handleSaveClient = (newClient) => {
        axios.post('/api/all-clients', newClient)
            .then(response => {
                if (response.status === 201) {
                    alert('Klient úspešne pridaný!');
                    window.location.reload();
                } else {
                    alert('Chyba pri pridávaní klienta!');
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {
                    const errorMessages = error.response.data.errors;
                    let errorMessage = '';
                    for (const field in errorMessages) {
                        errorMessage += `${field}: ${errorMessages[field].join(', ')}\n`;
                    }
                    alert(errorMessage);
                } else {
                    console.error('Chyba pri pridávaní klienta:', error);
                    alert('Chyba pri pridávaní klienta!');
                }
            });
    };



    useEffect(() => {
        axios
            .get('/user-permissions')
            .then((response) => setPermissions(response.data.permissions))
            .catch((error) => console.error('Chyba pri načítaní oprávnení', error));
    }, []);

    const { can } = usePermissions();

    if (can('edit articles')) {
        return (
            <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800">Správa klientov</h2>}>
                <Head title="Klienti" />

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <input
                            type="text"
                            placeholder="Filtruj podľa priezviska..."
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                        />

                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                            <tr className="bg-gray-50">
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meno</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Akcie</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {clients
                                .filter((client) =>
                                    client.last_name.toLowerCase().startsWith(filter.toLowerCase())
                                )
                                .map((client) => (
                                    <tr key={client.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {client.first_name} {client.last_name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{client.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Link
                                                href={`/clients/${client.id}/add-test`}
                                                className="px-3 py-1 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                                            >
                                                Pridať test
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={openModal}
                                className="px-3 py-1 text-sm text-white bg-green-600 rounded-md hover:bg-green-700"
                            >
                                Pridať klienta
                            </button>
                        </div>

                        {showAddClientForm && (
                            <AddClientForm onSave={handleSaveClient} onCancel={closeModal}/>
                        )}
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }
}
