import React from 'react';
import {Button} from "./UIPackage";
import {Link} from "react-router-dom";
import {logout} from "../../store/userState";
import {useDispatch} from "react-redux";

export const LogoutButton=()=> {
    const dispatch = useDispatch();

    async function setLogout() {
        dispatch(
            logout()
        )
    }
    return (
        <Link to={'/'}>
            <Button onClick={()=>setLogout()}>
                로그아웃
            </Button>
        </Link>
    );
}

