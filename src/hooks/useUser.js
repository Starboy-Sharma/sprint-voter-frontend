import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useLocalStorage } from './useLocalStorage';

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setItem } = useLocalStorage();

  const addUser = (newUser) => {
    console.log('User context set');
    setUser(newUser);
    setItem('user', JSON.stringify(newUser));
  };

  const removeUser = () => {
    setUser(null);
    setItem('user', '');
  };

  return { user, addUser, removeUser };
};
