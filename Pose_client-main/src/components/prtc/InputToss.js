import React, {useState} from 'react';
import {Container} from "../UI/UIPackage";
import {useNavigate} from "react-router-dom";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Doughnut} from "react-chartjs-2";

import Gallery from "./Gallery";
import StateOfMate from "../Home/widget/StateOfMate";
import UploadFirebaseImg from "./UploadFirebaseImg";
import GetFirebaseImg from "./GetFirebaseImg";
// import PoseNetprtc from "./PoseNetprtc";


ChartJS.register(ArcElement, Tooltip, Legend);


function InputToss(props) {
    const [content, setContent] = useState('');
    const [name, setName] = useState('')
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [form, setForm] = useState({email:"", password   :""});


    const navigate = useNavigate();
    const handleContentChange = (event) => {
        setContent(event.target.value);
        console.log(content)
    }
    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handleSubmit = (event) => {
        // event.preventDefault();
        navigate('/input2', {state: {'content': content, 'name': name, 'email': email, 'password': password}})
    }

    const data = {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            },
            {
                data: [100, 200, 50],
                backgroundColor: ['#FF8C00', '#9932CC', '#00BFFF'],
                hoverBackgroundColor: ['#FF8C00', '#9932CC', '#00BFFF'],
            },
            {
                data: [30, 110, 200],
                backgroundColor: ['#FF8C00', '#9932CC', '#00BFFF'],
                hoverBackgroundColor: ['#FF8C00', '#9932CC', '#00BFFF'],
            },
        ],

    }
    const options = {
        cutoutPercentage: 70,
        elements: {
            arc: {
                borderWidth: 0,
                borderColor: 'transparent',
            },
        },
    };

    const data2 = {
        labels: ['fuck', 'you'],
        datasets: [
            {
                data: [70, 30],
                backgroundColor: ['#FF6384', 'rgba(0, 0, 0, 0)'],
                // hoverBackgroundColor: ['#FF6384', 'rgba(0, 0, 0, 0)'],
            },
            {
                data: [50, 50],
                backgroundColor: ['blue', 'rgba(0, 0, 0, 0)'],
                // hoverBackgroundColor: ['#FF6384', 'rgba(0, 0, 0, 0)'],
            },
            {
                data: [80, 20],
                backgroundColor: ['green', 'rgba(0, 0, 0, 0)'],
                // hoverBackgroundColor: ['#FF6384', 'rgba(0, 0, 0, 0)'],
            }
        ],
    };

    const options2 = {
        cutoutPercentage: 30,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        elements: {
            arc: {
                borderWidth: 0,
                borderColor: 'transparent',
                borderRadius: 50,
            },
        },
    };

    const squat=process.env.PUBLIC_URL + '/exercise2/lower/squat.jpg'
    const handleFormChange=(e)=>{
        // console.log(e.target.type)
        setForm({...form, [e.target.type]:e.target.value})
    }
    console.log(form)


    return (
        <Container>
            {/*<UploadFirebaseImg/>*/}
            <GetFirebaseImg/>
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>

                <input type="text" value={content} onChange={handleContentChange}/>
                <input type="text" value={name} onChange={handleNameChange}/>
                <input type="text" value={email} onChange={handleEmailChange}/>
                <input type="text" value={password} onChange={handlePasswordChange}/>
                <button type='submit'>send</button>
            </form>
            <p>진행률 : <progress max='100' value="25">25%</progress></p>
            <p>진행률 : <meter max='100' value="25">25%</meter></p>

            {/*<div>*/}
            {/*    <SquareBox componentToRender={<Doughnut data={data2} options={options2}/>}/>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    /!*<Doughnut data={data} options={options}/>*!/*/}
            {/*    <Doughnut data={data2} options={options2}/>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <Gallery componentToRender={<SquareBox/>}/>*/}
            {/*</div>*/}
            <div >
                <StateOfMate/>
            </div>
            {/*<PoseNetprtc/>*/}
            <img src={squat} alt=""/>
            <input type="email" onChange={handleFormChange}/>
            <input type="password" onChange={handleFormChange}/>
        </Container>
    );
}

export default InputToss;
