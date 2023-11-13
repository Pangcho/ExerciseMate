import React from 'react';
import {useSelector} from "react-redux";
import styled from "styled-components";
import {Link} from "react-router-dom";


import {
    Container,
    NavigationBar,
    UserBox,
    ThemeColor,
    UserBoxSize,
    AccountInfoBox,
    rainbowAnimation,
    Modal,
    LogoutButton,
    SettingWrapper
} from "../components/UI/UIPackage";
import {USER_SETTING} from '../services/api'

//아이콘
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGear} from '@fortawesome/free-solid-svg-icons';
import {
    AgeSetting,
    AreaSetting,
    ExerciseSetting,
    FollowerFollowingSetting,
    HeightSetting,
    ShowFollowers,
    ShowFollowing,
    WeightSetting, WishListSetting
} from "../components/account/DetailSetting";

const RainbowDiv = styled.div`
  border: 2px solid;
  width: 300px;
  border-radius: 16px;
  margin-top: 20px;
  padding: 0 0 10px 10px;
  background-color: ${ThemeColor.divColor};
  animation: ${rainbowAnimation} 5s linear infinite;

  > :nth-child(1) {
    margin: 0;
    padding: 10px 0 0 10px;
    font-size: 12px;
    font-weight: bold;
  }

  > :nth-child(n+2) {
    font-size: 20px;
    padding: 10px 0 0 10px;
    margin: -5px 0 0 0;
    font-weight: bold;
  }
`;

const AccountSettingButton=()=>{
    const style={
        display: 'flex',
        width: '110px',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
    return(
        <div style={style}>
            <span>계정 설정</span>
            <Link to={USER_SETTING} style={{textDecoration: 'none', color: 'black'}}>
                <FontAwesomeIcon icon={faGear} spin style={{fontSize: '25px'}}/>
            </Link>
        </div>
    )

}

function Account() {
    const {
        name,
        email,
        age,
        area,
        weight,
        height,
        exercise,
        wishList,
        followers,
        following,
    } = useSelector((state) => state);


    return (
        <Container>
            <h1>유저 정보</h1>
            <SettingWrapper>
                <UserBox name={name} email={email} size={UserBoxSize.large}/>

                <div className={'detailSetting'}>

                    <Modal button={<FollowerFollowingSetting follow={followers} type={'followers'}/>} render={<ShowFollowers followers={followers}/>}/>

                    <Modal button={<FollowerFollowingSetting follow={following} type={'following'}/>} render={<ShowFollowing following={following}/>}/>

                    <AccountInfoBox>
                        <AgeSetting age={age}/>
                    </AccountInfoBox>
                    <AccountInfoBox>
                        <AreaSetting area={area}/>
                    </AccountInfoBox>
                    <AccountInfoBox>
                        <WeightSetting weight={weight}/>
                    </AccountInfoBox>
                    <AccountInfoBox>
                        <HeightSetting height={height}/>
                    </AccountInfoBox>
                </div>

                <RainbowDiv>
                    <ExerciseSetting exercise={exercise}/>
                </RainbowDiv>
                <RainbowDiv>
                    <WishListSetting wishList={wishList}/>
                </RainbowDiv>


            </SettingWrapper>
            <AccountSettingButton/>

            <br/>

            <LogoutButton/>

            <NavigationBar/>

        </Container>
    );
}

export default Account;
