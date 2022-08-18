import React from 'react';
import { Navigate } from 'react-router-dom';
import isAdmin from './isAdmin';
const PublicAuth = ({ children }: { children: any }) => {
    const auth = isAdmin();

    if (!!auth) {
        return <Navigate to="/" />;
    }
    return children;
};

export default PublicAuth;
