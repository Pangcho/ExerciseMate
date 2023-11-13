import React, {useEffect, useState} from 'react';
import {Button, Loading, PlusButton, TeamSummaryBox, Hashtag, LinkBox, HorizonLine} from "../UI/UIPackage";
import {CREATE_MATE_TEAM, ENTER_TEAM, MATE_TEAM_LIST, GET_JOINED_TEAMS} from "../../services/api";
import axios from "axios";
import {faHeart, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {functions} from "../../utils/Functions";
import {useNavigate} from "react-router-dom";

const MyTeamList = () => {
    const [joinedTeams, setJoinedTeams] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const getMyTeams = async () => {
        setIsLoading(true)
        const headers = functions.getJWT()
        await axios.get(GET_JOINED_TEAMS + '/', {headers})
            .then(res => setJoinedTeams(res.data))
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }
    const handleTeamClick = (teamId) => {
        navigate(`${ENTER_TEAM}/${teamId}`)
    }
    useEffect(() => {
        getMyTeams().then()
    }, [])
    return (
        <>
            {isLoading && <Loading/>}
            {joinedTeams?.length === 0 && <LinkBox url={MATE_TEAM_LIST} title={'가입한 팀이 없습니다'} content={'팀 가입하러 가기'}/>}
            {joinedTeams?.map((team, index) => (
                <TeamSummaryBox key={index}>
                    <h2>{team.name}</h2>
                    <Hashtag>
                        {team.hashtag.map((hashTag, index) => (
                            <span key={index}>{hashTag}</span>))}
                    </Hashtag>
                    <h3>{team.description}</h3>
                    <div>
                        <div className={'feedback'}>
                            <FontAwesomeIcon icon={faUser}/>
                            <span>{team.members}</span>
                        </div>
                        <Button onClick={() => handleTeamClick(team._id)}>
                            입장
                        </Button>
                    </div>
                    {/*<HorizonLine/>*/}
                </TeamSummaryBox>
            ))}
        </>
    )
}

function MateTeam(props) {
    const [isLoading, setIsLoading] = useState(false)

    const plusMenuItem = [
        ['팀 생성', CREATE_MATE_TEAM],
        ['다른 팀 보기', MATE_TEAM_LIST]
    ]

    return (
        <>
            <br/>
            {isLoading && <Loading/>}
            <MyTeamList/>
            <PlusButton item={plusMenuItem}/>
        </>
    );
}

export default MateTeam;