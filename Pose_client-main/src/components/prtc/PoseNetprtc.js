import React from 'react';
import ml5 from "ml5";
import Sketch from "react-p5";
function PoseNetprtc(props) {
    let video
    let pose
    let poseNet
    let skeleton
    const setup=(p5, canvasParentRef)=>{
        p5.createCanvas(390, 480).parent(canvasParentRef)
        video = p5.createCapture(p5.VIDEO);
        video.hide();
        poseNet = ml5.poseNet(video);
        poseNet.on('pose', gotPoses);}
    const draw=(p5)=>{
        p5.translate(p5.width, 0);
        p5.scale(-1, 1);
        p5.image(video, 0, 0);
        if(pose){
            for(let i=0;i<skeleton.length; i++){
                let a=skeleton[i][0]
                let b=skeleton[i][1]
                p5.strokeWeight(2)
                p5.stroke(255)
                p5.line(a.position.x, a.position.y, b.position.x, b.position.y)}
            for(let i=0;i<pose.keypoints.length;i++){
                let x=pose.keypoints[i].position.x
                let y=pose.keypoints[i].position.y
                p5.fill(0,255,0)
                p5.stroke(255)
                p5.ellipse(x,y,16,16)}}}
    const gotPoses = (poses) => {

        if(poses.length>0){
            pose=poses[0].pose
            skeleton=poses[0].skeleton

            for(let i=0;i<pose.keypoints.length;i++){
                let x=pose.keypoints[i].position.x
                let y=pose.keypoints[i].position.y
            }}}
    return (<Sketch setup={setup} draw={draw}/>)
}
export default PoseNetprtc;

