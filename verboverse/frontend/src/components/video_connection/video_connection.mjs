import firebase from 'firebase/compat/app';
import React, { useState } from 'react';
import 'firebase/compat/firestore';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Transcript from '../transcript_display/speech_to_text_display.mjs';
import './meeting.css';

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

const servers = {
    iceServers: [
      {
        urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
      },
    ],
    iceCandidatePoolSize: 10,
  };

const pc = new RTCPeerConnection(servers);

const localvideo = React.createRef();
const remotevideo = React.createRef();
let localStream;
let remoteStream;
function Video_connection(){
  const [mute, setmute] = useState("Mute");
  const [video, setvideo] = useState("Hide");
  const [disabled, setdisabled] = useState(true);
  const data = useLocation();
  // replace HTML with video feedback object
  useEffect(() => {
    const webcam_on = async () => {
      localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStream.getTracks().find(track => track.kind === 'audio').enabled = data.state.audio;
      localStream.getTracks().find(track => track.kind === 'video').enabled = data.state.video;
      if(data.state.audio === true)
        setmute("Mute");
      else{
        setmute("Unmute");
      }
      if(data.state.video === true)
        setvideo("Hide");
      else{
        setvideo("Show");
      }
      remoteStream = new MediaStream();
      // Push tracks from local stream to peer connection
      localStream.getTracks().forEach((track) => {
          pc.addTrack(track, localStream);
      });
    
      // Pull tracks from remote stream, add to video stream
      pc.ontrack = event => {
          event.streams[0].getTracks().forEach(track => {
              remoteStream.addTrack(track);
          });
      };
      localvideo.current.srcObject = localStream;
      remotevideo.current.srcObject = remoteStream;
      setdisabled(false);
    }
    const connectmeeting = async () => {
      // Create a New ID for a call
      if(data.state.privilege !== "offer")
        return;
      const callDoc = firestore.collection('calls').doc(data.state.callId);
      // Create new collection
      const offerCandidates = callDoc.collection('offerCandidates');
      const answerCandidates = callDoc.collection('answerCandidates');
  
      // get ICE candidates for the invitee and save it to firestore database under offerCandidates collection
      pc.onicecandidate = event => {
        event.candidate && offerCandidates.add(event.candidate.toJSON());
      };
      // Creates SDP offer to start connection with remote users
      const offerDescription = await pc.createOffer();
      await pc.setLocalDescription(offerDescription);
    
      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };
  
      //add the SDP and the type of connection to the callID
      await callDoc.set({ offer });
    
      // listener for new candidatess added by remote user
      callDoc.onSnapshot((snapshot) => {
        const data = snapshot.data();
        // check remote connection and if data was received
        if (!pc.currentRemoteDescription && data?.answer) {
          // set the answer SDP
          const answerDescription = new RTCSessionDescription(data.answer);
          pc.setRemoteDescription(answerDescription);
        }
      });  
      // Listen for remote ICE candidates
      answerCandidates.onSnapshot(snapshot => {
        snapshot.docChanges().forEach((change) => {
          // check if new candidate was added and not modified.
          if (change.type === 'added') {
            const candidate = new RTCIceCandidate(change.doc.data());
            // add the new remote candidate to remote description
            pc.addIceCandidate(candidate);
          }
        });
      });
    }
    const answermeeting = async () => {
      // get the callID that the invitee shared and access the data
      if(data.state.privilege !== "answer")
        return;
      const callId = data.state.callId;
      const callDoc = firestore.collection('calls').doc(callId);
      const offerCandidates = callDoc.collection('offerCandidates');
      const answerCandidates = callDoc.collection('answerCandidates');
    
      // get ICE candidates for the invitee and save it to firestore database under answerCandidates collection
      pc.onicecandidate = event => {
        event.candidate && answerCandidates.add(event.candidate.toJSON());
      };
    
      // get the invitee's sdp
      const callData = (await callDoc.get()).data();
      // set the invitee's sdp as remoteDescription
      if(callData === undefined){
        return;
      }
      const offerDescription = callData.offer;
      await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));
    
      //create sdp for answerer and store in its localDescription
      const answerDescription = await pc.createAnswer();
      await pc.setLocalDescription(answerDescription);
    
      // store the sdp under callID's answer field
      const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
      };
    
      await callDoc.update({ answer });
    
      // Listen to offer candidates for changes in ICEcandidates
      offerCandidates.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            let data = change.doc.data();
            pc.addIceCandidate(new RTCIceCandidate(data));
          }
        });
      });
    }
    webcam_on().then(()=>{
      connectmeeting().then(() => {
        answermeeting();
      })
    })
  }, []); // Empty dependency array means this effect will run only once, on component mount
  const togglemute = async () => {
    if(localStream.getTracks().find(track => track.kind === 'audio').enabled){
      localStream.getTracks().find(track => track.kind === 'audio').enabled = false;
      setmute("Unmute")
    } else {
      localStream.getTracks().find(track => track.kind === 'audio').enabled = true;
      setmute("Mute")
    }
  }
  const togglevideo = async () => {
    if(localStream.getTracks().find(track => track.kind === 'video').enabled){
      localStream.getTracks().find(track => track.kind === 'video').enabled = false;
      setvideo("Show")
    } else {
      localStream.getTracks().find(track => track.kind === 'video').enabled = true;
      setvideo("Hide");
    }
  }
  return(
    <div className='videos_display'>
      <h3 className='meeting_title'>Meeting</h3>
      <p>Meeting ID: {data.state.callId}</p>
      <div className='video_container'>
        <video className='remote_video' ref={remotevideo} autoPlay playsInline></video>
        <p className='overlay_text'>Remote Stream</p>
        
      </div>
      <div className='video_button_display'>
        <div className='video_container'>
          <video className='local_video' ref={localvideo} autoPlay playsInline muted="muted"></video>
          <p className='overlay_text'>Local Stream</p>
        </div>
        <div className='video_button_display'>
          <button onClick={togglemute} disabled={disabled}>{mute}</button>
          <button onClick={togglevideo} disabled={disabled}>{video}</button>
          <Transcript />
        </div>
      </div>
    </div>
  )
}
export default Video_connection;


  
  // Store, Fireship, director. WebRTC in 100 Seconds // Build a Video Chat App from Scratch. YouTube, 15 Mar. 2021, https://youtu.be/WmR9IMUD_CY?si=z1dGNkAm6VpOEPtd. Accessed 12 Nov. 2023. 
