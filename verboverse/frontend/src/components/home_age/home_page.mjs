import { Link } from "react-router-dom"; 
import React from 'react';

function Homepage() {
    return(
    <div>
        <Link to="/video">Start Meeting</Link>
    </div>
    );
}

export default Homepage;