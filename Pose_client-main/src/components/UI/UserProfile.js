import React from "react";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ThemeColor as themeColor} from "../../constants/Constants";


export const UserProfile = ({text, size}) => {
    const fontSize = (3 * size) / 5
    const randomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const color = randomColor();
    const textColor = (parseInt(color.replace('#', ''), 16) > 0xffffff / 2) ? 'black' : 'white';
    return (
        <div style={{
            borderRadius: '50%',
            backgroundColor: `${themeColor.navColor}`
        }}>
            {/*<span style={{*/}
            {/*    width: `${size}px`,*/}
            {/*    height: `${size}px`,*/}
            {/*    borderRadius: '50%',*/}
            {/*    background: color,*/}
            {/*    color: textColor,*/}
            {/*    display: 'flex',*/}
            {/*    fontSize: `${fontSize}px`,*/}
            {/*    justifyContent: 'center',*/}
            {/*    alignItems: 'center',*/}
            {/*}}>*/}
            {/*    {text && text[0].toUpperCase()}*/}
            {/*</span>*/}
            <span style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: `${size}px`,
                height: `${size}px`,
            }}>

                <FontAwesomeIcon icon={faUser}/>
            </span>
        </div>
    )
}