import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';

const AddTrainerForm = ({ isOpen, onRequestClose, trainerId, trainerData }) => {
    const [newTrainer, setNewTrainer] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        birth_date: '',
        gender: '',
    });

    useEffect(() => {
        if (trainerData) {
            setNewTrainer(trainerData);
        }
    }, [trainerData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTrainer({ ...newTrainer, [name]: value });
    };

    const handleSave = () => {
        const url = trainerId ? `/api/all-trainers/${trainerId}` : '/api/all-trainers';
        const method = trainerId ? 'put' : 'post';
        axios({
            method: method,
            url: url,
            data: newTrainer,
        })
            .then(response => {
                toast.success(trainerId ? 'Tréner úspešne aktualizovaný!' : 'Tréner úspešne pridaný!');
                onRequestClose();
                window.location.reload();
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {
                    toast.error(trainerId ? 'Chyba pri aktualizácii trénera!' : 'Chyba pri pridávaní trénera!');
                }
            });
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Pridať trénera"
            className="bg-white p-6 rounded-md shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
            <h3 className="text-lg leading-6 font-medium text-gray-900">Pridať trénera</h3>
            <div className="mt-2">
                <input
                    type="text"
                    name="first_name"
                    placeholder="Meno"
                    value={newTrainer.first_name || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    name="last_name"
                    placeholder="Priezvisko"
                    value={newTrainer.last_name || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newTrainer.email || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                />
                <input
                    type="phone"
                    name="phone_number"
                    placeholder="Tel.číslo (voliteľné)"
                    value={newTrainer.phone_number || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                />
                <input
                    type="date"
                    name="birth_date"
                    placeholder="Dátum narodenia"
                    value={newTrainer.birth_date || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                />
                <select
                    name="gender"
                    value={newTrainer.gender || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                >
                    <option value="">Pohlavie</option>
                    <option value="Muž">Muž</option>
                    <option value="Žena">Žena</option>
                </select>
            </div>
            <div className="mt-4 flex justify-end">
                <button
                    className="px-4 py-2 bg-green-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-green-700 mr-2"
                    onClick={handleSave}
                >
                    Uložiť
                </button>
                <button
                    className="px-4 py-2 bg-gray-200 text-black text-base font-medium rounded-md shadow-sm hover:bg-gray-300"
                    onClick={onRequestClose}
                >
                    Zrušiť
                </button>
                <ToastContainer />
            </div>
        </Modal>
    );
};

export default AddTrainerForm;
