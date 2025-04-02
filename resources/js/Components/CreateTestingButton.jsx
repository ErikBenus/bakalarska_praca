import React from 'react';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from "react";
import axios from "axios";
function CreateTestingButton({ user }) {
        const [permissions, setPermissions] = useState([]);

        useEffect(() => {
            axios.get("/user-permissions")
                .then(response => setPermissions(response.data.permissions))
                .catch(error => console.error("Chyba pri načítaní oprávnení", error));
        }, []);


    if (permissions.includes("edit articles")) {
        return (
            <Link
                href={route('all-tests.index')}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
                Vytvoriť Testovanie
            </Link>
        );
    }

    return null;
}

export default CreateTestingButton;
