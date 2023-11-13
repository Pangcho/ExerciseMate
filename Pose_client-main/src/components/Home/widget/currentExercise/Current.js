import React from 'react';
import {Doughnut} from "react-chartjs-2";
import {useSelector} from "react-redux";
import styled from "styled-components";

import {Box, Container, NavigationBar, LinkBox, DoughnutBox} from "../../../UI/UIPackage";
import exerciseName from "../../../../config/exercise.json";
import {WISH_EXERCISE} from "../../../../services/api";
import {chartData, frontOption, backgroundOptions, backgroundData} from "../../../../config/doughnutChart";


const Label = styled.h4`
  margin-left: 20px;
  margin-bottom: 5px;
`


const InfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
  .infoBox{
    display: flex;
    flex-direction: row;
    width: 130px;
    height: 60px;
    border-radius: 16px;
    margin: 15px 0 0 0;
  }
  .detailInfo{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .title{
    font-weight: bold;
    margin-left: 12px;
  }
  .content{
    margin-left: 10px;
    margin-top: -10px;
  }
`

const ExerciseDataChart = ({data, exercise}) => {
    return (
        <DoughnutBox size='205'>
            <span className={'back'}>
                {<Doughnut data={backgroundData} options={backgroundOptions}/>}
            </span>
            <span className={'front'}>
                {<Doughnut data={chartData(exercise, data) } options={frontOption}/>}
            </span>
        </DoughnutBox>
    )
}
const EachExercise = ({dDay, goal}) => {
    const year = dDay.substring(2, 4)
    const month = dDay.substring(5, 7)
    const day = dDay.substring(8, 10)


    const {label, cycle, number: goalNum, attain} = goal
    const percent = attain / goalNum * 100

    return (
        <Box>
            <Label>{exerciseName[label]}</Label>
            <InfoWrapper>
                <ExerciseDataChart data={percent} exercise={exerciseName[label]}/>
                <div>
                    <div className={'infoBox'}>
                        <div className='detailInfo'>
                            <p className='title'>목표 날짜</p>
                            <p className='content'>{year}년 {month}월 {day}일</p>
                        </div>
                    </div>
                    <div className={'infoBox'}>
                        <div className='detailInfo'>
                            <p className='title'>달성률</p>
                            <p className='content'>
                                {isNaN(percent) ? '0' : Math.round(percent)}%
                            </p>
                        </div>
                        <div className='detailInfo'>
                            <p className='title'>주기</p>
                            <p className='content'>{cycle}</p>
                        </div>
                    </div>
                    <div className={'infoBox'}>
                        <div className='detailInfo'>
                            <p className='title'>목표치</p>
                            <p className='content'>{goalNum}회</p>
                        </div>
                        <div className='detailInfo'>
                            <p className='title'>달성량</p>
                            <p className='content'>{attain??'0'}회</p>
                        </div>
                    </div>
                </div>
            </InfoWrapper>
        </Box>
    )
}

function Current(props) {
    const { name, dDay, goals } = useSelector(state => state);

    return (
        <Container>
            <h1>{name}님의 현재 운동</h1>
            { goals.map((goal, index) => <EachExercise key={index} dDay={dDay} goal={goal}/>) }
            <LinkBox url={WISH_EXERCISE} content={'새로운 운동 선택'}/>
            <br/>
            <NavigationBar/>
        </Container>
    );
}

export default Current;
