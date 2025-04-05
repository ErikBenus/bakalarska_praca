import React from 'react';
import { Link } from '@inertiajs/react';

const ClientHeader = ({ client,  onCreateTestClick }) => {
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
            </div>
        </div>
    );
};

export default ClientHeader;
