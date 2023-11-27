import React, { useState } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import firebase from 'firebase/compat/app';
const firebaseConfig = {
    apiKey: "AIzaSyDeiAhAi21ev36X-B0z9_sN4YexK7o1VY4",
    authDomain: "project-snack-overflow.firebaseapp.com",
    databaseURL: "https://project-snack-overflow-default-rtdb.firebaseio.com/",
    projectId: "project-snack-overflow",
    storageBucket: "project-snack-overflow.appspot.com",
    messagingSenderId: "689507442231",
    appId: "1:689507442231:web:01a87229e518f779f5e9b2",
    measurementId: "G-MVSPE072K6"
  };
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  const firestore = firebase.firestore();
let localStream;
const Create_meeting = () =>{
    const [mute, setmute] = useState("Mute");
    const [video, setvideo] = useState("Hide");
    const [disabled, setdisabled] = useState(true);
    const localvideo = React.createRef();
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/video', {state: {video: localStream.getTracks().find(track => track.kind === 'video').enabled, 
                                                audio: localStream.getTracks().find(track => track.kind === 'audio').enabled, 
                                                callId: firestore.collection('calls').doc().id, privilege: "offer"}})
    }
    const webcam = async () => {
        //get permissions for audio and video
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        // replace HTML with video feedback object
        localvideo.current.srcObject = localStream;
        setdisabled(false);
    }
    const togglemute = () => {
        if(localStream.getTracks().find(track => track.kind === 'audio').enabled){
          localStream.getTracks().find(track => track.kind === 'audio').enabled = false;
          setmute("Unmute")
        } else {
          localStream.getTracks().find(track => track.kind === 'audio').enabled = true;
          setmute("Mute")
        }
      }
    const togglevideo = () => {
        if(localStream.getTracks().find(track => track.kind === 'video').enabled){
            localStream.getTracks().find(track => track.kind === 'video').enabled = false;
            setvideo("Show")
        } else {
            localStream.getTracks().find(track => track.kind === 'video').enabled = true;
            setvideo("Hide");
        }
    }
    return(
        <div>
            <span>
                <h3>Local Stream</h3>
                <video ref={localvideo} autoPlay playsInline muted="muted"></video>
            </span>
            <button onClick={webcam} >Video and Audio permissions</button>
            <button onClick={handleClick} disabled={disabled}>Create Meeting</button>
            <button onClick={togglemute} disabled={disabled}>{mute}</button>
            <button onClick={togglevideo} disabled={disabled}>{video}</button>
        </div>
    )
}

export default Create_meeting;