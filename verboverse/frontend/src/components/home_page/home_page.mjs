import { useNavigate } from "react-router-dom"; 
import React from 'react';
import Avatar from '@mui/joy/Avatar';
import Particles from 'react-tsparticles';

import './home_page.css';

const Homepage = () => {
    const navigate = useNavigate();

    return(
    <div className="content">
        <Avatar />
        <a href="./" className="title">VerboVerse</a>
        <div className="button_display">
            <button className="btn" onClick={()=>navigate('/create')}>New Meeting</button>
            <button className="btn" onClick={()=>navigate('/join')}>Join Meeting</button>
        </div>

    </div>
    );
}

export default Homepage;