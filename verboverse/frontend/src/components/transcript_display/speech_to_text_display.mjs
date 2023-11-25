import React, { useState, useEffect } from 'react';
import Video_connection from '../video_connection/video_connection.mjs';

var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

var recognizing = false;
var finalTranscript = '';
var ignore_onend;
var start_timestamp;
var languageChosen = 'en-CA';

function Transcript() {
  const [info, setInfo] = useState('Off');
  const [interimSpan, setInterimSpan] = useState('');
  const [finalSpan, setFinalSpan] = useState('');

  useEffect(() => {
    recognition.onstart = function() {
      recognizing = true;
    };
    
    recognition.onerror = function(event) {
      if (event.error === 'no-speech') {
        setInfo('Error: No speech');
        ignore_onend = true;
      }
      if (event.error === 'audio-capture') {
        setInfo('Error: No microphone');
        ignore_onend = true;
      }
      if (event.error === 'not-allowed') {
        if (event.timeStamp - start_timestamp < 100) {
          setInfo('Error: Blocked');
        } else {
          setInfo('Error: Denied');
        }
        ignore_onend = true;
      }
    };
    
    recognition.onend = function() {
      recognizing = false;
      if (ignore_onend) {
        return;
      }
      setInfo('Off');
    };
    
    recognition.onresult = function(event) {
      var interimTranscript = '';
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      finalTranscript = capitalize(finalTranscript);
      setFinalSpan(linebreak(finalTranscript));
      setInterimSpan(linebreak(interimTranscript));
    };
  });

  const showTranscript = async (event) => {
    if (recognizing) {
      recognition.stop();
      return;
    }
    finalTranscript = '';
    recognition.lang = languageChosen;
    recognition.start();
    ignore_onend = false;
    setFinalSpan('');
    setInterimSpan('');
    setInfo('On');
    start_timestamp = event.timeStamp;
  };
  return(
    <div id="results">
      <Video_connection transcription_text={interimSpan}/>
      <p>Transcript 
        <span id="info"> ({info}):<br /></span>
        <span id="finalSpan" style={{color:'black'}}>{finalSpan}</span>
        <span id="interimSpan" style={{color:'blue'}}>{interimSpan}</span>
      </p>
      <button id="transcriptButton" onClick={showTranscript}>Show/Hide Transcript</button>
    </div>
  );
}

var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

var first_char = /\S/;
function capitalize(s) {
  return s.replace(first_char, function(m) { return m.toUpperCase(); });
}

export default Transcript;
