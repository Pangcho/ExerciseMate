import React, {useEffect, useRef, useState} from 'react';
import {
    Button,
    HorizonLine,
    Input,
    Loading,
    ModalWrapper,
    NoticeBox,
    UserBox,
    UserBoxSize,
} from "../../UI/UIPackage";
import {useLocation} from "react-router-dom";
import styled from "styled-components";
import {functions} from "../../../utils/Functions";
import {POST_TEAM_NOTICE, GET_TEAM_NOTICE, DELETE_TEAM_NOTICE, UPDATE_TEAM_NOTICE} from "../../../services/api";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";


const WriteNotice = ({display, onChange, teamId}) => {
    const title = useRef("")
    const content = useRef("")
    const [isLoading, setIsLoading] = useState(false)

    const divStyle = {
        display: display ? 'block' : 'none',
        width: '310px',
        dButton: {
            width: '110px'
        },
        pButton: {
            width: '110px',
        },
        div: {
            display: 'flex',
            width: '300px',
            justifyContent: 'space-evenly',

        }
    }
    const handlePostClick = async () => {
        setIsLoading(true)
        const headers = functions.getJWT()
        console.log(title.current.value, content.current.value)
        await axios.post(`${POST_TEAM_NOTICE}/${teamId}`, {
            title: title.current.value,
            content: content.current.value
        }, {headers})
            .then(() => handleCloseButtonClick())
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))

    }
    const handleCloseButtonClick = () => {
        display = !display
        onChange(display)
    }
    return (
        <div style={divStyle}>
            <h4>공지 작성</h4>
            <Input type='text' placeholder='제목 입력' ref={title}/>
            <Input type='text' placeholder='내용 입력' ref={content}/>
            <div style={divStyle.div}>
                <Button onClick={handlePostClick} style={divStyle.pButton}>
                    {isLoading ? <Loading/> : '등록'}
                </Button>
                <Button onClick={handleCloseButtonClick} style={divStyle.dButton}>취소</Button>
            </div>
        </div>
    )
}
const StyledSpan = styled.span`margin: 5px 180px 5px 2px;`;

const UpdateNotice = ({notice, teamId, setIsUpdateButtonClicked, closeModal}) => {
    const [newNotice, setNewNotice] = useState({title: "", content: ""})
    const handleNoticeChange = e => setNewNotice({...newNotice, [e.target.name]: e.target.value})

    const updateNotice = async () => {
        const headers = functions.getJWT()
        const noticeId = notice._id
        let {title, content} = newNotice
        if (!title) title = notice.noticeTitle
        if (!content) content = notice.noticeContent

        await axios.put(`${UPDATE_TEAM_NOTICE}/${teamId}/${noticeId}`, {title, content}, {headers})
            .catch(e => console.error(e))
            .finally(() => {
                setIsUpdateButtonClicked(false)
                closeModal()
            })
    }
    return (
        <>
            <h4>공지 수정</h4>
            <StyledSpan>제목</StyledSpan>
            <Input name='title' type='text' defaultValue={notice.noticeTitle} onChange={handleNoticeChange}/>
            <StyledSpan>내용</StyledSpan>
            <Input name='content' type='text' defaultValue={notice.noticeContent} onChange={handleNoticeChange}/>
            <div>
                <Button onClick={updateNotice}>저장</Button>
                <Button onClick={() => setIsUpdateButtonClicked(false)}>취소</Button>
            </div>
        </>
    )
}

const UpdateAndDelete = ({notice, teamId}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateButtonClicked, setIsUpdateButtonClicked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setIsUpdateButtonClicked(false)
    }

    const deletePost = async () => {
        const headers = functions.getJWT()
        const noticeId = notice._id
        setIsLoading(true)
        await axios.delete(`${DELETE_TEAM_NOTICE}/${teamId}/${noticeId}`, {headers: headers})
            .catch((e) => console.error(e))
            .finally(() => {
                setIsLoading(false)
                closeModal()
            })
    }
    const buttonStyle = {display: isUpdateButtonClicked ? 'none' : 'block'}
    return (
        <ModalWrapper>
            <button onClick={openModal} className={'ellipse'}>
                <FontAwesomeIcon icon={faEllipsisVertical}/>
            </button>
            {isModalOpen && (
                <div className={'modal'}>
                    <div>
                        <Button style={buttonStyle}
                                onClick={() => setIsUpdateButtonClicked(true)}>수정</Button>
                        <Button style={buttonStyle} onClick={deletePost}>
                            {isLoading ? <Loading/> : '삭제'}
                        </Button>
                    </div>
                    {isUpdateButtonClicked && <UpdateNotice notice={notice} teamId={teamId} closeModal={closeModal}
                                                            setIsUpdateButtonClicked={setIsUpdateButtonClicked}/>}
                    <button id={'close'} onClick={closeModal}>닫기</button>
                </div>
            )}
        </ModalWrapper>

    )
}
const NoticeList = ({teamId}) => {
    const [notices, setNotices] = useState()

    const id = useSelector(state => state._id)
    const getTeamNotice = async () => {
        const headers = functions.getJWT()
        await axios.get(GET_TEAM_NOTICE + '/' + teamId, {headers})
            .then(res => setNotices(res.data))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getTeamNotice().then()
    }, [notices])

    return (
        <>
            {notices?.map((notice, index) => {
                return (
                    <NoticeBox key={notice._id}>
                        <main>
                            <section>
                                <UserBox name={notice.author} size={UserBoxSize.small} id={notice.authorId}/>
                                {notice.authorId === id && <UpdateAndDelete notice={notice} teamId={teamId}/>}
                                {/*<FontAwesomeIcon icon={faEllipsisVertical}/>*/}
                            </section>
                            <span className={'title'}>{notice.noticeTitle}</span>
                            <p className={'content'}>{notice.noticeContent}</p>
                        </main>
                        <HorizonLine/>
                    </NoticeBox>
                )
            })}
        </>
    )

}

function Notice(props) {
    const [isButtonClicked, setIsButtonClicked] = useState(false)
    const location = useLocation()
    const teamId = location.pathname.split('/')[2]


    const handleButtonClick = () => {
        setIsButtonClicked(!isButtonClicked)
    }
    const buttonStyle = {
        display: isButtonClicked ? 'none' : 'block'
    }

    return (
        <>
            <h2 style={{marginLeft: '-240px'}}>공지</h2>
            <NoticeList teamId={teamId}/>
            <br/>
            <Button style={{width: '120px', ...buttonStyle}} onClick={handleButtonClick}>글 작성</Button>
            <WriteNotice onChange={setIsButtonClicked} display={isButtonClicked} teamId={teamId}/>
            <br/>
        </>
    );
}

export default Notice;