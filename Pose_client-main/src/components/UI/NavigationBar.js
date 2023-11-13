import styled from "styled-components";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {ACCOUNT, MATE, SELECTED_EXERCISE, WISH_EXERCISE} from "../../services/api";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDumbbell, faHouse, faPeopleGroup, faUser} from "@fortawesome/free-solid-svg-icons";
import {ThemeColor} from "../../constants/Constants";
import {navClick} from "../../store/userState";

const Nav = styled.nav`
  z-index: 999;
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 390px;
  height: 60px;
  background-color: ${ThemeColor.navColor};
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 16px 16px 0 0;
`;
const BodyPadding = styled.div`
  padding-bottom: 60px;
  display: flex;
  justify-content: center;
`;
const NavButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${ThemeColor.navColor};
  font-size: 0.8rem;
  background-color: transparent;
  border: none;
  cursor: pointer;

  .navLink {
    text-decoration: none;
      //color: ${props => props?.active ? 'black' : 'gray'};
    color: gray;
    display: flex;
    flex-direction: column;

    .icon {
      font-size: 20px;
    }
  }

  span {
    font-size: 0.6rem;
  }


`;

export const NavigationBar = () => {
    const goals = useSelector((state) => state.goals)
    const activeNav = useSelector((state) => state.activeNav);
    const dispatch = useDispatch();

    const handleNavClick = link => dispatch(navClick({activeNav: link}));

    const navButtons = [
        {link: goals ? SELECTED_EXERCISE : WISH_EXERCISE, icon: faDumbbell, text: '운동'},
        {link: '/', icon: faHouse, text: '홈'},
        {link: MATE, icon: faPeopleGroup, text: '메이트'},
        {link: ACCOUNT, icon: faUser, text: '계정'},
    ];

    return (
        <BodyPadding>
            <Nav>
                {navButtons.map(button => (
                    <NavButton key={button.link}>
                        <Link onClick={() => handleNavClick(button.link)}
                              style={{color: activeNav === button.link ? 'black' : 'gray'}}
                              className={'navLink'}
                              to={button.link}>
                            <FontAwesomeIcon className={'icon'} icon={button.icon}/>
                            <span>{button.text}</span>
                        </Link>
                    </NavButton>
                ))}
            </Nav>
        </BodyPadding>
    );
};