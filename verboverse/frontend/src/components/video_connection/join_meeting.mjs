import React, { useState } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
let localStream;
const callinput = React.createRef();
const Join_meeting = () =>{
    const [mute, setmute] = useState("Mute");
    const [video, setvideo] = useState("Hide");
    const [disabled, setdisabled] = useState(true);
    const localvideo = React.createRef();
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/video', {state: {video: localStream.getTracks().find(track => track.kind === 'video').enabled, 
                                    audio: localStream.getTracks().find(track => track.kind === 'audio').enabled, 
                                    callId: callinput.current.value, privilege: "answer"}});
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
            <input ref={callinput}/>
            <button onClick={handleClick} disabled={disabled}>Join Meeting</button>
            <button onClick={togglemute} disabled={disabled}>{mute}</button>
            <button onClick={togglevideo} disabled={disabled}>{video}</button>
        </div>
    )
}

export default Join_meeting;