import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {Button, Container, TeamInfoBox} from "../UI/UIPackage";
import axios from "axios";
import {GET_TEAM_INFO, QUIT_TEAM, MATE, TEAM_DETAIL, ENTER_TEAM} from "../../services/api";
import {functions} from "../../utils/Functions";


const MyTeam = () => {
    const [teamInfo, setTeamInfo] = useState()
    const location = useLocation()
    const teamId = location.pathname.split('/')[2]
    const navigate = useNavigate()
    const getTeamInfo = async () => {
        const headers = functions.getJWT()
        await axios.get(GET_TEAM_INFO + '/' + teamId, {headers})
            .then(res => setTeamInfo(res.data))
            .catch(err => console.log(err))
    }
    const handleButtonClick = (detailPage) => {
        navigate(ENTER_TEAM + '/' + teamId + TEAM_DETAIL, {
            state: {
                detailPage: detailPage,
                name: teamInfo.name,
                desc: teamInfo.description
            }
        })
    }
    const handleQuitButtonClick = async () => {
        const headers = functions.getJWT()
        await axios.delete(QUIT_TEAM + '/' + teamId, {headers})
            .then(() => navigate(MATE))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getTeamInfo().then()
    }, [])


    return (
        <Container>
            <h1>{teamInfo?.name}</h1>
            <h3 style={{marginTop: '0px', maxWidth: '300px'}}>{teamInfo?.description}</h3>
            <TeamInfoBox onClick={() => handleButtonClick('TEAM_NOTICE')}>
                <h2>공지</h2>
                {teamInfo?.notice.length === 0 && <p id='empty'>공지가 없습니다</p>}
                {teamInfo?.notice.map((notice, index) => (
                    <div className={'board'} key={index}>
                        <span className={'title'}>{notice.noticeTitle}</span>
                        <span className={'content'}>{notice.noticeContent}</span>
                    </div>
                ))}
            </TeamInfoBox>
            <TeamInfoBox onClick={() => handleButtonClick('TEAM_BOARD')}>
                <h2>게시글</h2>
                <div className={'board'}>
                    <span className={'boardProperty'}>자유게시판</span>
                    {teamInfo?.freeBoard.length === 0 ? <span id='empty'>게시글이 없습니다</span> :
                        <span className={'content'}>{teamInfo?.freeBoard[0].postTitle}</span>
                    }
                </div>
                <div className={'board'}>
                    <span className={'boardProperty'}>익명게시판</span>
                    {teamInfo?.anonymousBoard.length === 0 ? <span id='empty'>게시글이 없습니다</span> :
                        <span className={'content'}>{teamInfo?.anonymousBoard[0].postTitle}</span>
                    }
                </div>
            </TeamInfoBox>
            <TeamInfoBox onClick={() => handleButtonClick('TEAM_EXERCISE')}>
                <h2>운동</h2>
                 <p className={'goal'}>팀원들의 운동 상태 확인</p>
            </TeamInfoBox>
            <div style={{width: '330px', display: 'flex', justifyContent: 'space-between'}}>

                <TeamInfoBox style={{width: '150px'}} onClick={() => handleButtonClick('TEAM_CHAT')}>
                    <h2>채팅</h2>
                        <p className={'chatCount'}>채팅방 입장</p>
                </TeamInfoBox>
                <TeamInfoBox style={{width: '150px'}} onClick={() => handleButtonClick('TEAM_MEMBERS')}>
                    <h2>회원</h2>
                    <span className={'members'}>방장 {teamInfo?.host}님</span>
                    <span className={'members'}>외 {teamInfo?.memberCount - 1}명 →</span>
                </TeamInfoBox>
            </div>
            <br/>
            <Button style={{width: '120px'}} onClick={handleQuitButtonClick}>탈퇴하기</Button>

        </Container>
    );
}

export default MyTeam;