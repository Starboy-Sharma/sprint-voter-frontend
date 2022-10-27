import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useAuth } from '../hooks/useAuth'

export function RequireAuth() {

    useAuth();
    const {user} = useContext(AuthContext);
    const location = useLocation();

    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        user ? <Outlet />
            : <Navigate to="/login"  state={{ from: location }} replace />
    )
}