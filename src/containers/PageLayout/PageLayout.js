import React from 'react';
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import { Route, Routes } from "react-router-dom";
import Dashboard from '../../components/Dashboard/Dashboard';
import LinkedAccounts from '../../components/LinkedAccounts/LinkedAccounts';
import { useCookies } from 'react-cookie';
import SpotifyCallback from '../../components/SpotifyCallback/SpotifyCallback';

const PageLayout = (props) => {

    const [cookies, setCookie] = useCookies(['token']);
    let token = cookies.token;
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/linked-accounts" element={<LinkedAccounts />} />
                <Route path="/linked-accounts/spotify" element={<SpotifyCallback />} />
                <Route component={Login} />
            </Routes>
        </>
    )

}

export default PageLayout;