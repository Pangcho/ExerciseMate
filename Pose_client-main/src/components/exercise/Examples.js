import React, {useState} from 'react';
import YouTube from 'react-youtube';
import {Container} from "../UI/UIPackage";

const VideoPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [videoTitle, setVideoTitle] = useState('');

    // 재생 상태 변경 핸들러
    const handlePlayToggle = () => {
        setIsPlaying(!isPlaying);
    };

    // YouTube 동영상 옵션 설정
    const opts = {
        height: '360',
        width: '640',
        playerVars: {
            autoplay: 1,
        },
    };

    // 동영상 준비 완료 시 호출되는 콜백 함수
    const handlePlayerReady = event => {
        const videoTitle = event.target.getVideoData().title;
        setVideoTitle(videoTitle);
    };

    return (
        <div>
            {/*{!isPlaying && (*/}
            {/*    <div>*/}
            {/*        <h3>{videoTitle}</h3>*/}
            {/*        <img*/}
            {/*            src="https://img.youtube.com/vi/nWhS28U6bCY/maxresdefault.jpg"*/}
            {/*            alt="Video Thumbnail"*/}
            {/*            onClick={handlePlayToggle}*/}
            {/*            style={{width:'50%'}}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*)}*/}
            {/*{isPlaying && (*/}
            {/*    <YouTube*/}
            {/*        videoId="nWhS28U6bCY"*/}
            {/*        opts={opts}*/}
            {/*        onReady={handlePlayerReady}*/}
            {/*        onEnd={handlePlayToggle}*/}
            {/*    />*/}
            {/*)}*/}
        </div>
    );
};

function Examples(props) {
    return (
        <>
            {/*<VideoPlayer/>*/}
            <br/>
            <div>hello</div>
        </>
    );
}

export default Examples;
