import React, {useState} from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head, usePage } from "@inertiajs/react";
import CreateTestingButton from "@/Components/CreateTestingButton.jsx";
import TrainerConclusionsModal from "@/Components/Conclusions/TrainerConclusionsModal.jsx";
import {usePermissions} from "@/Components/UsePermissions.jsx";

function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('sk-SK', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
}

function ConclusionItem({ conclusion, canEdit, onSave }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleDelete = async () => {
        if (window.confirm('Naozaj chcete odstrániť tento záver?')) {
            try {
                await axios.delete(`/api/conclusions/${conclusion.id}`);
                onSave();
            } catch (err) {
                console.error('Error deleting conclusion:', err);
                alert('Chyba pri odstraňovaní záveru.');
            }
        }
    };

    return (
        <div className="mb-8">
            <p><strong>Záver testovania zo dňa:</strong> {formatDate(conclusion.testing_date)}</p>
            <p><strong>Záver:</strong> {conclusion.final_outcome}</p>
            {canEdit && (
                <div className="flex gap-2 mt-2">
                    <button onClick={openModal} className="px-3 py-1 text-sm text-white bg-blue-800 rounded-md hover:bg-blue-900">Upraviť</button>
                    <button onClick={handleDelete} className="px-3 py-1 text-sm text-white bg-red-600 rounded-md hover:bg-red-700">Odstrániť</button>
                </div>
            )}
            <TrainerConclusionsModal
                isOpen={isModalOpen}
                onClose={closeModal}
                existingConclusion={conclusion}
                onSave={onSave}
            />
        </div>
    );
}

export default function ClientView({ clientId, clientName, conclusions }) {
    const { auth } = usePage().props;
    const { can } = usePermissions();
    const [sortedConclusions, setSortedConclusions] = useState(conclusions.slice().sort((a, b) => new Date(b.testing_date) - new Date(a.testing_date)));

    const handleSave = async () => {
        try {
            const response = await axios.get(`/api/conclusions?client_id=${clientId}`);
            setSortedConclusions(response.data.slice().sort((a, b) => new Date(b.testing_date) - new Date(a.testing_date)));
        } catch (err) {
            console.error('Error fetching conclusions:', err);
        }
    };

    let headerContent = (
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Moje odporúčania
        </h2>
    );

    let pageTitle = 'Moje odporúčania';

    if (can('edit articles')) {
        headerContent = (
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                {clientName} - Odporúčania
            </h2>
        );
        pageTitle = `${clientName} - Odporúčania`;
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={headerContent}
            rightHeader={<CreateTestingButton user={auth.user} />}
        >
            <Head title={pageTitle} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {sortedConclusions.length === 0 ? (
                                <p className="text-gray-600 italic">Žiadne odporúčania ešte neboli pridané.</p>
                            ) : (
                                sortedConclusions.map((conclusion, index) => (
                                    <React.Fragment key={conclusion.id}>
                                        <ConclusionItem
                                            conclusion={conclusion}
                                            canEdit={can('edit articles')}
                                            onSave={handleSave}
                                        />
                                        {index < sortedConclusions.length - 1 && <hr key={`hr-${index}`}/>}
                                    </React.Fragment>
                                ))
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
