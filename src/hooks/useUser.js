import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocalStorage } from "./useLocalstorage";

export const useUser = () => {
    const { user, setUser } = useContext(AuthContext);
    const { setItem } = useLocalStorage();

    const addUser = (user) => {
        setUser(user);
        setItem('user', JSON.stringify(user));
    };

    const removeUser = () => {
        setUser(null);
        setItem('user', '');
    };

    return { user, addUser, removeUser };
};