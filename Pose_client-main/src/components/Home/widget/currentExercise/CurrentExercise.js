import React from 'react';
import {Scroll, ThemeColor, LinkBox, fadeIn, DoughnutBox} from "../../../UI/UIPackage";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {Doughnut} from "react-chartjs-2";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {CURRENT, WISH_EXERCISE} from "../../../../services/api";
import exerciseName from "../../../../config/exercise.json";
import {chartData, frontOption, backgroundOptions, backgroundData} from "../../../../config/doughnutChart";



const RecBox = ({data}) => {
    const {label, number, attain} = data
    const percent = attain / number * 100

    return (
        <DoughnutBox siez={'123'}>
            <span className={'back'}>
                {<Doughnut data={backgroundData} options={backgroundOptions}/>}
            </span>
            <span className={'front'}>
                {<Doughnut data={chartData(exerciseName[label], percent)} options={frontOption}/>}
            </span>
        </DoughnutBox>
    );
};
const CarouselBox=styled.div`
  animation: ${fadeIn} 0.7s ease;
  .exerciseLabel {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: -10px;
    font-weight:bold;
    font-size: 13px;
  }
`

const Carousel = ({componentToRender, data}) => {
    return (
        <Scroll>
            {Object.values(data).map((data, index) => (
                <CarouselBox key={index}>
                    <span className={'exerciseLabel'}>{exerciseName[data.label]}</span>
                    {React.cloneElement(componentToRender, {data: data})}
                </CarouselBox>
            ))}
        </Scroll>
    )
}
const UserCurrentExercise = ({goals}) => {
    const name = useSelector((state) => state.name)

    return (
        <div style={{width: '390px'}}>
            <div style={{marginLeft: '30px', display: 'flex', justifyContent: 'space-between'}}>
                <p>
                    {name}님의 운동
                </p>
                <Link to={CURRENT} style={{textDecoration: 'none', color: 'black'}}>
                    <FontAwesomeIcon icon={faArrowRight} style={{marginRight: '20px', marginTop: '15px'}}/>
                </Link>
            </div>
            <Carousel data={goals} componentToRender={<RecBox/>}/>
        </div>
    );
}

function CurrentExercise() {
    const goals = useSelector((state) => state.goals)
    return (
        <>
            {goals ?
                <UserCurrentExercise goals={goals}/>
                :
               <LinkBox url={WISH_EXERCISE} title={'선택된 운동이 없습니다!'} content={'운동 선택하러 가기'}/>

            }
        </>
    );
}

export default CurrentExercise;