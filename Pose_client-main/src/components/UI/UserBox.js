import {UserProfile} from "./UserProfile";
import React from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {USER_INFORMATION} from "../../services/api";
import styled from "styled-components";

const LinkUserBox = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  //text-decoration: none;
  //color: black;
  border:none;
    background-color: transparent;
    &:hover {
        cursor: pointer;
    }
`
export const UserBox = ({name, email, size, id}) => {
    const navigate = useNavigate()

    const handleClick = () => {
        if(id === undefined) return
        navigate(`${USER_INFORMATION}/${id}`, {state: {id: id}})
    }
    const fontSize = (3 * size) / 5
    return (
        <LinkUserBox onClick={handleClick}>
            <UserProfile text={name} size={size}/>
            <div style={{textAlign: 'left', marginLeft: '10px'}}>
                {name !== '' && <div style={{fontSize: fontSize}}>{name}</div>}
                {email !== '' && <div style={{fontSize: fontSize}}>{email}</div>}
            </div>
        </LinkUserBox>
    )
}