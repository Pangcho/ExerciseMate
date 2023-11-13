import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate,} from "react-router-dom";
import axios from "axios";


import {ACCOUNT, WISH_EXERCISE, GET_USER_FULL_INFO} from '../../services/api'
import {getUserFullInfo} from "../../store/userState";


import {
    Container,
    UserBox,
    NavigationBar,
    UserBoxSize,
    LinkBox,
    LogoutButton
} from '../UI/UIPackage';

import CurrentExercise from "./widget/currentExercise/CurrentExercise";
import StateOfMate from "./widget/StateOfMate";
import MateTeamExerciseState from "./widget/MateTeamExerciseState";
import {functions} from "../../utils/Functions";


const DecimalDay = () => {
    const [remainingTime, setRemainingTime] = useState(null);
    const [initGoalExecuted, setInitGoalExecuted] = useState(false);
    const dDay = useSelector((state) => state.dDay)
    const goalMonth = dDay?.substring(5, 7).replace(/^0+/, '');
    const goalDay = dDay?.substring(8, 10).replace(/^0+/, '');

    let targetDate, now, timeDifference;
    const calculateRemainingTime = () => {

        targetDate = new Date(dDay)
        now = new Date();
        timeDifference = targetDate - now;
        if (timeDifference <= 0) {
            setRemainingTime('이벤트가 종료되었습니다.');
            setInitGoalExecuted(true)
            return timeDifference;
        }

        const oneDay = 1000 * 60 * 60 * 24;
        const oneHour = 1000 * 60 * 60;
        const oneMinute = 1000 * 60;
        const oneSecond = 1000;

        const days = Math.floor(timeDifference / oneDay);
        const hours = Math.floor((timeDifference % oneDay) / oneHour);
        const minutes = Math.floor((timeDifference % oneHour) / oneMinute);
        const seconds = Math.floor((timeDifference % oneMinute) / oneSecond);

        setRemainingTime(`${days}일 ${hours}시간 : ${minutes}분 : ${seconds}초 남음`);
    };

    useEffect(() => {
        const intervalId = setInterval(calculateRemainingTime, 1000);
        return () => clearInterval(intervalId);
    }, [dDay]);
    return (
        <>
            {dDay ? (
                <>
                    {goalMonth && goalDay && <h3>{`${goalMonth}월 ${goalDay}일 까지`}</h3>}
                    {dDay && <div>{remainingTime}</div>}
                    <br/>
                    {initGoalExecuted && <LinkBox url={WISH_EXERCISE} content={'운동 선택하러 가기'}/>}
                </>
            ) : (
                <>

                </>
            )}

        </>
    )
}

function Home(props) {
    const {name, email} = useSelector((state) => state)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getUserInfo = async () => {
        try {
            const headers = functions.getJWT()
            const res = await axios.get(GET_USER_FULL_INFO, {headers: headers})

            const {followers, following, goal, setting, ...userData} = res.data;
            const followersList = followers.length > 0 ? followers : null;
            const followingList = following.length > 0 ? following : null;
            const {dDay, goals} = goal || {};

            dispatch(getUserFullInfo({
                ...userData,
                followers: followersList,
                following: followingList,
                dDay,
                goals,
                setting
            }));
        } catch (error) {
            console.error(error)
            functions.handleJWTError(error, dispatch, navigate)
        }
    }
    useEffect(() => {
        getUserInfo().then()
    }, [])

    return (
        <Container>
            <h1>운동 메이트</h1>
            <DecimalDay/>
            <br/>
            <br/>
            <Link to={ACCOUNT} style={{textDecoration: 'none', color: 'black'}}>
                    <UserBox name={name} email={email} size={UserBoxSize.large}/>
            </Link>
            <br/>
            <br/>
            <CurrentExercise/>
            <br/>
            <br/>
            <StateOfMate/>
            <br/>
            <br/>
            <MateTeamExerciseState/>
            <br/>
            <br/>

            <LogoutButton/>
            <br/>
            <NavigationBar/>
        </Container>
    );
}

export default Home;
