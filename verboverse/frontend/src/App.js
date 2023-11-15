import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Video_connection from './components/video_connection/video_connection.mjs';
import Transcript from './components/transcript_display/speech_to_text_display.mjs';
import Homepage from './components/home_age/home_page.mjs';
function App() {
  return (
    <div className="App">
        <Routes>
          <Route exact path='/' element={<Homepage />} />
          <Route path='/home' element={<Homepage />} />
          {/* <Route path='/meeting' element={<Meeting />} /> */}
          <Route path='/video' element={<Video_connection />} />
          <Route path='/transcript' element={<Transcript />} />
        </Routes>
    </div>
  );
}

export default App;
