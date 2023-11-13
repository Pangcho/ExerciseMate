import React from 'react';
import {Container, NavigationBar, TwoTabNav, PlusButton} from "../components/UI/UIPackage";
import {useSelector} from "react-redux";
import RecommendUser from "../components/mate/RecommendUser";
import {RECOMMEND_USER, UPLOAD_POST, MY_POSTS, GET_POSTS} from '../services/api';

import Posts from "../components/mate/Posts";
import MateTeam from "../components/mate/MateTeam";

const AllPosts = () => {
    const following = useSelector((state) => state.following)

    const plusMenuItem = [
        ['게시물 업로드', UPLOAD_POST],
        ['내 게시물 보기', MY_POSTS],
        ['추천 메이트', RECOMMEND_USER]
    ]
    return (
        <>
            {
                following ?
                    <>
                        <Posts API={GET_POSTS}/>
                        <PlusButton item={plusMenuItem}/>
                    </>
                    :
                    <RecommendUser/>
            }
        </>
    )
}

function Community(props) {
    const tab = {
        '게시글': <AllPosts/>,
        '메이트 팀': <MateTeam/>
    }
    return (
        <Container>
            <h1>메이트</h1>
            <TwoTabNav tab={tab}/>
            <NavigationBar/>
        </Container>
    );
}

export default Community;
