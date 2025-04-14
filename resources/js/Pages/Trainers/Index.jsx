import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head} from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';
import AddTrainerForm from '@/Components/AddTrainerForm.jsx';
import { usePermissions } from "@/Components/UsePermissions.jsx";
import { toast, ToastContainer } from "react-toastify";

export default function TrainersIndex({ trainers }) {
    const [filter, setFilter] = useState('');
    const [showAddTrainerForm, setShowAddTrainerForm] = useState(false);
    const [trainerId, setTrainerId] = useState(null);
    const [trainerData, setTrainerData] = useState(null);
    const openModal = () => {
        setShowAddTrainerForm(!showAddTrainerForm);
    };
    const closeModal = () => setShowAddTrainerForm(false);
    const { can } = usePermissions();

    const handleEdit = (id) => {
        axios.get(`/api/all-trainers/${id}/edit`)
            .then(response => {
                setTrainerData(response.data);
                setTrainerId(id);
                setShowAddTrainerForm(true);
            })
            .catch(error => {
                console.error("Chyba pri načítaní údajov trénera:", error);
                toast.error('Chyba pri načítaní údajov trénera!');
            });
    };

    const handleDelete = (id) => {
        if (window.confirm("Naozaj chcete odstrániť tohto trénera?")) {
            axios.delete(`/api/all-trainers/${id}`)
                .then(() => {
                    toast.success('Tréner úspešne odstránený!');
                    window.location.reload();
                })
                .catch(error => {
                    console.error("Chyba pri odstraňovaní trénera:", error);
                    toast.error('Chyba pri odstraňovaní trénera!');
                });
        }
    };

    const handlePromotion = (id) => {
        if (window.confirm("Naozaj chceš zmeniť rolu tomuto trénerovi na ADMINA?")) {
            axios.post(`/api/all-trainers/${id}/promote`)
                .then(() => {
                    toast.success('Tréner úspešne zmenený na Admina');
                    window.location.reload();
                })
                .catch(error => {
                    console.error("Chyba pri zmene trénera na Admina:", error);
                    toast.error('Chyba pri zmene trénera na Admina!');
                });
        }
    };

    if (can('edit articles')) {
        return (
            <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800">Správa trénerov</h2>}>
                <Head title="Tréneri" />

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
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Pridať právomoci</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Edit</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Zmazať</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {trainers
                                .filter((trainer) =>
                                    trainer.last_name.toLowerCase().startsWith(filter.toLowerCase())
                                )
                                .map((trainer) => (
                                    <tr key={trainer.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">{trainer.first_name} {trainer.last_name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{trainer.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <button
                                                onClick={() => handlePromotion(trainer.id)}
                                                className="px-3 py-1 text-sm text-white bg-gray-400 rounded-md hover:bg-gray-600"
                                            >
                                                Povýšiť na admina
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <button
                                                onClick={() => handleEdit(trainer.id)}
                                                className="px-3 py-1 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                                            >
                                                Editovať
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <button
                                                onClick={() => handleDelete(trainer.id)}
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
                                Pridať trénera
                            </button>
                        </div>

                        {showAddTrainerForm && (
                            <AddTrainerForm
                                isOpen={showAddTrainerForm}
                                onRequestClose={closeModal}
                                trainerId={trainerId}
                                trainerData={trainerData}
                            />
                        )}
                        <ToastContainer />
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }
}
