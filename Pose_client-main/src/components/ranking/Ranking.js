import React, {useState} from 'react';
import {
    CarouselList,
    Container,
    CustomSelect,
    HorizonLine,
    NavigationBar,
    PillBox,
    RecBox,
    UserBox
} from "../UI/UIPackage";
import RankInfoList from "./RankInfo";


function Ranking(props) {
    const ageList = ['전체', '10대', '20대', '30대', '40대', '50대', '60대 이상']
    const exerciseList=['턱걸이', '팔굽혀펴기', '스쿼트', '딥스']
    const [age, setAge] = useState(null);

    const handleAgeChange = (selectedAge) => {
        console.log(selectedAge)
        setAge(selectedAge)
    }
    return (
        <Container>
            <h1>랭킹</h1>
            <div style={{display: 'flex', width: '180px', justifyContent: 'space-between'}}>
                <span>전체</span>
                <span>여성</span>
                <span>남성</span>
            </div>
            <HorizonLine/>
            <div>
                <div style={{width: '110px', marginRight: '230px'}}>
                    <CustomSelect options={ageList} item='연령' onChange={handleAgeChange}/>

                </div>
            </div>
            <CarouselList componentToRender={<PillBox/>} list={exerciseList}/>

            <RankInfoList name='park' email={'holyShit@google.com'} rank={'1st'}/>

            <NavigationBar/>

        </Container>
    );
}

export default Ranking;
