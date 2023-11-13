from flask import Flask, render_template, Response
import mediapipe as mp
from squat import gen_frames as gen_squat_frames
from side import gen_frames as gen_side_frames
from legRaise import gen_frames as gen_legRaise_frames
from pushup import gen_frames as gen_pushup_frames
from situp import gen_frames as gen_situp_frames
from dumbbell_curl import gen_frames as gen_dumbbell_frames
from shoulderPress import gen_frames as gen_shoulder_frames

from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app) 
mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/video_feed/squat')
def video_feed_squat():
    return Response(gen_squat_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/video_feed/side')
def video_feed_side():
    return Response(gen_side_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/video_feed/legRaise')
def video_feed_legraise():
    return Response(gen_legRaise_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/video_feed/pushUp')
def video_feed_pushup():
    return Response(gen_pushup_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/video_feed/situp')
def video_feed_situp():
    return Response(gen_situp_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/video_feed/dumbbell_curl')
def video_feed_dumbbel():
    return Response(gen_dumbbell_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/video_feed/shoulderPress')
def video_feed_shoulder():
    return Response(gen_shoulder_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(debug=True)
