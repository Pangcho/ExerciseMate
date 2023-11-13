import React, {useState} from 'react';
import {useLocation} from "react-router-dom";
import Like, {SlidingComponent} from "./Like";
import PoseNetprtc from "./PoseNetprtc";
import {
    CommentsList, FeedbackButton,
    FeedbackList,
    Input,
    Loading,
    NoticeBox,
    ThemeColor,
    UserBoxSize,
    UserProfile
} from "../UI/UIPackage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment} from "@fortawesome/free-solid-svg-icons";

function InputToss2(props) {
    const location = useLocation()
    //연습
    const content = location.state?.content || ''

    const name = location.state?.name || ''
    const email = location.state?.email || ''
    const password = location.state?.password || ''
    const age = location.state?.age || ''
    const area = location.state?.area || ''
    const height = location.state?.height || ''
    const weight = location.state?.weight || ''
    const sex = location.state?.sex || ''
    const exercise = location.state?.exercise || ''
    const wishList = location.state?.wishList || ''



    return (
        <>
            <div>전달받은 값</div>
            <p>{content}</p>
            <p>{name}</p>
            <p>{email}</p>
            <p>{password}</p>
            <p>{age}</p>
            <p>{area}</p>
            <p>{height}</p>
            <p>{weight}</p>
            <p>{sex}</p>
            <p>{exercise}</p>
            <p>{wishList}</p>
            <Like text={'like'}/>
            {/*<PoseNetprtc/>*/}
            <div style={{width:'300px'}}>

            <SlidingComponent/>
            </div>
        </>
    );
}

export default InputToss2;


