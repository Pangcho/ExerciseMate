import React, {useRef, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useSelector} from "react-redux";
//회원가입
import Register from "./components/auth/Register";
import UserDetail from "./components/auth/UserDetail";
import UserDetail2 from "./components/auth/UserDetail2";
import UserDetail3 from "./components/auth/UserDetail3";
//홈
import AuthHome from "./pages/AuthHome";
import Account from "./pages/Account";

//실험
import InputToss from "./components/prtc/InputToss";
import InputToss2 from "./components/prtc/InputToss2";

//네비게이션
import EveryExercises from "./components/exercise/EveryExercises";
import Ranking from "./components/ranking/Ranking";
import Training from "./components/exercise/Training";
import UserSetting from "./components/account/UserSetting";
import Mate from "./pages/Mate";

//현재 운동
import WishExercise from "./components/Home/widget/currentExercise/WishExercise";
import GoalSetting from "./components/Home/widget/currentExercise/GoalSetting";
import Current from "./components/Home/widget/currentExercise/Current";
import SelectedExercise from "./pages/SelectedExercise";

//메이트
import RecommendUser from "./components/mate/RecommendUser";
import PostUpload from "./components/mate/PostUpload";
import MyPosts from "./components/mate/MyPosts";
import CreateTeam from "./components/mate/CreateTeam";
import MateTeamList from "./components/mate/MateTeamList";
import MyTeam from "./components/mate/MyTeam";
import UserInformation from "./components/mate/UserInformation";

//URL
import {
    ACCOUNT,
    SELECTED_EXERCISE,
    RANKING,
    MATE,
    RECOMMEND_USER,
    UPLOAD_POST,
    MY_POSTS,
    USER_SETTING,
    EXERCISE,
    TRAINING,
    WISH_EXERCISE,
    GOAL,
    CURRENT,
    NEW_USER,
    USER_DETAIL,
    USER_DETAIL_2,
    USER_DETAIL_3,
    CREATE_MATE_TEAM,
    MATE_TEAM_LIST,
    ENTER_TEAM,
    TEAM_DETAIL,
    USER_INFORMATION
} from './services/api'
import TeamDetail from "./components/mate/teamDetail/TeamDetail";
const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AuthHome/>}/>
                    //네비게이션바
                    <Route path={ACCOUNT} element={<Account/>}/>
                    <Route path={SELECTED_EXERCISE} element={<SelectedExercise/>}/>
                    <Route path={RANKING} element={<Ranking/>}/>
                    <Route path={MATE} element={<Mate/>}/>

                    //유저 세팅
                    <Route path={USER_SETTING} element={<UserSetting/>}/>

                    //운동
                    <Route path={EXERCISE} element={<EveryExercises/>}/>
                    <Route path={TRAINING} element={<Training/>}/>

                    //메이트
                    <Route path={MATE} element={<Mate/>}/>
                    <Route path={RECOMMEND_USER} element={<RecommendUser/>}/>
                    <Route path={UPLOAD_POST} element={<PostUpload/>}/>
                    <Route path={MY_POSTS} element={<MyPosts/>}/>
                    <Route path={CREATE_MATE_TEAM} element={<CreateTeam/>}/>
                    <Route path={MATE_TEAM_LIST} element={<MateTeamList/>}/>
                    <Route path={ENTER_TEAM+'/:teamId'} element={<MyTeam/>}/>
                    <Route path={ENTER_TEAM+'/:teamId'+TEAM_DETAIL} element={<TeamDetail/>}/>
                    <Route path={USER_INFORMATION+'/:userId'} element={<UserInformation/>}/>


                    //현재 유저 운동 상태
                    <Route path={WISH_EXERCISE} element={<WishExercise/>}/>
                    <Route path={GOAL} element={<GoalSetting/>}/>
                    <Route path={CURRENT} element={<Current/>}/>

                    //회원가입
                    <Route path={NEW_USER} element={<Register/>}/>
                    <Route path={USER_DETAIL} element={<UserDetail/>}/>
                    <Route path={USER_DETAIL_2} element={<UserDetail2/>}/>
                    <Route path={USER_DETAIL_3} element={<UserDetail3/>}/>
                    <Route path="/input" element={<InputToss/>}/>
                    <Route path="/input2" element={<InputToss2/>}/>
                </Routes>
            </BrowserRouter>
        </div>

    );
};

export default App;
