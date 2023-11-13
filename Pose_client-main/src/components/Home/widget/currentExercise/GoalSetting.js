import React, {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {useDispatch} from "react-redux";

import {Container, CustomSelect, Input, Box, Button} from "../../../UI/UIPackage";
import {GOAL_SETTING, CURRENT} from "../../../../services/api";
import {putGoals} from "../../../../store/userState";
import styled from "styled-components";
import {functions} from "../../../../utils/Functions";
import exerciseName from "../../../../config/exercise.json";

const EachGoal=styled(Box)`
  h4{
    margin-left: 20px;
  }
  .setting{
    width: 350px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
  }
  .amount{
    margin-left: 20px;
  }
  input{
    width: 100px;
    height: 50px;
    margin: 0 20px 20px 20px;
  }
  .numError{
    margin-left: 20px;
    color:red;
  }
`

function GoalInput({label, onChange}) {
    const amount = ['매일', '주 5회', '주 3회', '주 2회', '주 1회']
    const [number, setNumber] = useState(0)
    const [cycle, setCycle] = useState('')


    const handleCycleChange = (selectedCycle) => {
        setCycle(selectedCycle)
        onChange(selectedCycle.option, number)
    }


    const handleAmountChange = (e) => {
        const value=e.target.value
        const isNumber = !isNaN(value);
        setNumber(isNumber ? value : 0);
        onChange(cycle.option, value)
    }

    return (
        <EachGoal>
            <h4 >{exerciseName[label]} 목표 설정</h4>
            <div className={'setting'}>
                <div className={'amount'}>
                    <CustomSelect options={amount} item={'운동 주기'} onChange={handleCycleChange}/>
                </div>
                <div>
                    <Input type="number" placeholder='횟수' onChange={handleAmountChange}/>
                    <span>회</span>
                </div>
            </div>
        </EachGoal>
    );
}

function GoalSetting(props) {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate();
    const selectedExercise = location.state?.selected || ''

    const [dDay, setDDay] = useState(null)
    const [goals, setGoals] = useState([])

    const handleDDayChange = e => setDDay(e.target.value)


    const handleGoalInputChange = (selectedCycle, amount, label) => {
        const existingGoal = goals.find((goal) => goal.label === label);
        if (existingGoal) {
            const updatedGoal = { ...existingGoal, cycle: selectedCycle, number: amount };
            const updatedGoals = goals.map((goal) => (goal.label === label ? updatedGoal : goal));
            setGoals(updatedGoals);
        } else {
            setGoals([...goals, { label, cycle: selectedCycle, number: amount }]);
        }
    };
    const handleSubmit = async () => {
        const headers=functions.getJWT()
        const userGoal = {
            dDay: dDay,
            goals: goals
        }
        try {
            await axios.post(GOAL_SETTING, {userGoal}, {headers});
            dispatch(
                putGoals({ dDay: dDay, goals: goals }),)
            alert('목표 설정이 완료되었습니다!');
            navigate(CURRENT, { state: { dDay: dDay, goals: goals }})
        } catch (error) {
            console.error('에러 발생', error);
            alert('목표 설정에 실패했습니다. 다시 시도해주세요.');
        }
    }
    return (
        <Container>
            <h1>목표 설정</h1>
            <Box>
                <h4 style={{marginLeft: "20px"}}>기한 설정</h4>
                <Input type="date" style={{width: "330px", height: "41px", margin: "0 20px 20px 20px"}}
                       onChange={handleDDayChange}/>
            </Box>
            {selectedExercise.map((exercise) => (
                <GoalInput key={exercise} label={exercise}
                           onChange={(cycle, number) => handleGoalInputChange(cycle, number, exercise)}/>
            ))}

            <Button style={{width: '100px'}} onClick={handleSubmit}>완료</Button>
        </Container>
    );
}

export default GoalSetting;
