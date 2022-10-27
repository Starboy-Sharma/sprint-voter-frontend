import { useNavigate, Outlet } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useAuth } from '../hooks/useAuth';

export function RequireAuth() {
  useAuth();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.log('Redirecting to login....');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  }, [user]);

  return user && <Outlet />;
}
