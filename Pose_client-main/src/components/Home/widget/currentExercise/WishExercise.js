import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Button, Container, NavigationBar, rainbowAnimation, ThemeColor} from "../../../UI/UIPackage";
import styled from "styled-components";
import exerciseName from "../../../../config/exercise.json";
import {GOAL} from "../../../../services/api";


const Box = styled.div`
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin-bottom: 37px;
  width: 370px;
`

const WishList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${ThemeColor.containerColor};
  border-radius: 16px;
  padding: 0 20px;
  margin-bottom: 20px;
  margin-left: 15px;
  width: 300px;
  height: 41px;
`
const SelectButton = styled.button`
  width: 70px;
  height: 29px;
  border: none;
  border-radius: 16px;
  padding: 0 1px;
  font-family: 'Inter', sans-serif;
  background-color: ${ThemeColor.buttonColor};
  box-sizing: border-box;
  margin: 10px -12px 10px 0;
  font-size: 16px;

  &:focus {
    outline: none;
    border: 2px solid;
    animation: ${rainbowAnimation} 5s linear infinite;
  }
`
const H4 = styled.h4`
  margin-left: 20px;
`

function ExerciseButton({onClick, selected}) {
    const buttonText = selected ? '취소' : '선택';

    return (
        <SelectButton
            onClick={onClick}
            style={{
                width: '70px',
                height: '29px',
                padding: '0 1px',
                margin: '10px -12px 10px 0',
                backgroundColor: selected ? ThemeColor.buttonColor : ThemeColor.disabledButtonColor
            }}
        >
            {buttonText}
        </SelectButton>
    );
}

function ExerciseItem({exercise, onClick, selected}) {
    return (
        <WishList>
            <p>{exercise}</p>
            <ExerciseButton onClick={onClick} selected={selected}/>
        </WishList>
    );
}

function WishExercise(props) {
    const navigate = useNavigate();


    const [selectedExercises, setSelectedExercises] = useState({
        squat: false,
        // lunge: false,
        // deadLift: false,
        // plank: false,
        // crunch: false,
        legRaise: false,
        pushUp: false,
        shoulderPress: false,
        // dumbbellRow: false,
        // hammerCurl: false
        side:false,
        dumbbellCurl:false,
        sitUp:false
    });
    const trueExercises = Object.keys(selectedExercises).filter(exercise => selectedExercises[exercise]);
    const handleButtonClick = () => {
        navigate(GOAL, {
            state:{
                selected:[...trueExercises]
            }
        });
    }
    const handleExerciseSelection = (exercise) => {
        setSelectedExercises(prevState => ({
            ...prevState,
            [exercise]: !prevState[exercise]
        }));
    };

    const is3Selected = trueExercises.length >= 3;
    const buttonStyle={
       backgroundColor:is3Selected?ThemeColor.buttonColor:ThemeColor.disabledButtonColor,
    }
    return (
        <Container>
            <h1>하고 싶은 운동 선택</h1>
            <h3>3개 이상 골라주세요!</h3>
            <Box>
                <H4>하체 운동</H4>
                <ExerciseItem exercise={exerciseName.squat}
                              onClick={() => handleExerciseSelection('squat')}
                              selected={selectedExercises.squat}/>
                {/*<ExerciseItem exercise={exerciseName.lunge}*/}
                {/*              onClick={() => handleExerciseSelection('lunge')}*/}
                {/*              selected={selectedExercises.lunge}/>*/}
                {/*<ExerciseItem exercise={exerciseName.deadLift}*/}
                {/*              onClick={() => handleExerciseSelection('deadLift')}*/}
                {/*              selected={selectedExercises.deadLift}/>*/}

            </Box>
            <Box>
                <H4>복근 운동</H4>
                <ExerciseItem
                    exercise={exerciseName.situp}
                    onClick={() => handleExerciseSelection('sitUp')}
                    selected={selectedExercises.sitUp}/>
                {/*<ExerciseItem*/}
                {/*    exercise={exerciseName.crunch}*/}
                {/*    onClick={() => handleExerciseSelection('crunch')}*/}
                {/*    selected={selectedExercises.crunch}/>*/}
                <ExerciseItem
                    exercise={exerciseName.legRaise}
                    onClick={() => handleExerciseSelection('legRaise')}
                    selected={selectedExercises.legRaise}/>
            </Box>
            <Box>
                <H4>상체 운동</H4>
                <ExerciseItem
                    exercise={exerciseName.pushUp}
                    onClick={() => handleExerciseSelection('pushUp')}
                    selected={selectedExercises.pushUp}/>
                <ExerciseItem
                    exercise={exerciseName.shoulderPress}
                    onClick={() => handleExerciseSelection('shoulderPress')}
                    selected={selectedExercises.shoulderPress}/>
                <ExerciseItem
                    exercise={exerciseName.side}
                    onClick={() => handleExerciseSelection('side')}
                    selected={selectedExercises.side}/>
                <ExerciseItem
                    exercise={exerciseName.dumbbell_curl}
                    onClick={() => handleExerciseSelection('dumbbellCurl')}
                    selected={selectedExercises.dumbbellCurl}/>

            </Box>
            <h4>선택한 운동 {trueExercises.length}개</h4>

            <Button style={{width: '100px', ...buttonStyle}}   disabled={!is3Selected}   onClick={handleButtonClick}>다음</Button>

            <NavigationBar/>

        </Container>
    );
}

export default WishExercise;