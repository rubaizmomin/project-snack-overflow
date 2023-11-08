import firebase from 'firebase/compat/app';
import React, { useEffect, useState } from 'react';
import 'firebase/compat/firestore';
const firebaseConfig = {
  //
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

const firestore = firebase.firestore();

const servers = {
    iceServers: [
      {
        urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
      },
    ],
    iceCandidatePoolSize: 10,
  };

const pc = new RTCPeerConnection(servers);
let localStream = null;
let remoteStream = null;
const localvideo = React.createRef();
const remotevideo = React.createRef();
function Video_connection(){
  const webcam_on = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

    // Push tracks from local stream to peer connection
    localStream.getTracks().forEach((track) => {
        pc.addTrack(track, localStream);
    });

    // Show stream in HTML video
    localvideo.current.srcObject = localStream;
    localvideo.current.onloadedmetadata = localvideo.current.play();
    remoteStream = new MediaStream();
    // Pull tracks from remote stream, add to video stream
    pc.ontrack = event => {
        event.streams[0].getTracks().forEach(track => {
            remoteStream.addTrack(track);
        });
    };
    remotevideo.current.srcObject = remoteStream;
  }
  return(
      <div>
        <h3>Remote Stream</h3>
        <video ref={remotevideo} autoplay playsinline></video>
        <h3>Local Stream</h3>
        <video ref={localvideo} autoPlay playsinline muted="muted"></video>
        <input id="callInput" />
        <button onClick={webcam_on}>Press</button>
        <button id="answerButton" disabled>Answer</button>
      </div>
  )
}

export default Video_connection;