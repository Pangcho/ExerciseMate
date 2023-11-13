import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {ThemeColor} from "../../constants/Constants";

const Box=styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 16px;
  padding: 0 20px;
  background-color: ${ThemeColor.divColor};
  //background-color: transparent;
  text-decoration: none;
  color: black;

  h3 {
    margin-bottom: 2px;
  }

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  p {
    margin-right: 15px;
  }
`
export const LinkBox = ({url, title, content}) => {
    return (
            <Box to={url}>
                {title&& <h3>{title}</h3>}
                <div>

                <p>{content}</p>
                <FontAwesomeIcon icon={faArrowRight}/>
                </div>
            </Box>
    );
}

