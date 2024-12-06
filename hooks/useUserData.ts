import { useState, useEffect } from 'react';

export const useUserData = (key: string) => {
    const [userData, setUserData] = useState<string | null>(() => {
        // Initialize userData from localStorage immediately
        return localStorage.getItem(key);
    });

    useEffect(() => {
        const data = localStorage.getItem(key);
        setUserData(data); // Update state if needed
    }, [key]);

    const updateUserData = (data: string) => {
        localStorage.setItem(key, data);
        setUserData(data);
    };

    const removeUserData = () => {
        localStorage.removeItem(key);
        setUserData(null);
    };

    return { userData, updateUserData, removeUserData };
};