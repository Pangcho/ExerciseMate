import React from 'react';
import {useSelector} from "react-redux";

import Login from "../components/auth/Login";
import Home from "../components/Home/Home";

function AuthHome(props) {
    const isAuth = Boolean(useSelector((state) => state.token))

    return (
        <>
            {
                isAuth ?
                    <Home/>
                    :
                    <Login/>
            }
        </>
    );
}

export default AuthHome;
