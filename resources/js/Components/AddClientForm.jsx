import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';

const AddClientForm = ({ isOpen, onRequestClose, clientId, clientData }) => {
    const [newClient, setNewClient] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
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
        right_arm_length: '',
        left_arm_length: '',
        right_leg_length: '',
        left_leg_length: '',
    });

    useEffect(() => {
        if (clientData) {
            setNewClient(clientData);
        }
    }, [clientData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewClient({ ...newClient, [name]: value });
    };

    const handleSave = () => {
        const url = clientId ? `/api/all-clients/${clientId}` : '/api/all-clients';
        const method = clientId ? 'put' : 'post';
        axios({
            method: method,
            url: url,
            data: newClient,
        })
            .then(response => {
                toast.success(clientId ? 'Klient úspešne aktualizovaný!' : 'Klient úspešne pridaný!');
                onRequestClose();
                window.location.reload();
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {
                    toast.error(clientId ? 'Chyba pri aktualizácii klienta!' : 'Chyba pri pridávaní klienta!');
                }
            });
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Pridať klienta"
            className="bg-white p-4 rounded-md shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3 max-h-screen overflow-y-auto"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
            <h3 className="text-lg font-semibold mb-2">Pridať klienta</h3>
            <div className="mt-2">
                <h4 className="text-md font-semibold mb-1">Osobné údaje</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                    <input type="text" name="first_name" placeholder="Meno" value={newClient.first_name || ""} onChange={handleInputChange} className="border border-gray-300 rounded-md p-1 text-sm w-auto" />
                    <input type="text" name="last_name" placeholder="Priezvisko" value={newClient.last_name || ""} onChange={handleInputChange} className="border border-gray-300 rounded-md p-1 text-sm w-auto" />
                    <input type="email" name="email" placeholder="Email" value={newClient.email || ""} onChange={handleInputChange} className="border border-gray-300 rounded-md p-1 text-sm w-auto" />
                    <input type="phone" name="phone_number" placeholder="Tel.číslo (voliteľné)" value={newClient.phone_number || ""} onChange={handleInputChange} className="border border-gray-300 rounded-md p-1 text-sm w-auto" />
                    <input type="date" name="birth_date" placeholder="Dátum narodenia" value={newClient.birth_date || ""} onChange={handleInputChange} className="border border-gray-300 rounded-md p-1 text-sm w-auto" />
                    <select name="gender" value={newClient.gender || ""} onChange={handleInputChange} className="border border-gray-300 rounded-md p-1 text-sm w-auto">
                        <option value="">Pohlavie</option>
                        <option value="Muž">Muž</option>
                        <option value="Žena">Žena</option>
                    </select>
                </div>
            </div>

            <div className="mt-2">
                <h4 className="text-md font-semibold mb-1">Biometrické údaje</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                    <select name="dominant_hand" value={newClient.dominant_hand || ""} onChange={handleInputChange} className="border border-gray-300 rounded-md p-1 text-sm w-auto">
                        <option value="">Dominantná ruka (voliteľné)</option>
                        <option value="pravá">Pravá</option>
                        <option value="ľavá">Ľavá</option>
                    </select>
                    <select name="dominant_leg" value={newClient.dominant_leg || ""} onChange={handleInputChange} className="border border-gray-300 rounded-md p-1 text-sm w-auto">
                        <option value="">Dominantná noha (voliteľné)</option>
                        <option value="pravá">Pravá</option>
                        <option value="ľavá">Ľavá</option>
                    </select>
                    <input type="text" name="sport" placeholder="Šport (voliteľné)" value={newClient.sport || ""} onChange={handleInputChange} className="border border-gray-300 rounded-md p-1 text-sm w-auto" />
                    <input type="number" name="weight" placeholder="Váha (kg) (voliteľné)" value={newClient.weight || ""} onChange={handleInputChange} className="border border-gray-300 rounded-md p-1 text-sm w-auto" />
                    <input type="number" name="height" placeholder="Výška (cm) (voliteľné)" value={newClient.height || ""} onChange={handleInputChange} className="border border-gray-300 rounded-md p-1 text-sm w-auto" />
                    <input type="number" name="body_fat_percent" placeholder="Percento tuku (voliteľné)" value={newClient.body_fat_percent || ""} onChange={handleInputChange} className="border border-gray-300 rounded-md p-1 text-sm w-auto" />
                    <input type="number" name="muscle_mass" placeholder="Svalová hmota (voliteľné)" value={newClient.muscle_mass || ""} onChange={handleInputChange} className="border border-gray-300 rounded-md p-1 text-sm w-auto" />
                    <input type="number" name="bmi" placeholder="BMI (voliteľné)" value={newClient.bmi || ""} onChange={handleInputChange} className="border border-gray-300 rounded-md p-1 text-sm w-auto" />
                    <input type="number" name="right_arm_length" placeholder="Dĺžka pravej ruky (cm)" value={newClient.right_arm_length || ""} onChange={handleInputChange} className="border border-gray-300 rounded-md p-1 text-sm w-auto" />
                    <input type="number" name="left_arm_length" placeholder="Dĺžka ľavej ruky (cm)" value={newClient.left_arm_length || ""} onChange={handleInputChange} className="border border-gray-300 rounded-md p-1 text-sm w-auto" />
                    <input type="number" name="right_leg_length" placeholder="Dĺžka pravej nohy (cm)" value={newClient.right_leg_length || ""} onChange={handleInputChange} className="border border-gray-300 rounded-md p-1 text-sm w-auto" />
                    <input type="number" name="left_leg_length" placeholder="Dĺžka ľavej nohy (cm)" value={newClient.left_leg_length || ""} onChange={handleInputChange} className="border border-gray-300 rounded-md p-1 text-sm w-auto" />
                </div>
            </div>

            <div className="mt-4 flex justify-end">
                <button className="px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-green-700 mr-2" onClick={handleSave}>Uložiť</button>
                <button className="px-3 py-1 bg-gray-200 text-black text-sm font-medium rounded-md shadow-sm hover:bg-gray-300" onClick={onRequestClose}>Zrušiť</button>
                <ToastContainer />
            </div>
        </Modal>
    );
};

export default AddClientForm;
