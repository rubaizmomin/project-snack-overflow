import { useNavigate } from "react-router-dom"; 
import React from 'react';

const Homepage = () => {
    const navigate = useNavigate();
    return(
    <div>
        <button onClick={()=>navigate('/create')}>Create a Meeting</button>
        <button onClick={()=>navigate('/join')}>Join a Meeting</button>

    </div>
    );
}

export default Homepage;