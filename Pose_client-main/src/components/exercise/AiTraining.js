import React, {useState} from 'react';
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import axios from "axios";

import {Button, Container, Loading, ThemeColor} from "../UI/UIPackage";
import {functions} from "../../utils/Functions";
import {UPDATE_ATTAIN} from "../../services/api";
import {updateAttain} from "../../store/userState";

const MeterBar = styled.div`
  width: 300px;
  height: 20px;
  background-color: ${ThemeColor.importantColor};
  margin: 10px auto;
  position: relative;
  border-radius: 10px;
`
const Progressbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  height: 20px;
  border-radius: 10px;
  background-color: blue;`


const ProgressBar = ({goal, label}) => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const handleButtonClick = () => {
        console.log(progress)
        if (progress < goal) {
            setProgress(progress + 1);
        }
        if (progress + 1 === parseInt(goal)) {
            setIsComplete(true)
            functions.particle();
        }
    };
    const percent = ((progress / goal) * 100).toFixed(2);

    const handleUpdateAttain = () => {
        const headers = functions.getJWT();
        setIsLoading(true)
        axios.post(UPDATE_ATTAIN, {
            exercise: label,
            attain: progress
        }, {headers})
            .then((res) => {
                console.log(res)
                dispatch(updateAttain({
                    label: label,
                    attain: progress
                }))
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false))
    }
    return (
        <div style={{textAlign: 'center', padding: '20px'}}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '-20px'
            }}>
                <p>{progress}</p>
                <p>{goal}</p>
            </div>
            <MeterBar>
                <Progressbar style={{width: `${percent}%`}}>
                    <p></p>
                    <p style={{marginRight: '5px'}}>
                        {Math.round(percent)}%
                    </p>
                </Progressbar>
            </MeterBar>
            <button onClick={handleButtonClick} style={{border:'none', borderRadius:'50%', width:'30px', height:'30px'}}>+</button>
            <br/>
            <br/>
            <Button onClick={handleUpdateAttain}
                    style={{
                        backgroundColor: isComplete ? ThemeColor.buttonColor : ThemeColor.disabledButtonColor,
                        width: '120px', height: '35px',
                    }}>
                {isLoading ? <Loading/> : '기록 저장'}
            </Button>
        </div>
    );
}

function AiTraining() {
    const location = useLocation()
    const label = location.state?.label || ''
    const goals = useSelector((state) => state.goals)
    const goal = goals.find(goal => goal.label === label)?.number
    const flaskServer = 'http://127.0.0.1:5000/video_feed'

    return (
        <>
            <br/>
            {goal ?
                <>
                    <img src={`${flaskServer}/${label}`} alt={label}/>
                    <ProgressBar goal={goal} label={label}/>
                </>
                :
                <>
                    <img src={`${flaskServer}/${label}`} alt={label}/>
                </>

            }
        </>
    );
}

export default AiTraining;
