// useFetchUsers.ts
import { useState, useEffect, useRef } from 'react';
import { getUsers } from '../services/usersService';
import { Users } from '@prisma/client';

export const useEffectFetchUsers = () => {
    const [users, setUsers] = useState<Users[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const refFetch = useRef<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchDataUsers = async () => {
            setIsLoading(true)

            try {
                
                const users = await getUsers();
                setUsers(users ?? []);
            } catch (error) {

                setError('Error al obtener los usuarios');
            } finally {
                setIsLoading(false)
            }
        };

        if (!refFetch.current) {
            fetchDataUsers();
            refFetch.current = true;
        }
    }, []);

    return { users, loading, error };
};
