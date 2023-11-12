import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Video_connection from './components/video_connection/video_connection';
import Transcript from './components/transcript_display/speech_to_text_display.mjs';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='' element={<Video_connection />} />
        </Routes>
      <div><Transcript /></div>
        <Routes>
          <Route path='/transcript' element={<speech_to_text_display />} />
        </Routes>
    </div>
  );
}

export default App;
