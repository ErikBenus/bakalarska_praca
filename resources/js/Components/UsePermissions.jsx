import { useEffect, useState } from 'react';
import axios from 'axios';

export function usePermissions() {
    const [permissions, setPermissions] = useState(null);

    useEffect(() => {
        axios
            .get('/user-permissions')
            .then((response) => setPermissions(response.data.permissions))
            .catch((error) => console.error('Chyba pri načítaní oprávnení', error));
    }, []);

    const can = (permission) => permissions?.includes(permission) ?? false;

    return { permissions, can };
}
