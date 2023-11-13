from flask import Flask, render_template, Response
import cv2
import mediapipe as mp
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import math
from mpl_toolkits import mplot3d
from scipy import spatial
from scipy.spatial import distance
from PIL import ImageFont, ImageDraw, Image
import pygame
import threading
import time

app = Flask(__name__)
mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose


last_warning_time = 0  # 경고음 재생 마지막 시간을 저장할 전역 변수를 생성합니다.

warning_sounds = [
    "C:/Users/Pang Choi/Desktop/music/narrow_arm.mp3",
    "C:/Users/Pang Choi/Desktop/music/extend_arm.mp3"
]

def play_warning_sound(warning_sound_path):
    pygame.mixer.init()
    pygame.mixer.music.load(warning_sound_path)
    pygame.mixer.music.play()

    # 음악 재생 동안 일시 정지
    while pygame.mixer.music.get_busy():
        pygame.time.Clock().tick(10)  # 설정하지 않으면, CPU 사용률이 급증할 수 있음

def play_warning_sound_with_delay():
    play_warning_sound()
    time.sleep(2)  # 음악 재생 후 딜레이

def calculateAngle(a, b, c):
    a = np.array(a)
    b = np.array(b)
    c = np.array(c)
    radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - \
        np.arctan2(a[1] - b[1], a[0] - b[0])
    angle = np.abs(radians*180.0/np.pi)

    if angle > 180.0:
        angle = 360 - angle

    return angle


def extractKeypoint(path):
    IMAGE_FILES = [path]
    stage = None
    joint_list_video = pd.DataFrame([])
    count = 0

    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        for idx, file in enumerate(IMAGE_FILES):
            image = cv2.imread(file)
            image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            image.flags.writeable = False
            results = pose.process(image)

            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
            image_h, image_w, _ = image.shape
            #
            try:

                landmarks = results.pose_landmarks.landmark

                left_shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x,
                                 landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]

                left_elbow = [landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x,
                              landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y]

                left_wrist = [landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x,
                              landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y]

                right_shoulder = [landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x,
                                  landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y]

                right_elbow = [landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].x,
                               landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].y]

                right_wrist = [landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].x,
                               landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].y]

                left_hip = [landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x,
                            landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y]

                left_knee = [landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].x,
                             landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].y]

                left_ankle = [landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].x,
                              landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].y]

                right_hip = [landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].x,
                             landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].y]

                right_knee = [landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value].x,
                              landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value].y]

                right_ankle = [landmarks[mp_pose.PoseLandmark.RIGHT_ANKLE.value].x,
                               landmarks[mp_pose.PoseLandmark.RIGHT_ANKLE.value].y]

                joints = []
                joint_list = pd.DataFrame([])

                for i, data_point in zip(range(len(landmarks)), landmarks):
                    joints = pd.DataFrame({
                        'frame': count,
                        'id': i,
                        'x': data_point.x,
                        'y': data_point.y,
                        'z': data_point.z,
                        'vis': data_point.visibility
                    }, index=[0])
                    joint_list = pd.concat([joint_list, joints], ignore_index=True)

                keypoints = []
                for point in landmarks:
                    keypoints.append({
                        'X': point.x,
                        'Y': point.y,
                        'Z': point.z,
                    })

                angle = []
                angle_list = pd.DataFrame([])
                angle1 = calculateAngle(
                    right_shoulder, right_elbow, right_wrist)
                angle.append(int(angle1))
                angle2 = calculateAngle(left_shoulder, left_elbow, left_wrist)
                angle.append(int(angle2))
                angle3 = calculateAngle(right_elbow, right_shoulder, right_hip)
                angle.append(int(angle3))
                angle4 = calculateAngle(left_elbow, left_shoulder, left_hip)
                angle.append(int(angle4))
                angle5 = calculateAngle(right_shoulder, right_hip, right_knee)
                angle.append(int(angle5))
                angle6 = calculateAngle(left_shoulder, left_hip, left_knee)
                angle.append(int(angle6))
                angle7 = calculateAngle(right_hip, right_knee, right_ankle)
                angle.append(int(angle7))
                angle8 = calculateAngle(left_hip, left_knee, left_ankle)
                angle.append(int(angle8))

                cv2.putText(image,
                            str(1),
                            tuple(np.multiply(right_elbow, [
                                  image_w, image_h,]).astype(int)),
                            cv2.FONT_HERSHEY_SIMPLEX,
                            0.5,
                            [255, 255, 0],
                            2,
                            cv2.LINE_AA
                            )
                cv2.putText(image,
                            str(2),
                            tuple(np.multiply(left_elbow, [
                                  image_w, image_h]).astype(int)),
                            cv2.FONT_HERSHEY_SIMPLEX,
                            0.5,
                            [255, 255, 0],
                            2,
                            cv2.LINE_AA
                            )
                cv2.putText(image,
                            str(3),
                            tuple(np.multiply(right_shoulder, [
                                  image_w, image_h]).astype(int)),
                            cv2.FONT_HERSHEY_SIMPLEX,
                            0.5,
                            [255, 255, 0],
                            2,
                            cv2.LINE_AA
                            )
                cv2.putText(image,
                            str(4),
                            tuple(np.multiply(left_shoulder, [
                                  image_w, image_h]).astype(int)),
                            cv2.FONT_HERSHEY_SIMPLEX,
                            0.5,
                            [255, 255, 0],
                            2,
                            cv2.LINE_AA
                            )
                cv2.putText(image,
                            str(5),
                            tuple(np.multiply(right_hip, [
                                  image_w, image_h]).astype(int)),
                            cv2.FONT_HERSHEY_SIMPLEX,
                            0.5,
                            [255, 255, 0],
                            2,
                            cv2.LINE_AA
                            )
                cv2.putText(image,
                            str(6),
                            tuple(np.multiply(
                                left_hip, [image_w, image_h]).astype(int)),
                            cv2.FONT_HERSHEY_SIMPLEX,
                            0.5,
                            [255, 255, 0],
                            2,
                            cv2.LINE_AA
                            )
                cv2.putText(image,
                            str(7),
                            tuple(np.multiply(right_knee, [
                                  image_w, image_h]).astype(int)),
                            cv2.FONT_HERSHEY_SIMPLEX,
                            0.5,
                            [255, 255, 0],
                            2,
                            cv2.LINE_AA
                            )
                cv2.putText(image,
                            str(8),
                            tuple(np.multiply(left_knee, [
                                  image_w, image_h]).astype(int)),
                            cv2.FONT_HERSHEY_SIMPLEX,
                            0.5,
                            [255, 255, 0],
                            2,
                            cv2.LINE_AA
                            )

            except:
                pass
            joint_list_video = pd.concat([joint_list_video, joint_list], ignore_index=True)

            cv2.rectangle(image, (0, 0), (100, 255), (255, 255, 255), -1)

            cv2.putText(image, 'ID', (10, 14), cv2.FONT_HERSHEY_SIMPLEX, 0.6, [
                        0, 0, 255], 2, cv2.LINE_AA)
            cv2.putText(image, str(1), (10, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.7, [
                        0, 153, 0], 2, cv2.LINE_AA)
            cv2.putText(image, str(2), (10, 70), cv2.FONT_HERSHEY_SIMPLEX, 0.7, [
                        0, 153, 0], 2, cv2.LINE_AA)
            cv2.putText(image, str(3), (10, 100), cv2.FONT_HERSHEY_SIMPLEX, 0.7, [
                        0, 153, 0], 2, cv2.LINE_AA)
            cv2.putText(image, str(4), (10, 130), cv2.FONT_HERSHEY_SIMPLEX, 0.7, [
                        0, 153, 0], 2, cv2.LINE_AA)
            cv2.putText(image, str(5), (10, 160), cv2.FONT_HERSHEY_SIMPLEX, 0.7, [
                        0, 153, 0], 2, cv2.LINE_AA)
            cv2.putText(image, str(6), (10, 190), cv2.FONT_HERSHEY_SIMPLEX, 0.7, [
                        0, 153, 0], 2, cv2.LINE_AA)
            cv2.putText(image, str(7), (10, 220), cv2.FONT_HERSHEY_SIMPLEX, 0.7, [
                        0, 153, 0], 2, cv2.LINE_AA)
            cv2.putText(image, str(8), (10, 250), cv2.FONT_HERSHEY_SIMPLEX, 0.7, [
                        0, 153, 0], 2, cv2.LINE_AA)

            cv2.putText(image, 'Angle', (40, 12), cv2.FONT_HERSHEY_SIMPLEX, 0.6, [
                        0, 0, 255], 2, cv2.LINE_AA)
            cv2.putText(image, str(int(angle1)), (40, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.7, [
                        0, 153, 0], 2, cv2.LINE_AA)
            cv2.putText(image, str(int(angle2)), (40, 70), cv2.FONT_HERSHEY_SIMPLEX, 0.7, [
                        0, 153, 0], 2, cv2.LINE_AA)
            cv2.putText(image, str(int(angle3)), (40, 100),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, [0, 153, 0], 2, cv2.LINE_AA)
            cv2.putText(image, str(int(angle4)), (40, 130),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, [0, 153, 0], 2, cv2.LINE_AA)
            cv2.putText(image, str(int(angle5)), (40, 160),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, [0, 153, 0], 2, cv2.LINE_AA)
            cv2.putText(image, str(int(angle6)), (40, 190),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, [0, 153, 0], 2, cv2.LINE_AA)
            cv2.putText(image, str(int(angle7)), (40, 220),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, [0, 153, 0], 2, cv2.LINE_AA)
            cv2.putText(image, str(int(angle8)), (40, 250),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, [0, 153, 0], 2, cv2.LINE_AA)

            # cv2.imshow('MediaPipe Feed',image)

            if cv2.waitKey(0) & 0xFF == ord('q'):
                break

        cv2.destroyAllWindows()
    return landmarks, keypoints, angle, image


def compare_pose(image, angle_point, angle_user, angle_target):
    global last_warning_time  # 전역 변수를 사용하려면 global 키워드를 사용해야 합니다.
    global stage
    angle_user = np.array(angle_user)
    angle_target = np.array(angle_target)
    angle_point = np.array(angle_point)
    stage = 0
    cv2.rectangle(image, (0, 0), (370, 80), (255, 255, 255), -1)
    cv2.rectangle(image, (0, 40), (40, 40), (255, 255, 255), -1)
    cv2.putText(image, str("Score:"), (10, 30),
                cv2.FONT_HERSHEY_SIMPLEX, 0.9, [0, 153, 0], 2, cv2.LINE_AA)
    
    height, width, _ = image.shape

    # left elbow
    if angle_user[0] > (angle_target[0] + 40):
        warning_sound_index = 0  # 경고음 인덱스를 설정합니다. (배열의 0번째 요소를 사용하려면 0으로 설정)
        sound_path = warning_sounds[warning_sound_index]  # 경고음 경로를 불러옵니다.

        current_time = time.time()
        time_passed_since_last_warning = current_time - last_warning_time

        if time_passed_since_last_warning > 4:  # 마지막 경고음 후 4초가 지났는지 확인합니다.
            sound_thread = threading.Thread(target=play_warning_sound, args=(sound_path,))
            sound_thread.start()
            last_warning_time = current_time
        stage = stage + 1
        cv2.circle(image, (int(angle_point[0][0]*width), int(angle_point[0][1]*height)), 30, (0, 0, 255), 5)

    if angle_user[0] < (angle_target[0] - 10):
        warning_sound_index = 1  # 경고음 인덱스를 설정합니다. (배열의 0번째 요소를 사용하려면 0으로 설정)
        sound_path = warning_sounds[warning_sound_index]  # 경고음 경로를 불러옵니다.

        current_time = time.time()
        time_passed_since_last_warning = current_time - last_warning_time

        if time_passed_since_last_warning > 4:  # 마지막 경고음 후 4초가 지났는지 확인합니다.
            sound_thread = threading.Thread(target=play_warning_sound, args=(sound_path,))
            sound_thread.start()
            last_warning_time = current_time
        stage = stage + 1
        cv2.circle(image, (int(angle_point[0][0]*width), int(angle_point[0][1]*height)), 30, (0, 0, 255), 5)
    
    if angle_user[1] > (angle_target[0] + 37):
        warning_sound_index = 0  # 경고음 인덱스를 설정합니다. (배열의 0번째 요소를 사용하려면 0으로 설정)
        sound_path = warning_sounds[warning_sound_index]  # 경고음 경로를 불러옵니다.

        current_time = time.time()
        time_passed_since_last_warning = current_time - last_warning_time

        if time_passed_since_last_warning > 4:  # 마지막 경고음 후 4초가 지났는지 확인합니다.
            sound_thread = threading.Thread(target=play_warning_sound, args=(sound_path,))
            sound_thread.start()
            last_warning_time = current_time
        stage = stage + 1
        cv2.circle(image, (int(angle_point[1][0]*width), int(angle_point[1][1]*height)), 30, (0, 0, 255), 5)

    if angle_user[1] < (angle_target[0] - 13):
        warning_sound_index = 1  # 경고음 인덱스를 설정합니다. (배열의 0번째 요소를 사용하려면 0으로 설정)
        sound_path = warning_sounds[warning_sound_index]  # 경고음 경로를 불러옵니다.

        current_time = time.time()
        time_passed_since_last_warning = current_time - last_warning_time

        if time_passed_since_last_warning > 4:  # 마지막 경고음 후 4초가 지났는지 확인합니다.
            sound_thread = threading.Thread(target=play_warning_sound, args=(sound_path,))
            sound_thread.start()
            last_warning_time = current_time
        stage = stage + 1
        cv2.circle(image, (int(angle_point[1][0]*width), int(angle_point[1][1]*height)), 30, (0, 0, 255), 5)
    
    if stage != 0:
        # print("FIGHTING!")
        cv2.putText(image, str("FIGHTING!"), (170, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, [0, 0, 255], 2, cv2.LINE_AA)

        pass
    else:
        # print("PERFECT")
        cv2.putText(image, str("PERFECT"), (170, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, [0, 0, 255], 2, cv2.LINE_AA)
    

def Average(lst):
    return sum(lst) / len(lst)


def dif_compare(x, y):
    average = []
    for i, j in zip(range(len(list(x))), range(len(list(y)))):
        result = 1 - \
            spatial.distance.cosine(list(x[i].values()), list(y[j].values()))
        average.append(result)
    score = math.sqrt(2*(1-round(Average(average), 2)))
    # print(Average(average))
    return score


def diff_compare_angle(x, y):
    new_x = []
    for i, j in zip(range(len(x)), range(len(y))):
        z = np.abs(x[i] - y[j])/((x[i] + y[j])/2)
        new_x.append(z)
        # print(new_x[i])
    return Average(new_x)


def convert_data(landmarks):
    df = pd.DataFrame(columns=['x', 'y', 'z', 'vis'])
    for i in range(len(landmarks)):
        df = df.append({"x": landmarks[i].x,
                        "y": landmarks[i].y,
                        "z": landmarks[i].z,
                        "vis": landmarks[i].visibility
                        }, ignore_index=True)
    return df

def gen_frames():
    cap = cv2.VideoCapture(0)
    path = "C:/Users/Pang Choi//Desktop/image/dumbbellcurl.jpg"
    x = extractKeypoint(path)
    dim = (700, 500)
    resized = cv2.resize(x[3], dim, interpolation=cv2.INTER_AREA)
    angle_target = x[2]
    point_target = x[1]
    exercise_state = 0
    exercise_count = 0
    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        while True:
            ret, frame = cap.read()
                
            if not ret:
                break

            image = cv2.cvtColor(cv2.flip(frame, 1), cv2.COLOR_BGR2RGB)
            image.flags.writeable = False
            results = pose.process(image)
            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
            image_height, image_width, _ = image.shape
            image = cv2.resize(
                image, (int(image_width * (1000 / image_height)), 600))
            try:
                landmarks = results.pose_landmarks.landmark

                shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x, landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y, landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].z,
                            round(landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].visibility*100, 2)]
                elbow = [landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x, landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y, landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].z,
                         round(landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].visibility*100, 2)]
                wrist = [landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x, landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y, landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].z,
                         round(landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].visibility*100, 2)]

                angle_point = []

                right_elbow = [landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].x,
                               landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].y]
                angle_point.append(right_elbow)

                left_elbow = [landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x,
                              landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y]
                angle_point.append(left_elbow)

                right_shoulder = [landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x,
                                  landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y]
                angle_point.append(right_shoulder)

                left_shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x,
                                 landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
                angle_point.append(left_shoulder)

                right_wrist = [landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].x,
                               landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].y]

                left_wrist = [landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x,
                              landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y]

                right_hip = [landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].x,
                             landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].y]
                angle_point.append(right_hip)

                left_hip = [landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x,
                            landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y]
                angle_point.append(left_hip)

                right_knee = [landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value].x,
                              landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value].y]
                angle_point.append(right_knee)

                left_knee = [landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].x,
                             landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].y]
                angle_point.append(left_knee)
                right_ankle = [landmarks[mp_pose.PoseLandmark.RIGHT_ANKLE.value].x,
                               landmarks[mp_pose.PoseLandmark.RIGHT_ANKLE.value].y]

                left_ankle = [landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].x,
                              landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].y]

                keypoints = []
                for point in landmarks:
                    keypoints.append({
                        'X': point.x,
                        'Y': point.y,
                        'Z': point.z,
                    })

                p_score = dif_compare(keypoints, point_target)

                angle = []

                angle1 = calculateAngle(
                    right_shoulder, right_elbow, right_wrist)
                angle.append(int(angle1))
                angle2 = calculateAngle(left_shoulder, left_elbow, left_wrist)
                angle.append(int(angle2))
                angle3 = calculateAngle(right_elbow, right_shoulder, right_hip)
                angle.append(int(angle3))
                angle4 = calculateAngle(left_elbow, left_shoulder, left_hip)
                angle.append(int(angle4))
                angle5 = calculateAngle(right_shoulder, right_hip, right_knee)
                angle.append(int(angle5))
                angle6 = calculateAngle(left_shoulder, left_hip, left_knee)
                angle.append(int(angle6))
                angle7 = calculateAngle(right_hip, right_knee, right_ankle)
                angle.append(int(angle7))
                angle8 = calculateAngle(left_hip, left_knee, left_ankle)
                angle.append(int(angle8))

                compare_pose(image, angle_point, angle, angle_target)
                a_score = diff_compare_angle(angle, angle_target)

                

                if (p_score >= a_score):
                    cv2.putText(image, str(int((1 - a_score)*100) + 10), (100, 30),
                                cv2.FONT_HERSHEY_SIMPLEX, 1, [0, 0, 255], 2, cv2.LINE_AA)

                else:
                    cv2.putText(image, str(int((1 - p_score)*100) + 10), (100, 30),
                                cv2.FONT_HERSHEY_SIMPLEX, 1, [0, 0, 255], 2, cv2.LINE_AA)
                
                if(p_score > a_score): score = (1 - a_score) * 100
                else: score = (1 - p_score) * 100
                

                if(score > 70 ):
                    mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                        mp_drawing.DrawingSpec(
                                            color=(255, 255, 255), thickness=4, circle_radius=4),
                                        mp_drawing.DrawingSpec(
                                            color=(0, 255, 0), thickness=3, circle_radius=3)
                                            )
                else:
                    mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                        mp_drawing.DrawingSpec(
                                            color=(255, 255, 255), thickness=4, circle_radius=4),
                                        mp_drawing.DrawingSpec(
                                            color=(0, 0, 255), thickness=3, circle_radius=3)
                                            )
                
                cv2.putText(image, "Count: ", (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0,153,0), 2, cv2.LINE_AA)
                # 운동 상태 분석 및 카운트
                if score < 60 and exercise_state == 0:
                    exercise_state = 1  # 초기 상태로 변경

                if score > 80 and exercise_state == 1:
                    exercise_count += 1  # 운동 완료 후 카운트 증가
                    exercise_state = 0   # 상태 초기화
                
                cv2.putText(image, str(int(exercise_count)), (110, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0,0,255), 2, cv2.LINE_AA)                          
                
                    
            except:
                pass

            
            if cv2.waitKey(10) & 0xFF == ord('q'):
                break

            ret, buffer = cv2.imencode('.jpg', image)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
    cap.release()
