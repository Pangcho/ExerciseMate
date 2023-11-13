import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {ENTER_TEAM, TEAM_DETAIL} from "../../../services/api";
import {functions} from "../../../utils/Functions";
import axios from "axios";
import {GET_JOINED_TEAM_INFO} from "../../../services/api";
import styled from  "styled-components";
import {fadeIn, ThemeColor} from "../../UI/UIPackage";

const TeamInfoBox=styled.div`
  background-color: ${ThemeColor.containerColor};
  border-radius: 16px;
  padding: 10px;
  margin: 20px 0;
  width: 339px;
  animation: ${fadeIn} 0.7s ease;


  .teamName {
    font-size: 1.3rem;
    margin: 5px;
  }

  .notice, .free, .anonymous, .exercise {
    margin: 10px 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;

  }

  .title {
    font-size: 1rem;
    font-weight: bold;
    margin-right: 10px;
  }

  .content {
    display: inline-block;
    width: 230px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

  }
`

const TeamInfo=({team})=>{
    const navigate=useNavigate()
    const {name:teamName, description:teamDesc, _id:teamId}=team

    const handleButtonClick=(detailPage)=>{
        navigate(ENTER_TEAM + '/' + teamId + TEAM_DETAIL, {
            state: {
                detailPage: detailPage,
                name: teamName,
                desc: teamDesc
            }
        })
    }
    return(
        <TeamInfoBox>
            <h4 className={'teamName'}>{team.name}</h4>
            <div className={'notice'} onClick={() => handleButtonClick('TEAM_NOTICE')}>
                <span className={'title'}>공지</span>
                <span className={'content'}>{team.notice?.noticeContent}</span>
            </div>
            <div className={'free'} onClick={() => handleButtonClick('TEAM_BOARD')}>
                <span className={'title'}>자유게시판</span>
                <span className={'content'}>{team.freeBoard?.postContent}</span>
            </div>
            <div className={'anonymous'} onClick={() => handleButtonClick('TEAM_BOARD')}>
                <span className={'title'}>익명게시판</span>
                <span className={'content'}>{team.anonymousBoard?.postContent}</span>
            </div>
            <div className={'exercise'} onClick={() => handleButtonClick('TEAM_EXERCISE')}>
                메이트 팀원들의 운동 현황 보러가기
            </div>
        </TeamInfoBox>
    )
}

function MateTeamExerciseState(props) {
    const [teamInfo, setTeamInfo]=useState()


    useEffect(() => {
        const headers=functions.getJWT()
        axios.get(GET_JOINED_TEAM_INFO, {headers:headers})
            .then(res => setTeamInfo(res.data))
            .catch(err => console.log(err))
    }, []);
    // console.log(teamInfo)

    return (
        <div>
            {
                teamInfo?.map((team, index) => (
                    <TeamInfo key={index} team={team}/>
                ))
            }
        </div>
    );
}

export default MateTeamExerciseState;