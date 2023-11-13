import React from 'react';
import {
    Container,
    NavigationBar,
    Modal,
    rainbowAnimation,
    ThemeColor,
    SettingWrapper
} from "../UI/UIPackage";
import {useSelector} from "react-redux";

import styled from "styled-components";
import {
    AgeSetting,
    HeightSetting,
    UserProfileSetting,
    ChangeUserProfile,
    WeightSetting,
    ChangeAge,
    AreaSetting,
    ChangeArea,
    ShowFollowing,
    ShowFollowers,
    ChangeWeight,
    ChangeHeight,
    ExerciseSetting,
    ChangeExercise,
    ChangeWishList,
    WishListSettingButton, PublicUserInformation, FollowerFollowingSetting, WishListSetting
} from "./DetailSetting";

export const RainbowDiv = styled.div`
  border: 2px solid;
  width: 280px;
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



function UserSetting() {
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
        setting
    } = useSelector((state) => state);

    return (
        <Container>
            <h1>유저 정보 수정</h1>
            <h5>각 항목을 클릭하면 수정할 수 있습니다</h5>
            <SettingWrapper>

                <Modal width={'300px'} button={<UserProfileSetting email={email} name={name}/>} render={<ChangeUserProfile email={email} name={name}/>}/>
                <div className={'detailSetting'}>
                    <Modal button={<FollowerFollowingSetting follow={followers} type={'followers'}/>} render={<ShowFollowers followers={followers}/>}/>

                    <Modal button={<FollowerFollowingSetting follow={following} type={'following'}/>} render={<ShowFollowing following={following}/>}/>

                    <Modal button={<AgeSetting age={age}/>} render={<ChangeAge age={age}/>}/>

                    <Modal button={<AreaSetting area={area}/>} render={<ChangeArea area={area}/>}/>

                    <Modal button={<WeightSetting weight={weight}/>} render={<ChangeWeight weight={weight}/>}/>

                    <Modal button={<HeightSetting height={height}/>} render={<ChangeHeight height={height}/>}/>
                </div>

                <Modal width={'280px'} button={<ExerciseSetting exercise={exercise}/>} render={<ChangeExercise/>}/>

                <RainbowDiv>
                    <WishListSetting wishList={wishList}/>
                </RainbowDiv>

                <Modal width={'102px'} button={<WishListSettingButton/>} render={<ChangeWishList wishList={wishList}/>}/>
                <br/>
            </SettingWrapper>

            <PublicUserInformation isPublic={setting}/>
            <NavigationBar/>
        </Container>
    );
}

export default UserSetting;
