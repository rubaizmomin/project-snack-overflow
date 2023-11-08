import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Video_connection from './components/video_connection/video_connection';

function App() {
  return (
    <div className="App">
      <div><Video_connection /></div>
        <Routes>
          <Route path='/video' element={<video_connection />} />
        </Routes>
    </div>
  );
}

export default App;
