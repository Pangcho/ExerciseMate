import React from 'react';
import {UserBox, ThemeColor} from "../UI/UIPackage";


const RankInfo = ({name, email, rank}) => {
    const style = {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: `${ThemeColor.importantColor}`,
        width: "320px",
        padding: '5px 20px 5px 20px',
        borderRadius: '20px',
        margin: '12px 0 12px 0'
    }
    const h1Style = {
        border: '1px solid black',
        // marginBottom:'50px'
    }
    return (
        <div style={style}>
            <div>
                <span style={{fontSize:'13px'}}>{rank}</span>
            </div>
            <UserBox name={name} email={email}/>
            <div style={{marginLeft:'30px', marginRight:'10px'}}>
                <p>팔굽혀펴기</p>
                <p>10개</p>
            </div>
        </div>
    )
}
const RankInfoList = () => {

    return (
        <>
            <RankInfo name={'par2k'} email={'123@123.com'} rank={'1st'}/>
            <RankInfo name={'qwer'} email={'123@123.com'} rank={'2nd'}/>
            <RankInfo name={'asdf'} email={'123@123.com'} rank={'3rd'}/>
            <RankInfo name={'zxcv'} email={'123@123.com'} rank={'4th'}/>
            <RankInfo name={'tyui'} email={'123@123.com'} rank={'5th'}/>
        </>
    )
}

export default RankInfoList;
