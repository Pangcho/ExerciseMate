import React, {useState} from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import {ThemeColor} from "../../constants/Constants";


const PlusButtonContainer = styled(Link)`
  position: fixed;
  width: 50px;
  bottom: 75px;
  left: calc(50% + 130px);
  height: 50px;
  border-radius: 50%;
  background-color: black;
  border: none;
  color: white;
  font-size: 30px;
  text-decoration: none;
  text-align: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: ${ThemeColor.importantColor};
  }
`
const AnimatedButton = styled(Link)`
  position: fixed;
  width: 150px;
  bottom: ${({distance}) => distance}px;
  left: calc(50% + 30px);
  height: 35px;
  border-radius: 12px;
  background-color: ${ThemeColor.navColor};
  border: none;
  color: black;
  font-size: 20px;
  text-align: center;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding-top: 4px;
  display: ${props => props.show ? 'block' : 'none'};
  opacity: ${props => props.show ? 1 : 0};
  transform: translateY(${props => props.show ? '0' : '20px'});
  transition: opacity 0.3s, transform 0.3s;

  &:hover {
    background-color: black;
    color: white;
  }
`;

export const PlusButton=(item)=> {
    const [showButtons, setShowButtons] = useState(false);
    const handlePlusButtonClick = () => {
        setShowButtons(!showButtons);
    };
    return (
        <>
        <PlusButtonContainer onClick={handlePlusButtonClick}>+</PlusButtonContainer>
        {
            item.item.map((item, index) =>
                <AnimatedButton show={showButtons} distance={140+50*index} to={item[1]} key={index}>{item[0]}</AnimatedButton>
            )
        }
        </>
)
}

