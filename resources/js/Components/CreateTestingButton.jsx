import React from 'react';
import {Link} from '@inertiajs/react';
import {usePermissions} from "@/Components/UsePermissions.jsx";

function CreateTestingButton() {
    const {can} = usePermissions();

    if (can("edit articles")) {
        return (
            <Link
                href={route('clients.index')}
                className="px-3 py-1 text-sm text-white bg-gray-800 rounded-md hover:bg-gray-900"
            >
                Zobraziť klientov
            </Link>
        );
    }

    return null;
}

export default CreateTestingButton;
