import { useState, useEffect } from 'react';
import axios from 'axios';

export default function TrainerConclusionsModal({ isOpen, onClose, clientId, existingConclusion, onSave }) {
    const [finalOutcome, setFinalOutcome] = useState('');
    const [testingDate, setTestingDate] = useState('');

    useEffect(() => {
        if (existingConclusion) {
            setFinalOutcome(existingConclusion.final_outcome || '');
            setTestingDate(existingConclusion.testing_date || '');
        } else {
            setFinalOutcome('');
            setTestingDate('');
        }
    }, [existingConclusion]);

    const handleSubmit = async () => {
        const payload = {
            client_id: clientId,
            final_outcome: finalOutcome,
            testing_date: testingDate,
        };

        try {
            if (existingConclusion) {
                await axios.put(`/api/conclusions/${existingConclusion.id}`, payload);
            } else {
                await axios.post('/api/conclusions', payload);
            }
            onSave();
            onClose();
        } catch (err) {
            console.error('Error saving conclusion:', err);
            alert('Chyba pri ukladaní záveru.');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Naozaj chcete odstrániť tento záver?')) {
            try {
                await axios.delete(`/api/conclusions/${existingConclusion.id}`);
                onSave();
                onClose();
            } catch (err) {
                console.error('Error deleting conclusion:', err);
                alert('Chyba pri odstraňovaní záveru.');
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 space-y-4">
                <h2 className="text-xl font-bold">{existingConclusion ? 'Upraviť záver' : 'Pridať nový záver'}</h2>

                <textarea
                    className="w-full border rounded p-2"
                    rows="5"
                    placeholder="Zadaj záver testovania..."
                    value={finalOutcome}
                    onChange={(e) => setFinalOutcome(e.target.value)}
                />

                <input
                    type="date"
                    className="w-full border rounded p-2"
                    value={testingDate}
                    onChange={(e) => setTestingDate(e.target.value)}
                />

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 rounded bg-gray-300">Zrušiť</button>
                    {existingConclusion && (
                        <button onClick={handleDelete} className="px-4 py-2 rounded bg-red-600 text-white">Odstrániť</button>
                    )}
                    <button onClick={handleSubmit} className="px-4 py-2 rounded bg-blue-600 text-white">
                        {existingConclusion ? 'Uložiť' : 'Pridať'}
                    </button>
                </div>
            </div>
        </div>
    );
}
