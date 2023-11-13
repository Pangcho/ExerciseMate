import React from 'react';
import {Container} from "../UI/UIPackage";
import Posts from "./Posts";
import {GET_MY_POSTS} from '../../services/api';

function MyPosts(props) {
    return (
        <Container>
            <h1>나의 게시물</h1>
            <Posts API={GET_MY_POSTS}/>
        </Container>
    );
}

export default MyPosts;