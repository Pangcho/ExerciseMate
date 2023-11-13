import React, {useState} from 'react';
import {ThemeColor, Container, Input, Button} from '../UI/UIPackage';
import {useLocation, useNavigate} from "react-router-dom";

import {REGISTER_DETAIL_USER} from '../../services/api'
import axios from "axios";
// import confetti from "canvas-confetti";
import {functions} from "../../utils/Functions";

export const ButtonGroup = ({buttons, onChange, selectedWishList}) => {
    const SWL = selectedWishList
    const [selectedButtons, setSelectedButtons] = useState(SWL ? SWL : []);

    const handleButtonClick = (button) => {
        let updatedButtons
        if (selectedButtons.includes(button)) {
            updatedButtons = selectedButtons.filter((b) => b !== button)
        } else {
            updatedButtons = [...selectedButtons, button]
        }
        setSelectedButtons(updatedButtons)
        onChange(updatedButtons)
    }

    return (
        <div>
            {buttons.map((button) => (
                <button
                    key={button}
                    onClick={() => handleButtonClick(button)}
                    style={{
                        backgroundColor: selectedButtons.includes(button) ? `${ThemeColor.buttonColor}` : `${ThemeColor.primaryColor}`,
                        color: selectedButtons.includes(button) ? 'black' : 'white',
                        height: '40px',
                        padding: "0 17px 0 17px",
                        textAlign: 'center',
                        borderRadius: "16px",
                        margin: "5px",
                        border: "none",
                        cursor: "pointer"
                    }}
                >
                    {button}
                </button>
            ))}
        </div>
    );
};

export const UserDetail3 = (props) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const wishList = ['평생 숙제 다이어트', '뱃살, 옆구리살 빼기', '마른 몸 벗어나기', '탄탄한 몸 만들기', '넓은 어깨 갖기', '슬림한 하체 만들기', '벌크업 하기', '굵코 큰 팔 만들기', '힙업', '팔뚝 군살 제거', '전체적인 근육량 증가', '선명한 복근 만들기', '굵은 하체 만들기']

    const location = useLocation()
    const navigate = useNavigate();

    const handleOptionsChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions);
    }

    const handleSubmit = async () => {
        try {
            let formData = {
                ...location.state,
                wishList: selectedOptions
            }
            await axios.post(REGISTER_DETAIL_USER, formData)
            functions.particle()
            alert("회원가입이 완료되었습니다");
            navigate('/')
        } catch (error) {
            alert("이메일 인증 도중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    }

    return (
        <Container>
            <h2>해결하고 싶은 고민이 무엇인가요?</h2>
            <h3 style={{margin: '0 0 -10px 0'}}>{location.state.name}님!</h3>
            <h5>선택해주신 고민들을 기반으로 운동을 추천합니다</h5>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '90%'}}>
                <ButtonGroup buttons={wishList} onChange={handleOptionsChange}/>
                <br/>
                <Button onClick={handleSubmit}>완료</Button>
            </div>
        </Container>
    );
}

export default UserDetail3;
