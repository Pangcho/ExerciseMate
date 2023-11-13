import React from 'react';
import styled, {keyframes} from 'styled-components';

//캐러셀
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//UI 패키지 임포트
import {ThemeColor, UserBoxSize} from "../../constants/Constants";
import CustomSelect from "./Select";
import {HorizonLine} from './HorizonLine'
import {UserProfile} from "./UserProfile";
import {Loading} from "./Loading";
import {UserBox} from "./UserBox";
import {Modal} from "./Modal";
import {NavigationBar} from "./NavigationBar";
import {PlusButton} from "./PlusButton";
import {LinkBox} from "./LinkBox";
import {TwoTabNav} from "./TwoTabNav";
import {LogoutButton} from "./LogoutButton";


export const rainbowAnimation = keyframes`
  0% {
    border-color: red;
  }
  14% {
    border-color: orange;
  }
  28% {
    border-color: yellow;
  }
  42% {
    border-color: green;
  }
  57% {
    border-color: blue;
  }
  71% {
    border-color: indigo;
  }
  85% {
    border-color: violet;
  }
  100% {
    border-color: red;
  }
`;
export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  
`
export const Box = styled.div`
  background-color: ${ThemeColor.containerColor};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin-bottom: 37px;
  width: 370px;
  animation: ${fadeIn} 0.7s ease;
  
`
export const Input = styled.input`
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 16px;
  padding: 0 20px;
  background-color: ${ThemeColor.divColor};
  box-sizing: border-box;
  margin-bottom: 10px;
  font-size: 16px;

  &:focus {
    outline: none;
    border: 2px solid;
    animation: ${rainbowAnimation} 5s linear infinite;

  }

`
export const Button = styled.button`
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 16px;
  padding: 0 20px;
  font-family: 'Inter', sans-serif; 
  background-color: ${ThemeColor.buttonColor};
  box-sizing: border-box;
  margin-bottom: 10px;
  font-size: 16px;
  animation: ${fadeIn} 0.7s ease;
  

  &:focus {
    outline: none;
    border: 1px solid;
    animation: ${rainbowAnimation} 5s linear infinite;
  }
`
export const AccountInfoBox = styled.div`
  width: 130px;
  border-radius: 16px;
  background-color: ${ThemeColor.divColor};
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  margin: 10px;
  animation: ${fadeIn} 0.7s ease;
  

  > :nth-child(1) {
    margin: 0;
    padding: 10px 0 0 15px;
    font-size: 12px;
    font-weight: bold;
  }

  > :nth-child(2) {
    font-size: 20px;
    padding: 10px 0 10px 15px;
    margin: -5px 0 0 0;
    font-weight: bold;
  }
`
export const Scroll = styled.div`
  overflow: scroll;
  display: flex;
  flex-direction: row;
  overflow-y: hidden;
  animation: ${fadeIn} 0.7s ease;


  &::-webkit-scrollbar {
    display:none;
  }
`
export const Hashtag = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  width: 330px;

  &::-webkit-scrollbar {
    display: none;
  }

  span {
    padding: 0 10px;
    margin-left: 10px;
    font-size: 20px;
    background-color: ${ThemeColor.importantColor};
    border-radius: 10px;
    font-weight: bold;

    &:before {
      content: '#';
    }

  }
`
export const TeamSummaryBox = styled(Box)`
  width: 330px;
  animation: ${fadeIn} 0.7s ease;
  

  h2, h3 {
    margin-left: 20px;
  }

  h3 {
    max-width: 300px;
  }

  div {
    width: 92%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 10px;
    margin-bottom: 10px;
    justify-content: space-between;
  }

  Button {
    width: 120px;
    font-weight: bold;
  }

  .feedback {
    width: 55px;
    justify-content: space-around;
  }
`
export const TeamInfoBox=styled.button`
  background-color: ${ThemeColor.containerColor};
  border: none;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: space-around;
  margin-bottom: 20px;
  width: 330px;
  padding-bottom: 10px;
  animation: ${fadeIn} 0.7s ease;


  :hover {
    background-color: ${ThemeColor.divColor};
  }

  h2 {
    font-size: 25px;
    margin-left: 10px;
  }

  .chatCount, .goal{
    margin: 1px 0 15px 10px;
    font-size: 18px;
  }

  .members {
    margin: -5px 0 5px 10px;
    font-size: 15px;
  }

  .boardProperty {
    margin: -5px 0 5px 10px;
    font-size: 15px;
    font-weight: bold;
  }
  #empty{
    margin: -5px 0 5px 10px;
    
  }

  .board {
    margin: 1px 0 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .title {
    margin: -5px 0 5px 10px;
    font-size: 15px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 150px;
  }

  .content {
    margin: -5px 0 5px 10px;
    font-size: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 220px;
  }
  
`
export const ToggleButton = styled.span`
  display: flex;
  align-items: center;
  width: 40px;
  height: 20px;
  border-radius: 15px;
  background-color: ${props => props.isOn ? '#4CAF50' : '#ccc'};
  position: relative;
  cursor: pointer;

  &:before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    background-color: #fff;
    border-radius: 50%;
    transition: 0.3s;
    left: ${props => props.isOn ? 'calc(100% - 18px)' : '2px'};
  }
`;
export const Img = styled.img`
  width: 340px;
  height: 340px;
  object-fit: cover;
  border-radius: 16px;
  animation: ${fadeIn} 0.7s ease;
  
`
export const PostHeader = styled.div`
  width: 330px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    font-size: 18px;
    font-weight: bold;
  }
`
export const PostFeedback = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0 10px 10px;

  #feedback{
    width:120px;
    display: flex;
    flex-direction: row;
  }
  .heart, .comment {
    font-size: 20px;
  }
  #time{
    padding-right: 20px;
  }

  span {
    font-size: 15px;
  }

`
export const PostContent = styled.div`
  animation: ${fadeIn} 0.7s ease;
  
  > :first-child {
    font-weight: bold;
    font-size: 17px;
  }
`
export const FeedbackButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  width: 70px;
  display: flex;
  justify-content: space-between;
`
export const FeedbackList = styled.div`
  width: 300px;
  margin: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 16px;
  background-color: ${ThemeColor.divColor};
  animation: ${fadeIn} 0.7s ease;
  

  .close{
    border:none;
    background-color: transparent;
  }
  
`
export const CommentsList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;

  .annoy {
    display: flex;
    flex-direction: column;

    #annoy {
      font-size: 15px;
      font-weight: bold;
    }

    #annoyComment {
      margin-left: 8px;
    }

  }

  .free, .postComment {
    width: 290px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .eachComment {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }

  #comment {
    margin-left: 35px;
  }
`
export const CommentInput = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 345px;

  input {
    position: relative;
    height: 50px;
    border-radius: 10px;
    padding: 0 15px;
    z-index: 1;
  }


  button {
    position: relative;
    border: none;
    background-color: ${ThemeColor.disabledButtonColor};
    width: 40px;
    height: 40px;
    border-radius: 10px;
    right: 43px;
    bottom: 5px;
    z-index: 2;

    &:hover {
      background-color: ${ThemeColor.buttonColor};
    }

`
export const NoticeBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 330px;
  padding: 5px;
  //background-color: ${ThemeColor.containerColor};
  margin-bottom: 10px;
  border-radius: 16px;
  animation: ${fadeIn} 0.7s ease;
  


  main {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: space-between;
    margin-top: 10px;
  }
  section{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 20px 0 20px;
  }

  .title {
    font-weight: bold;
    font-size: 17px;
    margin-left: 20px;
    margin-top: 10px;
  }

  .content {
    font-size: 17px;
    margin: 10px 20px 10px 20px;
  }

  .author {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 25px;
    margin-right: 20px;

 

    .name {
      font-size: 15px;
      margin-left: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 70px;
    }
  }

  article {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-self: center;
    align-items: center;
    width: 290px;
  }
  .comments {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 50px;
  }

  .section {

    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .boardContent {
    margin:10px 0 10px 0;
    width:220px;
    font-size: 15px;
  }
`
export const ModalWrapper = styled.div`
  display: flex;
  align-items: center;
  z-index: 100;
  .ellipse {
    background-color: transparent;
    border: none;
  }
  .modal{
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 250px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    

    div {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      padding: 10px;

      Button {
        width: 115px;
      }
  }
    #close {
      width: 80px;
      border-radius: 10px;
      background-color: #333;
      color: #fff;
      border: none;
      padding: 8px 16px;
      cursor: pointer;
      margin-top: 10px;
    }
`;

export const SettingWrapper = styled.div`
  border-radius: 20px;
  background-color: ${ThemeColor.containerColor};
  width: 80%;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  .detailSetting{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
`

export const ExerciseButton = styled.button`
  width:123px;
  height: 161px;
  margin: 10px;
    //margin-left: 20px;
  display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    border-radius: 16px;
    border: none;
  .exerciseImg{
    border-radius: 16px;
  }
`

export const ExerciseBoxWrapper = styled.div`
  margin: 0 0 30px 10px;
  width: 380px;
  .part{
    margin-left:20px;
  }
  .exerciseLabel {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: -10px;
    font-weight: bold;
  }
`

export const DoughnutBox = styled.div`
  width: ${(props)=> props.size?props.size:123}px;
  height: ${(props) => props.size?props.size:123}px;
  //border:1px solid black;
  margin: 15px 15px 15px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  border-radius: 20px;
  
  .front{
    position: relative;
    z-index: 2;
    left: -150px;
  }
  .back{
    position: relative;
    z-index: 1;
    left: 150px;
  }
`
export const RecBox = ({componentToRender}) => {
    return (
        <div
            style={{
                width: "123px",
                height: "161px",
                backgroundColor: `${ThemeColor.importantColor}`,
                margin: "10px",
                marginLeft: '20px',
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "30px",
                borderRadius: '16px'
            }}
        >
            {componentToRender}
        </div>
    );
};
export const PillBox = ({text}) => {
    return (
        <div
            style={{
                width: "120px",
                height: "32px",
                backgroundColor: `${ThemeColor.importantColor}`,
                margin: "10px",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                borderRadius: '16px'
            }}
        >
            {text}
        </div>
    );
};

export const CarouselList = ({componentToRender, list}) => {
    const settings = {
        arrows: false,
        draggable: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2.8,
        onSwipe: null,
    };
    return (
        <div style={{maxWidth: "380px", margin: '0 0 0 10px'}}>
            <Slider {...settings} >
                {list.map((text, index) => (
                    <div key={index}>{React.cloneElement(componentToRender, {text})}</div>
                ))}
            </Slider>
        </div>
    );
}

export {
    CustomSelect,
    HorizonLine,
    UserProfile,
    Loading,
    UserBox,
    Modal,
    NavigationBar,
    PlusButton,
    LinkBox,
    TwoTabNav,
    LogoutButton,
    ThemeColor,
    UserBoxSize

}