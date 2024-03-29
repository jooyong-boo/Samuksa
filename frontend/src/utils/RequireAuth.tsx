import React from 'react';
import { Navigate } from 'react-router-dom';
import isAdmin from './isAdmin';
const RequireAuth = ({ children }: { children: any }) => {
    const auth = isAdmin();

    if (!auth) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default RequireAuth;
