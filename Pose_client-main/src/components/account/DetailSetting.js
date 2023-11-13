import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {Button, CustomSelect, Input, Loading, ThemeColor, ToggleButton, UserBox, UserBoxSize} from "../UI/UIPackage";
import {functions} from "../../utils/Functions";
import {
    GET_FOLLOWERS,
    GET_FOLLOWING,
    IS_PASSWORD_CORRECT,
    UPDATE_PASSWORD,
    UPDATE_PROFILE,
    UPDATE_INFORMATION,
    GET_UNFOLLOW,
    UPDATE_INFORMATION_PUBLIC
} from "../../services/api";
import {
    putFollow,
    putFollowerNames,
    putFollowingNames,
    updateAge,
    updateArea,
    updateExercise,
    updateHeight,
    updateProfile,
    updateWeight,
    updateWishList,
    updateItemPublic
} from "../../store/userState";
import {ButtonGroup} from "../auth/UserDetail3";

const updateData = async (url, dataToUpdate, dispatchUpdateAction, setIsLoading, setIsSuccessMessage, dispatch) => {
    const headers = functions.getJWT()
    setIsLoading(true);
    try {
        const response = await axios.put(url, dataToUpdate, {headers});
        dispatch(dispatchUpdateAction(dataToUpdate));
        if (response.data.state) {
            setIsLoading(false);
            setIsSuccessMessage(true);
            setTimeout(() => {
                setIsSuccessMessage(false);
            }, 2000);
        }
    } catch (error) {
        console.error('API 요청 에러:', error);
    }
};
export const UserProfileSetting = ({name, email}) => name &&
    <UserBox name={name} email={email} size={UserBoxSize.large}/>

const StyledSpan = styled.span`margin-left: 10px;`;
const OldPassword = ({setIsPasswordCorrect}) => {
    //새 비밀번호
    const [oldPassword, setOldPassword] = useState("");
    //api 통신 로딩
    const [isLoading, setIsLoading] = useState(false);
    //비밀번호 일치 여부
    const [isFailed, setIsFailed] = useState(false);

    const handlePasswordChange = (e) => setOldPassword(e.target.value);

    const handleOldPassword = async () => {
        const headers = functions.getJWT()
        setIsLoading(true);
        try {
            const response = await axios.post(IS_PASSWORD_CORRECT,
                {password: oldPassword},
                {headers: headers});
            if (response.data.state) {
                setIsLoading(false);
                setIsPasswordCorrect(false)
                setIsFailed(false)
            } else {
                setIsLoading(false);
                setIsPasswordCorrect(true)
                setIsFailed(true)
                setTimeout(() => {
                    setIsFailed(false)
                }, 2000);
            }
            setIsPasswordCorrect(response.data.state);
        } catch (error) {
            console.error('API 요청 에러:', error);
        }
    }

    return (
        <>
            <StyledSpan>기존 비밀번호</StyledSpan>
            <Input type="password" placeholder="기존 비밀번호를 입력하세요" onChange={handlePasswordChange}/>
            {isFailed && <span>비밀번호가 틀렸습니다</span>}
            <Button onClick={handleOldPassword}>{isLoading ? (<Loading/>) : ("확인")}</Button>
        </>
    )
}
const NewPassword = ({setIsPasswordCorrect}) => {
    //새 비밀번호
    const [newPassword, setNewPassword] = useState("");
    //api 통신 로딩
    const [isLoading, setIsLoading] = useState(false);
    //비밀번호 수정 성공 메시지
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);
    //수정 버튼 잠금
    const [isNoChange, setIsNoChange] = useState(false)
    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);
    }
    const handleUpdate = async () => {
        const headers = functions.getJWT()
        setIsLoading(true);
        try {
            const res = await axios.put(UPDATE_PASSWORD,
                {newPassword: newPassword},
                {headers: headers});

            if (res.data.state) {
                setIsLoading(false);
                setIsSuccessMessage(true);
                setNewPassword("")
                setTimeout(() => {
                    setIsSuccessMessage(false);
                    setIsPasswordCorrect(false)
                }, 2000);
            }
        } catch (error) {
            console.error('API 요청 에러:', error);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        setIsNoChange(newPassword === "");
    }, [newPassword]);
    return (
        <>
            <StyledSpan>새 비밀번호</StyledSpan>
            <Input type="password" placeholder="새 비밀번호를 입력하세요" defaultValue={newPassword}
                   onChange={handlePasswordChange}/>
            {isSuccessMessage && <span>수정 완료</span>}
            <Button onClick={handleUpdate} disabled={isNoChange}>{isLoading ? (<Loading/>) : ("수정")}</Button>
        </>
    )
}

export const ChangeUserProfile = ({name, email}) => {
    const [form, setForm] = useState({newName: name, newEmail: email})
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);
    const [isNoChange, setIsNoChange] = useState(false)
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false)

    const dispatch = useDispatch();

    const handleFormChange = e => setForm({...form, [e.target.name]: e.target.value})

    useEffect(() => {
        setIsNoChange(form.newName === name && form.newEmail === email)
    }, [form])

    const handleUpdate = () => {
        updateData(
            UPDATE_PROFILE, {
                name: form.newName,
                email: form.newEmail
            },
            updateProfile, setIsLoading, setIsSuccessMessage, dispatch
        ).then()
    };


    return (
        <div style={{width: '300px'}}>
            <StyledSpan>이름</StyledSpan>
            <Input type="name" name={'newName'} defaultValue={name} onChange={handleFormChange}/>
            <StyledSpan>이메일</StyledSpan>
            <Input type="email" name={'newEmail'} defaultValue={email} onChange={handleFormChange}/>
            {isSuccessMessage && <p>수정 완료</p>}
            <Button onClick={handleUpdate} disabled={isNoChange}>{isLoading ? <Loading/> : ("수정")}</Button>
            <br/>
            {isPasswordCorrect ?
                <NewPassword setIsPasswordCorrect={setIsPasswordCorrect}/>
                :
                <OldPassword setIsPasswordCorrect={setIsPasswordCorrect}/>}
        </div>
    )
}

export const FollowerFollowingSetting = ({follow, type}) => {
    return (
        <>
            <p>{type === 'followers' ? '팔로워' : '팔로잉'}</p>
            <p>{follow ? follow.length : '0'}명</p>
        </>
    )
}

const FFDiv = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${ThemeColor.containerColor};
  margin: 7px 0;
  border-radius: 16px;
  padding: 0 10px;
  height: 60px;
`
const FFButton = styled.button`
  background-color: ${ThemeColor.buttonColor};
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
`
const DeleteFF = ({friend}) => {
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();
    const handleClick = () => {
        const headers = functions.getJWT()
        const dataToSend = {friend: friend};
        setIsLoading(true)
        axios.post(GET_UNFOLLOW, dataToSend, {headers})
            .then(res => {
                setIsLoading(false)
                dispatch(putFollow({following: res.data.following}))
                dispatch(putFollowingNames({followingNames: res.data.followingNames}))
            })
            .catch(error => {
                console.error('API 요청 에러:', error);
                setIsLoading(false)
            });
    }
    return (
        <FFButton onClick={handleClick}>
            {isLoading ? <Loading/> : "삭제"}
        </FFButton>

    )
}
export const ShowFollowing = ({following}) => {
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();

    const getFollowing = async () => {
        const headers = functions.getJWT()
        setIsLoading(true)
        try {
            const response = await axios.post(GET_FOLLOWING, {following}, {headers: headers});
            dispatch(putFollowingNames({followingNames: response.data.following}))
            setIsLoading(false)
        } catch (error) {
            console.error('API 요청 에러:', error);
        }
    };
    useEffect(() => {
        getFollowing().then()
    }, [following])

    const {followingNames} = useSelector(state => state)
    if (isLoading) return <Loading/>
    if (followingNames?.length === 0) return <span>팔로잉한 계정이 없습니다.</span>
    return (
        <>
            <span>팔로잉</span>
            {followingNames?.map((user) => (
                <FFDiv key={user[0]}>
                    <UserBox
                        name={user[1]}
                        email={user[2]}
                        size={UserBoxSize.small}
                    />
                    <DeleteFF friend={user[0]}/>
                </FFDiv>
            ))}
        </>
    )
}

export const ShowFollowers = ({followers}) => {
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();
    const getFollowers = async () => {
        try {
            const headers = functions.getJWT()
            setIsLoading(true)
            const response = await axios.post(GET_FOLLOWERS, {followers},
                {headers: headers});
            const data = response.data;
            dispatch(
                putFollowerNames({followerNames: data.followers})
            )
            setIsLoading(false)
        } catch (error) {
            console.error('API 요청 에러:', error);
        }
    };
    useEffect(() => {
        getFollowers().then()
    }, [followers])

    const {followerNames} = useSelector(state => state)
    if (isLoading) return (<Loading/>)
    if (followerNames?.length === 0) return (<span>팔로워가 없습니다.</span>)
    return (
        <>
            <span>팔로워</span>
            {followerNames?.map((user) => (
                <FFDiv key={user[0]}>
                    <UserBox
                        name={user[1]}
                        email={user[2]}
                        size={UserBoxSize.medium}
                        style={{padding: '5px 0px'}}
                    />
                </FFDiv>
            ))}
        </>
    )
}

export const AreaSetting = ({area}) => {
    return (
        <>
            <p>지역</p>
            {!area ? <p style={{fontSize: '15px'}}>
                    등록되지않음
                </p> :
                <p>{area}</p>
            }
        </>
    )
}
export const ChangeArea = ({area}) => {
    const areaList = ['서울', '경기', '인천', '강원', '충북', '충남', '대전', '경북', '경남', '대구', '울산', '부산', '전북', '전남', '광주', '제주']
    const [newArea, setNewArea] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccessMessage, setIsSuccessMessage] = useState(false)
    const [isNoChange, setIsNoChange] = useState(false)

    const dispatch = useDispatch();

    const handleAreaChange = selectedArea => setNewArea(selectedArea)

    const handleUpdate = () => {
        updateData(
            UPDATE_INFORMATION, {area: newArea.option, item: 'area'},
            updateArea, setIsLoading, setIsSuccessMessage, dispatch
        ).then();
    };

    useEffect(() => {
        setIsNoChange(!newArea)
    }, [newArea])
    return (
        <div style={{width: '300px'}}>
            <p>현재 지역 : {area}</p>
            <CustomSelect options={areaList} item='지역' onChange={handleAreaChange}/>
            {isSuccessMessage && <p>수정 완료</p>}
            <Button onClick={handleUpdate} disabled={isNoChange}>
                {isLoading ? (<Loading/>) : ("수정")}
            </Button>
        </div>
    )
}
export const AgeSetting = ({age}) => {
    return (
        <>
            <p>나이</p>
            {!age ?
                <p style={{fontSize: '15px'}}>
                    등록되지않음
                </p>
                : <p>{age}</p>
            }
        </>
    )
}
export const ChangeAge = ({age}) => {
    const [newAge, setNewAge] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccessMessage, setIsSuccessMessage] = useState(false)
    const ageList = ['10대', '20대', '30대', '40대', '50대', '60대 이상']
    const [isNoChange, setIsNoChange] = useState(false)

    const dispatch = useDispatch();
    const handleAgeChange = selectedAge => setNewAge(selectedAge)

    const handleUpdate = () => {
        updateData(
            UPDATE_INFORMATION, {age: newAge.option, item: 'age'},
            updateAge, setIsLoading, setIsSuccessMessage, dispatch
        ).then();
    };
    useEffect(() => {
        setIsNoChange(!newAge)
    }, [newAge])
    return (
        <div style={{width: '300px'}}>
            <p>현재 나이 : {age}</p>
            <CustomSelect options={ageList} item='나이' onChange={handleAgeChange}/>
            {isSuccessMessage && <p>수정 완료</p>}
            <Button onClick={handleUpdate} disabled={isNoChange}>
                {isLoading ? (<Loading/>) : ("수정")}
            </Button>
        </div>
    )
}

const WeightAge = ({value, type}) => {
    const stringValue = value.toString()
    const isWeight = type === 'kg';
    const unit = isWeight ? 'kg' : 'cm';
    const isRange = stringValue.includes('이상') || stringValue.includes('이하');
    const weightAndAge = isWeight ? stringValue.substring(0, 2) : stringValue.substring(0, 3);
    const upAndDown = isRange ? `${unit} ${stringValue.includes('이상') ? '이상' : '이하'}` : unit;

    const style = {
        fontSize: '15px',
    };

    return (
        <p>
            {weightAndAge}
            <span style={style}>{upAndDown}</span>
        </p>
    );
}
export const WeightSetting = ({weight}) => {
    if (!weight) return (
        <>
            <p>몸무게</p>
            <p style={{fontSize: '15px'}}>
                등록되지 않음
            </p>
        </>
    )

    return (
        <>
            <p>몸무게</p>
            <WeightAge value={weight} type={'kg'}/>
        </>
    )
}

export const ChangeWeight = ({weight}) => {
    const [newWeight, setNewWeight] = useState(null);
    const weightList = ['50 이하', 50, 60, 70, 80, 90, '90 이상']
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccessMessage, setIsSuccessMessage] = useState(false)
    const [isNoChange, setIsNoChange] = useState(false)

    const dispatch = useDispatch();

    const handleWeightChange = selectedWeight => setNewWeight(selectedWeight)

    const handleUpdate = () => {
        updateData(
            UPDATE_INFORMATION,
            {weight: newWeight.option, item: 'weight'},
            updateWeight, setIsLoading, setIsSuccessMessage, dispatch
        ).then();
    };

    useEffect(() => {
        setIsNoChange(!newWeight)
    }, [newWeight])
    return (
        <div style={{width: '300px'}}>
            <p>
                현재 몸무게 : <WeightAge value={weight} type={'kg'}/>
            </p>
            <CustomSelect options={weightList} item='몸무게' onChange={handleWeightChange}/>
            {isSuccessMessage && <p>수정 완료</p>}
            <Button onClick={handleUpdate} disabled={isNoChange}>
                {isLoading ? (<Loading/>) : ("수정")}
            </Button>
        </div>
    )
}
export const HeightSetting = ({height}) => {
    if (!height) return (
        <>
            <p>키</p>
            <p style={{fontSize: '15px'}}>
                등록되지 않음
            </p>
        </>
    )

    return (
        <>
            <p>키</p>
            <WeightAge value={height} type={'cm'}/>
        </>
    )
}
export const ChangeHeight = ({height}) => {
    const [newHeight, setNewHeight] = useState(null);
    const heightList = ['150 이하', 150, 160, 170, 180, 190, '190 이상']
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccessMessage, setIsSuccessMessage] = useState(false)
    const [isNoChange, setIsNoChange] = useState(false)

    const dispatch = useDispatch();

    const handleHeightChange = (selectedHeight) => {
        setNewHeight(selectedHeight)
    }
    const handleUpdate = () => {
        updateData(
            UPDATE_INFORMATION,
            {height: newHeight.option, item: 'height'},
            updateHeight, setIsLoading, setIsSuccessMessage, dispatch
        ).then(
            () => {
            },
            (error) => {
                console.error(error);
            }
        );
    };

    useEffect(() => {
        setIsNoChange(!newHeight)
    }, [newHeight])
    return (
        <div style={{width: '300px'}}>
            <p>
                현재 키 :<WeightAge value={height} type={'cm'}/>
            </p>
            <CustomSelect options={heightList} item='키' onChange={handleHeightChange}/>
            {isSuccessMessage && <p>수정 완료</p>}
            <Button onClick={handleUpdate} disabled={isNoChange}>
                {isLoading ? (<Loading/>) : ("수정")}
            </Button>
        </div>
    )
}
export const ExerciseSetting = ({exercise}) => {
    return (
        <>
            <p>주로 하는 운동</p>
            {!exercise && <p style={{fontSize: '15px'}}>등록되지 않음</p>}
            <p>{exercise}</p>
        </>
    )
}
export const ChangeExercise = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccessMessage, setIsSuccessMessage] = useState(false)
    const dispatch = useDispatch();

    const handleClickChange = (selectedExercise) => {
        updateData(
            UPDATE_INFORMATION,
            {exercise: selectedExercise, item: 'exercise'},
            updateExercise, setIsLoading, setIsSuccessMessage, dispatch
        ).then();
    }
    return (
        <>
            <p>주로 하는 운동 재선택</p>
            {isLoading ? (<Loading/>) : (
                <>
                    <Button onClick={() => handleClickChange('홈 트레이닝')}>홈 트레이닝</Button>
                    <Button onClick={() => handleClickChange('헬스')}>헬스</Button>
                </>
            )}
            {isSuccessMessage && <p>수정 완료</p>}
        </>
    )
}

export const WishListSettingButton = () => <span id={'wishList'}>고민 수정</span>

export const ChangeWishList = ({wishList}) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const newWishList = ['평생 숙제 다이어트', '뱃살, 옆구리살 빼기', '마른 몸 벗어나기', '탄탄한 몸 만들기', '넓은 어깨 갖기', '슬림한 하체 만들기', '벌크업 하기', '굵코 큰 팔 만들기', '힙업', '팔뚝 군살 제거', '전체적인 근육량 증가', '선명한 복근 만들기', '굵은 하체 만들기']
    const [isNoChange, setIsNoChange] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccessMessage, setIsSuccessMessage] = useState(false)
    const dispatch = useDispatch();

    const handleOptionsChange = selectedOptions => setSelectedOptions(selectedOptions);


    useEffect(() => {
        setIsNoChange(selectedOptions.length === 0)
    }, [selectedOptions])
    const handleUpdate = () => {
        updateData(
            UPDATE_INFORMATION,
            {wishList: selectedOptions, item: 'wishList'},
            updateWishList, setIsLoading, setIsSuccessMessage, dispatch
        ).then();
    };
    return (
        <div style={{width: '335px'}}>
            <h2>고민 재선택</h2>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <ButtonGroup buttons={newWishList} selectedWishList={wishList} onChange={handleOptionsChange}/>
                <br/>
                <Button disabled={isNoChange} style={{
                    width: '150px',
                    backgroundColor: isNoChange ? ThemeColor.disabledButtonColor : ThemeColor.buttonColor
                }} onClick={handleUpdate}>
                    {isLoading ? (<Loading/>) : ("수정")}
                </Button>

                {isSuccessMessage && <p>수정 완료</p>}
            </div>
        </div>
    )
}

const ChangePublic = ({item, isPublic}) => {
    const [isItemPublic, setIsItemPublic] = useState(isPublic[0])
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch();


    const publicStyle = {
        display: 'flex',
        width: '230px',
        justifyContent: 'space-between',
        margin: '10px 0'
    }
    const handleChange = () => {
        setIsLoading(true)
        const headers = functions.getJWT()
        setIsItemPublic(prev => !prev)
        axios.put(UPDATE_INFORMATION_PUBLIC, {isPublic: !isItemPublic, item: isPublic[1]}, {headers})
            .then(() => {
                dispatch(updateItemPublic({
                    item: isPublic[1],
                    isPublic: !isItemPublic
                }))
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))

    }
    return (
        <div style={publicStyle}>
            <span>{item}</span>
            {isLoading ? <Loading/> : <ToggleButton isOn={isItemPublic} onClick={handleChange}/>}
        </div>

    )
}
export const PublicUserInformation = ({isPublic}) => {
    const item = {
        '팔로잉 팔로우': [isPublic.isFollowPublic, 'isFollowPublic'],
        '나이': [isPublic.isAgePublic, 'isAgePublic'],
        '지역': [isPublic.isAreaPublic, 'isAreaPublic'],
        '몸무게': [isPublic.isWeightPublic, 'isWeightPublic'],
        '키': [isPublic.isHeightPublic, 'isHeightPublic'],
        '주로 하는 운동': [isPublic.isExercisePublic, 'isExercisePublic'],
        '해결하고 싶은 고민': [isPublic.isWishListPublic, 'isWishListPublic'],
        '게시글': [isPublic.isPostPublic, 'isPostPublic']
    }

    const renderItem = Object.keys(item)
        .map(key => <ChangePublic item={key} isPublic={item[key]}/>)

    return (
        <>
            <span>유저 정보 비공개</span>
            <div>
                {renderItem}
            </div>
        </>
    )
}

export const WishListSetting = ({wishList}) => {
    return (
        <>
            <p>해결하고싶은 고민</p>
            {wishList.length === 0 && <p style={{fontSize: '15px'}}>등록되지 않음</p>}
            {wishList.map((item, index) => <p key={index}>{index + 1}.&nbsp;{item}</p>
                )
            }
        </>
    )
}