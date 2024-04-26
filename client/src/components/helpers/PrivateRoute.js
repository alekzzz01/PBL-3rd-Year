import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const PrivateRoute = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const isLoggedIn = useAuthStore(state => state.isLoggedIn);
    const isAuthenticated = isLoggedIn(); // Invoking isLoggedIn directly

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (role !== "admin") {
        return <Navigate to="/forbidden" />;
    }
    
   

};

export default PrivateRoute;
