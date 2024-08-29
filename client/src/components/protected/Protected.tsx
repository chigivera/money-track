import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store/store';
import CSideBar from '../sidebar/Sidebar';
import { auth } from '../../store/slice/userSlice';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { accessToken, authenticated } = useSelector((store: RootState) => store.user);

    useEffect(() => {
        if (accessToken && !authenticated) {
            dispatch(auth(accessToken));
        }
    }, [accessToken, authenticated, dispatch]);

    // Redirect to login if there is no access token
    if (!accessToken) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <CSideBar />
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </>
    );
};

export default ProtectedRoute;