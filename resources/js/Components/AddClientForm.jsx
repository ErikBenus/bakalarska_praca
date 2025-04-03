import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddClientForm = ({ onCancel }) => {
    const [newClient, setNewClient] = useState({
        first_name: '',
        last_name: '',
        birth_date: '',
        gender: '',
        dominant_hand: '',
        dominant_leg: '',
        sport: '',
        weight: '',
        height: '',
        body_fat_percent: '',
        muscle_mass: '',
        bmi: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewClient({ ...newClient, [name]: value });
    };

    const handleSave = () => {
        axios.post('/api/all-clients', newClient)
            .then(response => {
                toast.success('Klient úspešne pridaný!');
                window.location.reload();
            })
            .catch(error => {
                if (error.response && error.response.status === 422)
                    toast.error('Chyba pri pridávaní klienta!');
            });
    };



    return (
        <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Pridať klienta</h3>
            <div className="mt-2">
                <input
                    type="text"
                    name="first_name"
                    placeholder="Meno"
                    value={newClient.first_name}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    name="last_name"
                    placeholder="Priezvisko"
                    value={newClient.last_name}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newClient.email}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                />
                <input
                    type="date"
                    name="birth_date"
                    placeholder="Dátum narodenia"
                    value={newClient.birth_date}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                />
                <select
                    name="gender"
                    value={newClient.gender}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                >
                    <option value="">Pohlavie</option>
                    <option value="male">Muž</option>
                    <option value="female">Žena</option>
                </select>
                <select
                    name="dominant_hand"
                    value={newClient.dominant_hand}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                >
                    <option value="">Dominantná ruka (voliteľné)</option>
                    <option value="pravá">Pravá</option>
                    <option value="ľavá">Ľavá</option>
                </select>
                <select
                    name="dominant_leg"
                    value={newClient.dominant_leg}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                >
                    <option value="">Dominantná noha (voliteľné)</option>
                    <option value="pravá">Pravá</option>
                    <option value="ľavá">Ľavá</option>
                </select>
                <input
                    type="text"
                    name="sport"
                    placeholder="Šport (voliteľné)"
                    value={newClient.sport}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                />
                <input
                    type="number"
                    name="weight"
                    placeholder="Váha (kg) (voliteľné)"
                    value={newClient.weight}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                />
                <input
                    type="number"
                    name="height"
                    placeholder="Výška (cm) (voliteľné)"
                    value={newClient.height}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                />
                <input
                    type="number"
                    name="body_fat_percent"
                    placeholder="Percento tuku (voliteľné)"
                    value={newClient.body_fat_percent}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                />
                <input
                    type="number"
                    name="muscle_mass"
                    placeholder="Svalová hmota (voliteľné)"
                    value={newClient.muscle_mass}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                />
                <input
                    type="number"
                    name="bmi"
                    placeholder="BMI (voliteľné)"
                    value={newClient.bmi}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                />
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
                    onClick={onCancel}
                >
                    Zrušiť
                </button>
                <ToastContainer />
            </div>
        </div>
    );
};

export default AddClientForm;
