import firebase from 'firebase/compat/app';
import React, { useState } from 'react';
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

const localvideo = React.createRef();
const remotevideo = React.createRef();
const callinput = React.createRef();
const callButton = React.createRef();
const answerButton = React.createRef();
const muteButton = React.createRef();
const videoButton = React.createRef();
let localStream;
let remoteStream;
class Video_connection extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      mutestate: "Mute",
      videostate: "Hide",
      disabled: true
    };
  }

  webcam_on = async () => {
    //get permissions for audio and video
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
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

    // replace HTML with video feedback object
    localvideo.current.srcObject = localStream;
    remotevideo.current.srcObject = remoteStream;
    this.setState({disabled: false})
  }
  connectmeeting = async () => {
    // Create a New ID for a call
    const callDoc = firestore.collection('calls').doc();
    // Create new collection
    const offerCandidates = callDoc.collection('offerCandidates');
    const answerCandidates = callDoc.collection('answerCandidates');
    //put the new ID on the text input for user to copy
    callinput.current.value = callDoc.id;

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
  answermeeting = async () => {
    // get the callID that the invitee shared and access the data
    const callId = callinput.current.value;
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
  togglemute = async () => {
    if(localStream.getTracks().find(track => track.kind === 'audio').enabled){
      localStream.getTracks().find(track => track.kind === 'audio').enabled = false;
      this.setState({mutestate: "Unmute"});
    } else {
      localStream.getTracks().find(track => track.kind === 'audio').enabled = true;
      this.setState({mutestate: "Mute"});
    }
  }
  togglevideo = async () => {
    if(localStream.getTracks().find(track => track.kind === 'video').enabled){
      localStream.getTracks().find(track => track.kind === 'video').enabled = false;
      this.setState({videostate: "Show"});
    } else {
      localStream.getTracks().find(track => track.kind === 'video').enabled = true;
      this.setState({videostate: "Hide"});
    }
  }
  render(){
    return(
      <div>
        <span>
          <h3>Remote Stream</h3>
          <video ref={remotevideo} autoPlay playsInline></video>
        </span>
        <span>
          <h3>Local Stream</h3>
          <video ref={localvideo} autoPlay playsInline muted="muted"></video>
        </span>
        <input ref={callinput}/>
        <button onClick={this.webcam_on}>Press</button>
        <button ref={answerButton} onClick={this.answermeeting} disabled={this.state.disabled}>Answer</button>
        <button ref={callButton} onClick={this.connectmeeting} disabled={this.state.disabled}>Create Call (offer)</button>
        <button ref={muteButton} onClick={this.togglemute} disabled={this.state.disabled}>{this.state.mutestate}</button>
        <button ref={videoButton} onClick={this.togglevideo} disabled={this.state.disabled}>{this.state.videostate}</button>
      </div>
    )
  }
}
  
  export default Video_connection;
  
  // Store, Fireship, director. WebRTC in 100 Seconds // Build a Video Chat App from Scratch. YouTube, 15 Mar. 2021, https://youtu.be/WmR9IMUD_CY?si=z1dGNkAm6VpOEPtd. Accessed 12 Nov. 2023. 
