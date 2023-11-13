import React from 'react';
import {Container,
    NavigationBar,
    LinkBox,
    ExerciseButton,
} from "../components/UI/UIPackage";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {TRAINING, EXERCISE} from '../services/api'
import exerciseImage from '../config/exerciseImagePath.json'
import exerciseName from "../config/exercise.json";
import styled from "styled-components";

const SelectedExerciseBoxWrapper= styled.div`
    display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .exerciseLabel {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: -10px;
    font-weight: bold;
  }

`

const RecBox = ({image, text, label}) => {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate(TRAINING, {
            state: {
                exercise: text,
                    label: label
            }
        })
    }
    const image_url = process.env.PUBLIC_URL + '/' + image
    return (
        <>
            <ExerciseButton onClick={handleButtonClick}>
                <img src={image_url} alt="" className={'exerciseImg'}/>
            </ExerciseButton>
        </>

    );
};
const ExerciseBox = ({goal}) => {
    const {label}= goal
    const image = exerciseImage[label]
    return (
        <div>
            <span className={'exerciseLabel'}>
                {exerciseName[label]}
            </span>
            <RecBox image={image} text={exerciseName[label]} label={label}/>
        </div>
    )
}

function SelectedExercise(props) {
    const goals = useSelector((state) => state.goals)

    return (
        <Container>
            <h1>선택한 운동</h1>
            <SelectedExerciseBoxWrapper>

            {
                Object.values(goals).map((goal, index) => (
                    <ExerciseBox key={index} goal={goal}/>
                ))
            }
            </SelectedExerciseBoxWrapper>

            <br/>
            <LinkBox url={EXERCISE} content={'모든 운동 보기'}/>

            <NavigationBar/>
        </Container>
    );
}

export default SelectedExercise;
