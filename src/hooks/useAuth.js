import { useEffect } from 'react';
import { useLocalStorage } from './useLocalstorage';
import {  useUser } from './useUser'; 

export const useAuth = () => {

    const { user, addUser, removeUser } = useUser();
    const { getItem } = useLocalStorage();

    useEffect(() => {
        // if user is already logged in, then add the user to the app.
        const user = JSON.parse(getItem('user'));
        if (user) {
            addUser(user);
        }
    }, []);

    const login = (user) => {
        addUser(user);
    };

    const logout = (user) => removeUser(user);

    return { user, login, logout };
}