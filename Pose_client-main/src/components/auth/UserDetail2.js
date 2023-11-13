import React from 'react';
import {Container, Input, Button} from '../UI/UIPackage';
import {useLocation, useNavigate} from "react-router-dom";
import {USER_DETAIL_3} from '../../services/api'


function UserDetail2(props) {
    const navigate = useNavigate();

    const location = useLocation()
    const name = location.state?.name || ''
    console.log(location.state)

    const handleButtonClick = (value) => {
        navigate(USER_DETAIL_3, {
            state: {
                ...location.state,
                exercise: value
            }
        })
    }
    return (
        <Container>
            <h2>주로 어떤 운동을 하시나요?</h2>
            <h3 style={{margin: '0 0 -10px 0'}}>{name}님!</h3>
            <h5>하시는 운동에 맞게 추천해드릴게요</h5>

            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '90%'}}>
                <Button onClick={()=>handleButtonClick('헬스')}>헬스</Button>
                <br/>
                <Button onClick={()=>handleButtonClick('홈 트레이닝')}>홈 트레이닝</Button>
            </div>
        </Container>
    );
}

export default UserDetail2;