import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

export default function LogoutPage() {
  useEffect(() => {

    localStorage.removeItem('token');
    localStorage.removeItem('username');
    delete axios.defaults.headers.common['Authorization'];
  }, []);

  return <Navigate to="/login" replace />;
}
