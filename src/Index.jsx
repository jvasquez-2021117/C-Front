import React, { createContext, useContext, useEffect, useState } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { App } from './App';
import { SellPage } from './pages/SellPage';
import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/RegisterPage';
import { UsersView } from './pages/AdminPages/UsersView';
import { HistoryView } from './pages/AdminPages/HistoryView';
import { Profile } from './pages/Profile';

export const AuthContext = createContext();

export const Index = () => {

    const [loggedIn, setLoggedIn] = useState(true);
    const [dataUser, setDataUser] = useState({
        id: '',
        name: '',
        phone: '',
        email: '',
        role: ''
    });

    useEffect(() => {
        setLoggedIn(false)
        let token = localStorage.getItem('token');
        if (token) {
            setLoggedIn(true);
            // Recupera los datos del usuario de localStorage
            const userData = JSON.parse(localStorage.getItem('userData'));
            setDataUser(userData);
        }
    }, [loggedIn]); 

    const handleLogout = () => {
        setLoggedIn(false);
        setDataUser({
            id: '',
            name: '',
            phone: '',
            email: '',
            role: ''
        });
    };


    const routes = createBrowserRouter([
        {
            path: '',
            element: <App></App>,
            errorElement: <NotFoundPage></NotFoundPage>,
            children: [
                {
                    path: '/',
                    element: dataUser.role === 'ADMIN' ? <Navigate to={'/admin/users'}></Navigate>:<HomePage></HomePage>
                },
                {
                    path: '/login',
                    element: <LoginPage></LoginPage>
                },
                {
                    path: '/register',
                    element: <RegisterPage></RegisterPage>
                },
                {
                    path: '/sell',
                    element: loggedIn ? <SellPage></SellPage> : <Navigate to={'/login'}></Navigate>
                },
                {   
                    path: '/admin/users',
                    element: dataUser.role === 'ADMIN' ? <UsersView></UsersView> : <NotFoundPage></NotFoundPage>
                },
                {
                    path: '/admin/history/:name/:id',
                    element: dataUser.role === 'ADMIN' ? <HistoryView></HistoryView> : <NotFoundPage></NotFoundPage>
                },
                {
                    path: '/profile',
                    element: <Profile></Profile>
                }
            ]
        }
    ]);
    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn, dataUser, setDataUser, handleLogout }}>
            <RouterProvider router={routes} />
        </AuthContext.Provider>
    )
}