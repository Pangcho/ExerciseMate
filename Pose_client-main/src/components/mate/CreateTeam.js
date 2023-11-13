import React, {useEffect, useRef, useState} from 'react';
import {Button, Container, Input, Loading, ThemeColor} from "../UI/UIPackage";
import styled from "styled-components";
import {functions} from "../../utils/Functions";
import axios from "axios";
import {CREATE_TEAM, MATE} from "../../services/api";
import {useNavigate} from "react-router-dom";

const INPUT_WIDTH = 330
const HashtagContainer = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: ${INPUT_WIDTH}px;
  background-color: ${ThemeColor.divColor};
  border-radius: 16px;
  height: 80px;
  margin-bottom: 20px;

  &::-webkit-scrollbar {

    display:none;
  }
`
const HashtagSpan = styled.span`
  display: flex;
  margin-right: 5px;
  background-color: ${ThemeColor.disabledButtonColor};
  border-radius: 10px;
  height: 40px;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  margin-left: 10px;
  font-size: 20px;
  font-weight: bold;

  &:before {
    content: '#';
  }

  button {
    border: none;
    margin-left: 5px;
    background-color: transparent;
    font-weight: bold;
    font-size: 20px;
  }

`

const HashtagComponent = ({onChange}) => {
    const [inputValue, setInputValue] = useState(''); // 입력한 해시태그 값
    const [hashtags, setHashtags] = useState([]); // 등록된 해시태그 목록
    const hashtagContainerRef = useRef(null); // 스크롤 가능한 컨테이너의 ref

    useEffect(() => {
        // 해시태그가 추가될 때마다 스크롤 위치를 맨 오른쪽으로 이동
        if (hashtagContainerRef.current) {
            hashtagContainerRef.current.scrollLeft = hashtagContainerRef.current.scrollWidth;
        }
        onChange(hashtags)
    }, [hashtags]);

    const handleAddHashtag = () => {
        if (inputValue) {
            setHashtags([...hashtags, inputValue]);
            setInputValue('');
        }
    };

    const handleRemoveHashtag = (index) => {
        const updatedHashtags = hashtags.filter((_, i) => i !== index);
        setHashtags(updatedHashtags);
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <HashtagContainer ref={hashtagContainerRef}>
                {hashtags.map((tag, index) => (
                        <HashtagSpan key={index}>
                            {tag}
                            <button onClick={() => handleRemoveHashtag(index)}>⨉</button>
                        </HashtagSpan>
                    )
                )
                }
            </HashtagContainer>
            <div>

                <Input
                    style={{width: '240px'}}
                    type="text"
                    placeholder="해시태그를 입력하세요"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <Button style={{width: '80px', height: '48px', marginLeft: '10px'}} disabled={!inputValue}
                        onClick={handleAddHashtag}>입력</Button>
            </div>
        </div>
    );
};

function CreateTeam(props) {
    const [teamName, setTeamName] = useState('')
    const [teamDesc, setTeamDesc] = useState('')
    const [hashtags, setHashtags] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const navigate=useNavigate()

    const handleHashtags = (hashtags) => {
        setHashtags(hashtags)
    }

    const handleCreateTeam = () => {
        const headers=functions.getJWT()
        const team = {
            teamName: teamName,
            description: teamDesc,
            hashtag: hashtags
        }
        try{
            setIsLoading(true)
            const res=axios.post(CREATE_TEAM, team, {headers: headers})
            console.log(res)
        }catch (e){
            console.log(e)
        }finally {
            setIsLoading(false)
            navigate(MATE)
        }
    }
    return (
        <Container>
            <h1>팀 만들기</h1>
            <div>
                <h4>팀 이름</h4>
                <Input style={{width: INPUT_WIDTH}} type="text" placeholder="팀 이름을 입력하세요" onChange={(e)=>setTeamName(e.target.value)}/>

            </div>
            <div>
                <h4>팀 소개</h4>
                <Input style={{width: INPUT_WIDTH}} type="text" placeholder="팀 소개를 입력하세요" onChange={(e)=>setTeamDesc(e.target.value)}/>
            </div>
            <div>
                <h4>해시태그</h4>
                <HashtagComponent onChange={handleHashtags}/>
            </div>
            <br/>
            <Button style={{width: '150px'}} onClick={handleCreateTeam}>
                {isLoading ? <Loading/> : '팀 만들기'}
            </Button>

        </Container>
    );
}

export default CreateTeam;

