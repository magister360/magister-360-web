// useFetchUsers.ts
import { useState, useEffect, useRef } from 'react';
import { getUsers } from '../services/usersService';
import { Users } from '@prisma/client';

export const useEffectFetchUsers = () => {
    const [users, setUsers] = useState<Users[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const refFetch = useRef<boolean>(false);

    useEffect(() => {
        const fetchDataUsers = async () => {
            setLoading(true);

            try {
                console.log('Se ejecuta promesa users');
                const users = await getUsers();
                setUsers(users ?? []);
            } catch (error) {

                setError('Error al obtener los usuarios');
            } finally {
                setLoading(false);
            }
        };

        if (!refFetch.current) {
            fetchDataUsers();
            refFetch.current = true;
        }
    }, []);

    return { users, loading, error };
};
