import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';
import AddClientForm from '@/Components/AddClientForm.jsx';
import {usePermissions} from "@/Components/UsePermissions.jsx";
import {toast, ToastContainer} from "react-toastify";



export default function ClientsIndex({ clients }) {
    const [filter, setFilter] = useState('');
    const [showAddClientForm, setShowAddClientForm] = useState(false);
    const [clientId, setClientId] = useState(null);
    const [clientData, setClientData] = useState(null);
    const openModal = () => {
        setShowAddClientForm(!showAddClientForm);
    };
    const closeModal = () => setShowAddClientForm(false);
    const { can } = usePermissions();


    const handleEdit = (id) => {
        axios.get(`/api/all-clients/${id}/edit`)
            .then(response => {
                const user = response.data;
                user.clients_data = undefined;
                const mergedData = {
                    ...user,
                    ...user.clients_data
                };
                delete mergedData.clients_data;
                setClientData(mergedData);
                setClientId(id);
                setShowAddClientForm(true);
            })
            .catch(error => {
                console.error("Chyba pri načítaní údajov klienta:", error);
                toast.error('Chyba pri načítaní údajov klienta!');
            });
    };

    const handleDelete = (id) => {
        if (window.confirm("Naozaj chcete odstrániť tohto klienta?")) {
            axios.delete(`/api/all-clients/${id}`)
                .then(() => {
                    toast.success('Klient úspešne odstránený!');
                    window.location.reload();
                })
                .catch(error => {
                    console.error("Chyba pri odstraňovaní klienta:", error);
                    toast.error('Chyba pri odstraňovaní klienta!');
                });
        }
    };

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
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Detail
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Edit</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Zmazať</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {clients
                                .filter((client) =>
                                    client.last_name.toLowerCase().startsWith(filter.toLowerCase())
                                )
                                .map((client) => (
                                    <tr key={client.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">{client.first_name} {client.last_name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{client.email}</td>


                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <Link href={`/clients/${client.id}`} className="text-blue-600 hover:text-blue-800">
                                                Zobraziť detaily
                                            </Link>

                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <button
                                                onClick={() => handleEdit(client.id)}
                                                className="px-3 py-1 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                                            >
                                                Editovať
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <button
                                                onClick={() => handleDelete(client.id)}
                                                className="px-3 py-1 text-sm text-white bg-red-600 rounded-md hover:bg-red-700"
                                            >
                                                Zmazať
                                            </button>
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
                            <AddClientForm isOpen={showAddClientForm}
                                           onRequestClose={closeModal} clientId={clientId} clientData={clientData}/>
                        )}
                        <ToastContainer />
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }
}
