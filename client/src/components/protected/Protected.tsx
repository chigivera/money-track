import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import CSideBar from '../sidebar/Sidebar';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { accessToken } = useSelector((store: RootState) => store.user);
    if (!accessToken) {
        return <Navigate to="/login" />; // or return a loading spinner or any other desired behavior
    }

    return  (
        <>
        <CSideBar />
        <main className="flex-1 overflow-y-auto">
        {children}
        </main>
        </>
        
    )
   
};

export default ProtectedRoute;
