import React, {useEffect, useState} from 'react';
import {Container, NavigationBar, Scroll, ThemeColor, UserBox, UserBoxSize,DoughnutBox} from "../../UI/UIPackage";
import {functions} from "../../../utils/Functions";
import axios from "axios";
import {Doughnut} from "react-chartjs-2";
import {useLocation} from "react-router-dom";
import styled from "styled-components";

import {GET_TEAM_MEMBERS_EXERCISE_STATUS} from "../../../services/api";
import exerciseName from "../../../config/exercise.json";
import {chartData, frontOption, backgroundOptions, backgroundData} from "../../../config/doughnutChart";


const MemberExerciseStatusBox = styled.div`
  > :first-child {
    margin: 20px 0 10px 20px;
  }

  .noUserExerciseData {
    width: 280px;
    height: 50px;
    background-color: ${ThemeColor.containerColor};
    border-radius: 10px;
    font-weight: bold;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
  }
`
const ExerciseStatusBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 290px;
  padding-right: 10px;
  background-color: ${ThemeColor.containerColor};
  border-radius: 20px;
  margin-left: 10px;

  .memberExerciseDetailStatus {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 5px;

  }

  .exerciseLabel {
    font-weight: bold;
    font-size: 15px;
  }
`


const MemberExerciseStatus = ({goal}) => {
    const percent = goal.attain / goal.number * 100

    return (
        <ExerciseStatusBox>
            <DoughnutBox size={'180'}>
                <span className={'back'}>
                    {<Doughnut data={backgroundData} options={backgroundOptions}/>}
                </span>
                <span className={'front'}>
                    {<Doughnut data={chartData(goal.label, percent)} options={frontOption}/>}
                </span>
            </DoughnutBox>
            <div className={'memberExerciseDetailStatus'}>
                <p className={'exerciseLabel'}>{exerciseName[goal.label]}</p>
                <p>달성률 {isNaN(percent) ? '0' : Math.round(percent)}%</p>
                <p>{goal.cycle}</p>
            </div>
        </ExerciseStatusBox>
    )
}

const Carousel = ({componentToRender, data}) => {
    const exercise = data?.exercise ? data.exercise.goals : []

    return (
        <MemberExerciseStatusBox>
            <UserBox name={data.name} size={UserBoxSize.medium} className={'userBox'}/>
            <Scroll>
                {(data?.exercise) ?
                    exercise.map((goal, index) => (
                            <div key={index}>
                                {React.cloneElement(componentToRender, {goal: goal})}
                            </div>
                        )
                    ) :
                    <div className={'noUserExerciseData'}>운동 데이터가 없습니다.</div>
                }
            </Scroll>
        </MemberExerciseStatusBox>

    )
}

function Exercise(props) {

    const [membersExerciseStatus, setMembersExerciseStatus] = useState()

    const location = useLocation()
    const teamId = location.pathname.split('/')[2]

    useEffect(() => {
        // getMembersExerciseStatus().then()
        axios.get(`${GET_TEAM_MEMBERS_EXERCISE_STATUS}/${teamId}`, {headers: functions.getJWT()})
            .then(res => setMembersExerciseStatus(res.data))
            .catch(err => console.error(err))
    }, []);


    return (
        <Container>

            <h4>팀원들의 운동 상태</h4>
            <div style={{width: '390px'}}>

                {
                    membersExerciseStatus?.map((member, index) => (
                        <Carousel key={index} data={member} componentToRender={<MemberExerciseStatus/>}/>
                    ))
                }
            </div>
            <NavigationBar/>

        </Container>
    );
}

export default Exercise;