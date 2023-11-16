import { useNavigate } from "react-router-dom"; 
import React from 'react';

const Homepage = () => {
    const navigate = useNavigate();
    return(
    <div>
        <button onClick={()=>navigate('/create')}>Go To Create</button>
        <button onClick={()=>navigate('/join')}>Go To Join</button>

    </div>
    );
}

export default Homepage;