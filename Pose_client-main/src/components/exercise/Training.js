import React from 'react';
import {useLocation} from "react-router-dom";
import {Container, NavigationBar, TwoTabNav} from "../UI/UIPackage";
import Examples from "./Examples";
import AiTraining from "./AiTraining";

function Training(props) {
    const location = useLocation()
    const exercise = location.state?.exercise || ''

    const tab = {
        'AI 트레이닝': <AiTraining/>,
        '예시': <Examples/>
    }
    return (
        <Container>
            <h1>{exercise}</h1>
            <TwoTabNav tab={tab}/>
        </Container>
    );
}

export default Training;
