import confetti from "canvas-confetti";
import {logout} from "../store/userState";


export const functions = {
    getJWT: () => {
        const jwt = sessionStorage.getItem('jwt');
        return {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
        };
    },
    particle: () => {   //폭죽
        confetti({
            particleCount: 50,
            spread: 50
        });
    },

    handleJWTError :(error, dispatch, navigate) => {
        if (error.response && error.response.status === 401) {
            console.log('jwt 오류입니다');
            dispatch(logout());
            navigate('/');
        } else {
            console.log(error.response ? error.response.data : error.message);
        }
    }
}
