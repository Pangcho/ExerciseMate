import React, {useEffect, useState} from 'react';
import {functions} from "../../utils/Functions";
import axios from "axios";
import {ENTER_TEAM, GET_ALL_TEAMS, JOIN_TEAM} from "../../services/api";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {Button, Loading, TeamSummaryBox, Hashtag, Container} from "../UI/UIPackage";
import {useNavigate} from "react-router-dom";

const JoinButton=(teamId)=>{
    const [isLoading, setIsLoading] = useState(false)
    const [joinedMsg, setJoinedMsg] = useState()

    const navigate = useNavigate()

    const joinTeam = async (teamId) => {
        const headers = functions.getJWT()
        setIsLoading(true)
        axios.post(JOIN_TEAM, {teamId}, {headers: headers})
            .then(res => setJoinedMsg(res.data))
            .catch(err => console.log(err))
            .finally(() => {
                setIsLoading(false)
            })
    }
    const handleTeamClick = (teamId) => {
        navigate(`${ENTER_TEAM}/${teamId.teamId}`)
    }
    return(
        <>
        <Button onClick={() => joinTeam(teamId)} style={{display:joinedMsg?'none':'block'}}>
            {isLoading ? <Loading/> : <span>가입하기</span>}
        </Button>
        <Button onClick={() => handleTeamClick(teamId)} style={{display:joinedMsg?'block':'none'}}>입장</Button>
        </>
    )
}

function MateTeamList() {
    const [teams, setTeams] = useState()
    const getTeams = async () => {
        const headers = functions.getJWT()
        axios.get(GET_ALL_TEAMS, {headers})
            .then(res => setTeams(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getTeams().then()
    }, [])
    return (
        <Container>
            <h3>메이트 팀 목록</h3>
            {teams?.map((team, index) => (
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
                        {/*<Button onClick={() => joinTeam(team._id)}>*/}
                        {/*    {isLoading ? <Loading/> : '가입하기'}*/}
                        {/*</Button>*/}
                        <JoinButton teamId={team._id}/>
                    </div>
                </TeamSummaryBox>
            ))}
        </Container>
    )
}

export default MateTeamList;