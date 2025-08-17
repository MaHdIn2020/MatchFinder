import React, { Children } from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {loading,user} = useAuth()

    if(loading){
        return <div>Loading...</div>
    }

    if(!user){
        return <Navigate to="/login" />
    }
    return children
};

export default PrivateRoute;