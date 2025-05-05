import React, {useState} from 'react';
import TrainerConclusionsModal from "@/Components/Conclusions/TrainerConclusionsModal.jsx";

const ClientHeader = ({client, onCreateTestClick, clientId, onSave}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="flex items-center">
            <h2 className="font-semibold text-xl text-gray-800">
                {client.first_name} {client.last_name}
            </h2>
            <div className="flex gap-2">
                <button
                    onClick={onCreateTestClick}
                    className="ml-4 px-3 py-1 text-sm text-white bg-green-600 rounded-md hover:bg-green-700"
                >
                    Vytvoriť test
                </button>
                <button
                    onClick={openModal}
                    className="px-3 py-1 text-sm text-white bg-blue-800 rounded-md hover:bg-blue-900"
                >
                    Pridať odporúčanie
                </button>
                <TrainerConclusionsModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    clientId={clientId}
                    onSave={onSave}
                />
            </div>
        </div>
    );
};

export default ClientHeader;
