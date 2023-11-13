import styled, {keyframes} from "styled-components";
import React, {useState} from "react";
import {Button, ThemeColor} from "./UIPackage";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ModalOverlay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //position: fixed;
  //top: 0;
  //left: 0;
  width: 100%;
  height: 100%;
  //background-color: rgba(0, 0, 0, 0.5);
  background-color: transparent;
  animation: ${fadeIn} 0.3s ease;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  //border:1px solid black;
`;
export const ModalButton = styled.button`
  border: none;
  width: 130px;
  background-color: ${ThemeColor.divColor};
  border-radius: 16px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  :hover{
    background-color: ${ThemeColor.primaryColor};
  }
  #wishList{
    font-size: 20px;
    font-weight: bold;
    //display: flex;
    //justify-content: center;
    //align-items: center;
    padding:2px;
    
  }

  p:first-child {
    font-weight: bold;
    margin-left: 5px;
  }

  p:last-child {
    font-size: 20px;
    font-weight: bold;
    margin:-10px 0 10px 5px;

  }

`

export const Modal = ({render, button, width}) => {
    const [showModal, setShowModal] = useState(false);

    const handleButtonClick = () => setShowModal(prev=>!prev);

    const closeModal = () => {
        setShowModal(false);
    };
    return (
        <>
            <ModalButton onClick={handleButtonClick} style={{width:width}}>
                {React.cloneElement(button)}
            </ModalButton>
            {showModal && (
                <ModalOverlay>
                    <ModalContent>
                        {React.cloneElement(render)}
                    </ModalContent>
                    <Button onClick={closeModal} style={{width: '78px', marginTop: '20px'}}>닫기</Button>
                </ModalOverlay>
            )}
        </>
    );
};
