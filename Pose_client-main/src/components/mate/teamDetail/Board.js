import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import axios from "axios";
import {useLocation} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useSelector} from "react-redux";


import {
    Button,
    ToggleButton,
    Input,
    UserBoxSize,
    FeedbackButton,
    NoticeBox,
    FeedbackList, CommentsList,
    Loading,
    TwoTabNav,
    UserBox,
    ModalWrapper,
    CommentInput, HorizonLine
} from "../../UI/UIPackage";
import {
    POST_TEAM_BOARD,
    GET_TEAM_BOARD,
    POST_TEAM_BOARD_COMMENT,
    DELETE_TEAM_BOARD,
    UPDATE_TEAM_BOARD,
    DELETE_TEAM_FREE_BOARD_COMMENT
} from "../../../services/api";
import {faArrowUp, faComment, faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";
import {functions} from "../../../utils/Functions";


const CommentDelete = ({teamId, boardId, commentId}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isUpdateButtonClicked, setIsUpdateButtonClicked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setIsUpdateButtonClicked(false)
    }
    const deleteComment = async () => {
        console.log(teamId, boardId, commentId)
        const headers = functions.getJWT()
        await axios.delete(`${DELETE_TEAM_FREE_BOARD_COMMENT}/${teamId}/${boardId}/${commentId}`, {headers: headers})
            .catch(e => console.log(e))
            .finally(() => {
                setIsLoading(false)
                closeModal()
            })
    }
    const buttonStyle = {display: isUpdateButtonClicked ? 'none' : 'block'}
    return (
        <ModalWrapper>
            <button className="ellipse" onClick={openModal}>
                <FontAwesomeIcon icon={faEllipsisVertical}/>
            </button>
            {isModalOpen && (
                <div className="modal">
                    <div>
                        <Button style={buttonStyle} onClick={deleteComment}>{isLoading ? <Loading/> : '댓글 삭제'}</Button>
                    </div>
                    <button id={'close'} onClick={closeModal}>닫기</button>

                </div>
            )}

        </ModalWrapper>
    )
}
const CommentList = ({display, onChange, board, isAnonymous, userName}) => {
    const comment = useRef("")
    const [isLoading, setIsLoading] = useState(false)
    const [comments, setComments] = useState(board.comments)

    const location = useLocation()
    const teamId = location.pathname.split('/')[2]
    const id = useSelector(state => state._id)

    const handleCommentSubmit = async () => {
        setIsLoading(true)
        const headers = functions.getJWT()
        try {
            await axios.post(`${POST_TEAM_BOARD_COMMENT}/${teamId}`, {
                boardId: board._id,
                comment: comment.current.value,
                isAnonymous: isAnonymous
            }, {headers})
            setComments(comments => [...comments, isAnonymous ? comment.current.value : {
                user: userName,
                content: comment.current.value
            }])

        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }
    const buttonStyle = {
        display: display ? 'block' : 'none'
    }
    const handleCommentButtonClick = () => {
        display = !display
        onChange(display)
    }
    return (
        <FeedbackList style={{...buttonStyle}}>
            {(comments.length === 0) && <p>댓글이 없습니다.</p>}
            {comments?.map((comment, index) => {
                return (
                    <CommentsList key={index}>
                        {isAnonymous ?
                            <div className='annoy'>
                                <span id='annoy'>익명{index + 1}</span>
                                <span id='annoyComment'>{comment}</span>
                            </div>
                            :
                            <div className='free'>
                                <div className='eachComment'>
                                    <UserBox name={comment.user} size={UserBoxSize.small} id={comment.userId}/>
                                    <span id='comment'>{comment.content}</span>
                                </div>
                                {comment.userId === id &&
                                    <CommentDelete teamId={teamId} boardId={board._id} commentId={comment._id}/>}
                            </div>
                        }
                    </CommentsList>
                )
            })
            }
            <CommentInput>

                <Input type="text" placeholder={'댓글을 입력하세요'} ref={comment}/>
                <button onClick={handleCommentSubmit}>
                    {isLoading ? <Loading/> : <FontAwesomeIcon icon={faArrowUp}/>}
                </button>
            </CommentInput>
            <button className='close' onClick={handleCommentButtonClick}>닫기</button>
        </FeedbackList>
    )

}
const StyledSpan = styled.span`margin: 5px 180px 5px 2px;`;

const UpdateBoard = ({board, teamId, setIsUpdateButtonClicked, closeModal}) => {
    const [newBoard, setNewBoard] = useState({title: "", content: ""})
    const isUpdated = (board.postTitle === newBoard.title) && (board.postContent === newBoard.content)

    const handleBoardChange = e => setNewBoard({...newBoard, [e.target.name]: e.target.value})

    const updateBoard = async () => {
        const headers = functions.getJWT()
        const boardId = board._id
        let {title, content} = newBoard
        if (!title) title = board.postTitle
        if (!content) content = board.postContent
        console.log(title, content)
        await axios.put(`${UPDATE_TEAM_BOARD}/${teamId}/${boardId}`, {title, content}, {headers})
            .catch(e => console.log(e))
            .finally(() => {
                setIsUpdateButtonClicked(false)
                closeModal()
            })
    }
    return (

        <>
            <h4>게시글 수정</h4>
            <StyledSpan>제목</StyledSpan>
            <Input type='text' name='title' defaultValue={board.postTitle} onChange={handleBoardChange}/>
            <StyledSpan>내용</StyledSpan>
            <Input type='text' name='content' defaultValue={board.postContent} onChange={handleBoardChange}/>
            <div>
                <Button onClick={updateBoard}>저장</Button>
                <Button onClick={() => setIsUpdateButtonClicked(false)}>취소</Button>
            </div>
        </>
    )
}
const UpdateAndDelete = ({board, teamId, setIsCommentButtonClick}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isUpdateButtonClicked, setIsUpdateButtonClicked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const openModal = () => {
        setIsModalOpen(true);
        setIsCommentButtonClick(false)
    }
    const closeModal = () => {
        setIsModalOpen(false);
        setIsUpdateButtonClicked(false)
    }
    const deletePost = async () => {
        const headers = functions.getJWT()
        const boardId = board._id
        setIsLoading(true)
        await axios.delete(`${DELETE_TEAM_BOARD}/${teamId}/${boardId}`, {headers: headers})
            .catch(e => console.log(e))
            .finally(() => {
                setIsLoading(false)
                closeModal()
            })
    }
    return (
        <ModalWrapper>
            <button onClick={openModal} className={'ellipse'}>
                <FontAwesomeIcon icon={faEllipsisVertical}/>
            </button>
            {isModalOpen && (
                <div className={'modal'}>
                    <div>
                        <Button style={{display: isUpdateButtonClicked ? 'none' : 'block'}}
                                onClick={() => setIsUpdateButtonClicked(true)}>수정</Button>
                        <Button style={{display: isUpdateButtonClicked ? 'none' : 'block'}} onClick={deletePost}>
                            {isLoading ? <Loading/> : '삭제'}
                        </Button>
                    </div>
                    {isUpdateButtonClicked && <UpdateBoard board={board} teamId={teamId} closeModal={closeModal}
                                                           setIsUpdateButtonClicked={setIsUpdateButtonClicked}/>}
                    <button id={'close'} onClick={closeModal}>닫기</button>
                </div>
            )}

        </ModalWrapper>
    )

}
const EachBoard = ({board, name, isAnonymous, teamId}) => {
    const [isCommentButtonClick, setIsCommentButtonClick] = useState(false)
    const handleCommentButtonClick = () => setIsCommentButtonClick(isCommentButtonClick => !isCommentButtonClick)
    // console.log(board)
    const id = useSelector(state => state._id)
    return (
        <>
            <NoticeBox>
                {isAnonymous ?
                    <>
                        <span className={'title'}>{board.postTitle}</span>
                        <article>
                            <span className={'boardContent'}>{board.postContent}</span>
                            <FeedbackButton className={'comments'} onClick={handleCommentButtonClick}>
                                <FontAwesomeIcon className={'comment'} icon={faComment}/>
                                <span>{board.comments?.length}개</span>
                            </FeedbackButton>
                        </article>
                    </>
                    :
                    <>
                        <main>
                            <section>
                                <UserBox name={board.author} size={UserBoxSize.small} id={board.authorId}/>
                                {board.authorId === id && <UpdateAndDelete board={board} teamId={teamId}
                                                                           setIsCommentButtonClick={setIsCommentButtonClick}/>}
                            </section>
                            <span className={'title'}>{board.postTitle}</span>
                            <article>
                                <span className={'boardContent'}>{board.postContent}</span>
                                <FeedbackButton className={'comments'} onClick={handleCommentButtonClick}>
                                    <FontAwesomeIcon className={'comment'} icon={faComment}/>
                                    <span>{board.comments?.length}개</span>
                                </FeedbackButton>
                            </article>
                        </main>
                    </>}

                <HorizonLine/>
            </NoticeBox>
            <CommentList board={board} display={isCommentButtonClick} userName={name} isAnonymous={isAnonymous}
                         onChange={handleCommentButtonClick}/>

        </>
    )
}
const WriteBoardContainer = styled.div`
  width: 300px;
  display: ${props => props.isDisplay ? 'block' : 'none'};

  Button {
    width: 110px;
  }

  .toggle {
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;

    span {
      font-weight: bold;
    }

    div {
      display: flex;
      justify-content: space-between;
      width: 130px;
    }
  }

  .button {
    display: flex;
    justify-content: space-evenly;
  }

`
const WriteBoard = ({display, onChange, teamId}) => {
    const comment = {title: useRef(""), content: useRef("")}
    const [isAnonymous, setIsAnonymous] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleCloseButtonClick = () => {
        display = !display
        onChange(display)
    }
    const handlePostClick = async () => {
        setIsLoading(true)
        const headers = functions.getJWT()
        await axios.post(`${POST_TEAM_BOARD}/${teamId}`, {
            title: comment.title.current.value,
            content: comment.content.current.value,
            isAnonymous: isAnonymous
        }, {headers})
            .then(() => handleCloseButtonClick())
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }
    return (
        <WriteBoardContainer isDisplay={display}>
            <div className={'toggle'}>
                <span>게시글 작성</span>
                <div>
                    <ToggleButton isOn={isAnonymous} onClick={() => setIsAnonymous((isAnonymous) => !isAnonymous)}/>
                    <span>익명게시판</span>
                </div>
            </div>
            <Input type='text' placeholder='제목 입력' ref={comment.title}/>
            <Input type='text' placeholder='내용 입력' ref={comment.content}/>
            <div className={'button'}>
                <Button onClick={handlePostClick}>{
                    isLoading ? <Loading/> : '등록'
                }</Button>
                <Button onClick={handleCloseButtonClick}>취소</Button>
            </div>
        </WriteBoardContainer>
    )
}

function Board(props) {
    const [isButtonClicked, setIsButtonClicked] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [board, setBoard] = useState()

    const location = useLocation()
    const teamId = location.pathname.split('/')[2]

    const name = useSelector((state) => state.name)

    const handleButtonClick = () => setIsButtonClicked(!isButtonClicked)

    const buttonStyle = {
        display: isButtonClicked ? 'none' : 'block'
    }
    const getTeamBoard = async () => {
        const headers = functions.getJWT()
        await axios.get(`${GET_TEAM_BOARD}/${teamId}`, {headers})
            .then(res => setBoard(res.data))
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }
    useEffect(() => {
        getTeamBoard().then()
    }, []);
    // console.log(board)

    const tab = {
        '자유게시판': board?.newFreeBoard.map(board =>
            <EachBoard board={board} isAnonymous={false} name={name} key={board._id} teamId={teamId}/>),
        '비밀게시판': board?.newAnonymousBoard.map(board =>
            <EachBoard board={board} isAnonymous={true} name={name} key={board._id} teamId={teamId}/>)
    }

    return (
        <>
            <TwoTabNav tabStyle={{width: '250px', marginBottom: '20px'}} tab={tab}/>
            <br/>
            <Button style={{width: '120px', ...buttonStyle}} onClick={handleButtonClick}>글 작성</Button>
            <WriteBoard onChange={setIsButtonClicked} display={isButtonClicked} teamId={teamId}/>
        </>
    );
}

export default Board;