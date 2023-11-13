import React, {useState} from 'react';
// import { createRoot } from "https://esm.run/react-dom@18/client";
// import confetti from "https://esm.run/canvas-confetti@1";
import confetti from "canvas-confetti";
import {Button} from "../UI/UIPackage";
import styled, {css} from "styled-components";
function Like({text}) {
    function onClick() {
        confetti({
            particleCount: 50,
            spread: 50
        });
    }

    return (
        <Button className="button" onClick={onClick}>
            <span>🎉</span>
            <span>{text}</span>
        </Button>
    );
}
const SlidingContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const Screen = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;

  ${(props) =>
    props.secondScreen &&
    css`
      background-color: #e0e0e0;
      transform: translateX(100%);
    `}

  ${(props) =>
    props.firstScreen &&
    css`
      background-color: #f0f0f0;
    `}
`;

export const SlidingComponent = () => {
    const [showFirstScreen, setShowFirstScreen] = useState(true);

    const handleButtonClick = () => {
        setShowFirstScreen(!showFirstScreen);
    };

    return (
        <SlidingContainer>
            <Screen firstScreen={showFirstScreen}>
                <h1>첫 번째 화면</h1>
                <button onClick={handleButtonClick}>다음으로</button>
            </Screen>
            <Screen secondScreen={!showFirstScreen}>
                <h1>두 번째 화면</h1>
                <button onClick={handleButtonClick}>이전으로</button>
            </Screen>
        </SlidingContainer>
    );
};
export default Like;