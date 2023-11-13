import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {Container, Loading, Modal, ThemeColor, UserBox, UserBoxSize} from "../UI/UIPackage";
import {functions} from "../../utils/Functions";
import {GET_OTHER_USER_INFO, GET_OTHER_USER_FOLLOWERS_FOLLOWING, GET_UNFOLLOW} from "../../services/api";
import axios from "axios";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {putFollow, putFollowingNames} from "../../store/userState";
import {AgeSetting, AreaSetting, ExerciseSetting, HeightSetting, WeightSetting} from "../account/DetailSetting";
import {ModalButton} from "../UI/Modal";
import {RainbowDiv} from "../account/UserSetting";

const ShowUserFollowingDetail = ({userId}) => {
    const [isLoading, setIsLoading] = useState(true)
    // const
    return (
        <>hello</>
    )
}
const ShowUserFollowers = ({followers}) => {
    // console.log(followers, followers?.length)
    return (
        <>
            <p>팔로워</p>
            <p>{followers ? followers && followers.length : '0'}명</p>
        </>
    )
}
const ShowUserFollowersDetail = ({userId}) => {
    const [isLoading, setIsLoading] = useState(true)
    // const
    return (
        <>
            hello
        </>
    )
}
const FFDiv = styled.div`
  width: 270px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${ThemeColor.containerColor};
  margin: 7px 0;
  border-radius: 16px;
  padding: 0 20px;
  height: 60px;
`
const FFButton = styled.button`
  background-color: ${ThemeColor.buttonColor};
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
`

const ShowUserFollowingFollowersDetail = ({userId, type, follow}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [userInfo, setUserInfo] = useState()
    const getOtherUserFollowersFollowing = async () => {
        const headers = functions.getJWT()
        await axios.post(GET_OTHER_USER_FOLLOWERS_FOLLOWING, {follow}, {headers})
            .then(res => setUserInfo(res.data))
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }
    useEffect(() => {
        getOtherUserFollowersFollowing()
    }, [])
    console.log(userInfo)

    if (isLoading) return (<Loading/>)
    if (follow?.length === 0) return (<span>팔로잉한 계정이 없습니다.</span>)
    return (
        <>
            {type === 'followers' ? '팔로워' : '팔로잉'}
            {userInfo?.followInfos.map((user) => (
                <FFDiv key={user[0]}>
                    <UserBox
                        name={user[1]}
                        email={user[2]}
                        size={UserBoxSize.small}
                    />
                </FFDiv>
            ))}

        </>
    )
}
const ShowUserFollowing = ({following}) => {
    return (
        <>
            <p>팔로잉</p>
            <p>{following ? following && following.length : '0'}명</p>
        </>
    )
}


function UserInformation(props) {
    const location = useLocation()
    const userId = location.pathname.split('/')[2]
    const [userInfo, setUserInfo] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const getOtherUserInfo = async () => {
        const headers = functions.getJWT()
        await axios.get(GET_OTHER_USER_INFO + `/${userId}`, {headers})
            .then(res => setUserInfo(res.data))
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        getOtherUserInfo()
    }, []);

    const renderSettingModalButton = (settingType, SettingComponent) => {
        if (userInfo?.[settingType]) {
            return (
                <ModalButton>
                    <SettingComponent {...{ [settingType]: userInfo?.[settingType] }} />
                </ModalButton>
            );
        }
        return null;
    }

    return (
        <Container>
            <h1>유저 정보</h1>
            <UserBox name={userInfo?.name} email={userInfo?.email} size={UserBoxSize.large}/>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>

                {userInfo?.followers ?
                    <>
                        <Modal button={<ShowUserFollowers followers={userInfo?.followers}/>}
                               render={<ShowUserFollowingFollowersDetail type={'followers'}
                                                                         follow={userInfo?.followers}/>}/>
                        <Modal button={<ShowUserFollowing following={userInfo?.following}/>}
                               render={<ShowUserFollowingFollowersDetail type={'following'}
                                                                         follow={userInfo?.following}/>}/>
                    </>
                    :
                    <ModalButton>
                        <p>팔로우 팔로워</p>
                        <p>비공개</p>
                    </ModalButton>
                }
                {renderSettingModalButton('age', AgeSetting)}
                {renderSettingModalButton('area',  AreaSetting)}
                {renderSettingModalButton('weight', WeightSetting)}
                {renderSettingModalButton('height', HeightSetting)}
                {renderSettingModalButton('exercise',  ExerciseSetting)}
                {userInfo?.wishList &&
                    <RainbowDiv>
                        <p>해결하고싶은 고민</p>
                        {
                            userInfo?.wishList.map((item, index) => {
                                    return (
                                        <p key={index}>{index + 1}.&nbsp;{item}</p>
                                    )
                                }
                            )
                        }
                    </RainbowDiv>
                }

            </div>


        </Container>
    );
}

export default UserInformation;