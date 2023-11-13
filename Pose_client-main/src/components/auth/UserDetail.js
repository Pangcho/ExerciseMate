import React, {useState} from 'react';
import {Button, Container, CustomSelect} from '../UI/UIPackage';
import {useLocation, useNavigate} from "react-router-dom";
import {USER_DETAIL_2} from '../../services/api'


const UserDetail = (props) => {
    const sexList = ['남자', '여자']
    const areaList = ['서울', '경기', '인천', '강원', '충북', '충남', '대전', '경북', '경남', '대구', '울산', '부산', '전북', '전남', '광주', '제주']
    const heightList = ['150 이하', 150, 160, 170, 180, 190, '190 이상']
    const weightList = ['50 이하', 50, 60, 70, 80, 90, '90 이상']
    const ageList = ['10대', '20대', '30대', '40대', '50대', '60대 이상']

    const location = useLocation()
    const name = location.state?.name || ''

    const [form, setForm] = useState({sex:'', area:'', height:'', weight:'', age:''});
    const handleFormChange = e => setForm({...form, [item[e.item]]: e.option})
    const item={
        '성별':'sex',
        '지역':'area',
        '키':'height',
        '몸무게':'weight',
        '나이':'age'
    }
    // console.log(form)

    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate(USER_DETAIL_2, {
            state: {
                ...location.state,
                ...form
            }
        });
    };

    return (
        <Container>
            <h1>자세한 유저 정보</h1>
            <h3 style={{margin: '-5px 0 -10px 0'}}>안녕하세요 {name}님!</h3>
            <h5>세부 정보를 입력해주세요</h5>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '90%'}}>
                <CustomSelect options={sexList} item='성별' onChange={handleFormChange}/>
                <CustomSelect options={areaList} item='지역' onChange={handleFormChange}/>
                <CustomSelect options={heightList} item='키' onChange={handleFormChange}/>
                <CustomSelect options={weightList} item='몸무게' onChange={handleFormChange}/>
                <CustomSelect options={ageList} item='나이' onChange={handleFormChange}/>
                <Button onClick={handleButtonClick}>등록</Button>
            </div>

        </Container>
    );
};

export default UserDetail;

