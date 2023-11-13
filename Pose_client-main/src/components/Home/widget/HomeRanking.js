import React from 'react';
import {UserBox, ThemeColor, UserBoxSize} from "../../UI/UIPackage";
import {Link} from "react-router-dom";


//아이콘
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';

function HomeRanking(props) {
    const style = {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: `${ThemeColor.importantColor}`,
        width: "280px",
        padding: '5px 20px 5px 20px',
        borderRadius: '20px',
        margin: '15px 0 15px 0'
    }
    const size= UserBoxSize.medium;
    return (
        <div>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <div>랭킹</div>
                <Link to={'/ranking'} style={{textDecoration: 'none', color: 'black', marginRight:'20px'}}>
                    <FontAwesomeIcon icon={faArrowRight}/>
                </Link>
            </div>
            <div>

                <div style={style}>
                    <UserBox name='qwer' email='asdf' size={size}/>
                    <h3>1st</h3>
                </div>
                <div style={style}>
                    <UserBox name='qwer' email='asdf' size={size}/>
                    <h3>2nd</h3>
                </div>
                <div style={style}>
                    <UserBox name='qwer' email='asdf' size={size}/>
                    <h3>3rd</h3>
                </div>
            </div>

        </div>
    );
}

export default HomeRanking;