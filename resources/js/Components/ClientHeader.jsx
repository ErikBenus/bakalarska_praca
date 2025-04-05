import React from 'react';
import { Link } from '@inertiajs/react';

const ClientHeader = ({ client }) => {
    return (
        <div className="flex items-center">
            <h2 className="font-semibold text-xl text-gray-800">
                {client.first_name} {client.last_name}
            </h2>
            <div className="flex gap-2">
                <Link
                    href={`/clients/${client.id}/create-test`}
                    className="ml-4 px-3 py-1 text-sm text-white bg-green-600 rounded-md hover:bg-green-700"
                >
                    Vytvoriť test
                </Link>
                <Link
                    href={`/clients/${client.id}/add-standard-test`}
                    className="px-3 py-1 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                    Pridať štandardizovaný test
                </Link>
            </div>
        </div>
    );
};

export default ClientHeader;
