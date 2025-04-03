import React from 'react';
import { Link } from '@inertiajs/react';
import {usePermissions} from "@/Components/UsePermissions.jsx";
function CreateTestingButton({ user }) {
    const { can } = usePermissions();

    if (can("edit articles")) {
        return (
            <Link
                href={route('clients.index')}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
                Vytvoriť Testovanie
            </Link>
        );
    }

    return null;
}

export default CreateTestingButton;
