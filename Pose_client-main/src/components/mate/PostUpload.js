import React, {useState} from 'react';
import styled from "styled-components";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {storage} from '../../services/firebase'
import {ref, uploadBytes} from 'firebase/storage'
import {v4} from 'uuid'


import {Container, ThemeColor, Button, Loading} from "../UI/UIPackage";
import {functions} from "../../utils/Functions";
import {UPLOAD_USER_POST, MATE} from "../../services/api";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Label = styled.label`
  display: block;
  width: 340px;
  height: 340px;
  border: none;
  border-radius: 16px;
  background-color: ${ThemeColor.divColor};
  cursor: pointer;
`
const ImgInput = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const Span = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 85%;
  font-size: 180px;
  margin-bottom: 100px;
`
const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 30px;
`
const Textarea = styled.textarea`
  width: 320px;
  min-height: 100px;
  height: auto;
  resize: none;
  border: none;
  border-radius: 16px;
  background-color: ${ThemeColor.divColor};
  cursor: pointer;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  padding: 10px;
  font-family: 'Gothic', sans-serif;

  &::placeholder {
    color: #999;
  }
`
function PostUpload(props) {
    const [file, setFile] = useState(null);
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleRemove = () => setFile(null)
    const handleContentChange = e => setContent(e.target.value);


    const uploadImgToFirebase= async (file, fileName) => {
        if(file==null) return
        const fileRef=ref(storage, fileName)
        await uploadBytes(fileRef, file)
    }
    const handleSubmit= async () => {
        setIsLoading(true)
        try{
            const headers=functions.getJWT()
            const fileName=`images/${file.name+v4()}`
            await axios.post(UPLOAD_USER_POST, {
                fileName: fileName,
                content: content,
            }, {headers: headers})
            await uploadImgToFirebase(file, fileName)
        } catch (e) {
            console.log(e)
        }
        finally {
            setIsLoading(false)
            navigate(MATE)
        }
    }
    return (
        <Container>
            <h1>게시물 업로드</h1>

            <div style={{position: 'relative'}}>
                <Label htmlFor="fileInput">
                    {file ? (
                        <>
                            <ImgInput src={URL.createObjectURL(file)} alt="Uploaded"/>
                            <DeleteButton onClick={handleRemove}>
                                <FontAwesomeIcon icon={faTrashCan} />
                            </DeleteButton>
                        </>
                    ) : (
                        <Span>
                            +
                        </Span>
                    )}
                </Label>
                <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    style={{display: 'none'}}
                    onChange={e=>setFile(e.target.files[0])}
                />
            </div>
            <br/>
            <Textarea placeholder="내용을 입력하세요" onChange={handleContentChange}/>
            <br/>
            <Button style={{width: '100px'}} onClick={handleSubmit} disabled={!file}>
                {isLoading ? <Loading/> : '업로드'}
            </Button>
        </Container>
    );
}

export default PostUpload;
