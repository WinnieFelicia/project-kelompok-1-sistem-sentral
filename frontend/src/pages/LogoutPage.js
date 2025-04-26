import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

export default function LogoutPage() {
  useEffect(() => {
    // Clear auth on mount
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    delete axios.defaults.headers.common['Authorization'];
  }, []);

  // Redirect to login
  return <Navigate to="/login" replace />;
}
