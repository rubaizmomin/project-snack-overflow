import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/signup.js';
import SignIn from './pages/signin.js';
import Video_connection from './components/video_connection/video_connection.mjs';
import Transcript from './components/transcript_display/speech_to_text_display.mjs';
import Homepage from './components/home_page/home_page.mjs';
import Create_meeting from './components/video_connection/create_meeting.mjs';
import Join_meeting from './components/video_connection/join_meeting.mjs';
function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route exact path='/' element={<Homepage />} />
          <Route path='/home' element={<Homepage />} />
          <Route path='/create/' element={<Create_meeting />} />
          <Route path='/join/*' element={<Join_meeting />} />
          <Route path='/video' element={<Transcript />} />
        </Routes>
    </div>
  );
}

export default App;
