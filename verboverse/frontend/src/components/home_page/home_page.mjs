import { useNavigate } from "react-router-dom";
import React, { useState, useRef } from 'react';
import AccountProfile from "../account_profile/account_profile.mjs";
import { useCookies } from "react-cookie";
import { signup, login, logout, me } from '../../services/userApiService.js';
import { useEffect } from "react";
import './home_page.css';

const Homepage = () => {
    const [cookies, setCookie] = useCookies(['token']);
    const navigate = useNavigate();
    return (
        <div>
            <AccountProfile />
            <div className="verboverse"></div>
            <div className="button_display">
                <button className="btn btn_blue large_btn" onClick={() => navigate('/create')}>New Meeting</button>
                <button className="btn btn_pink large_btn" onClick={() => navigate('/join')}>Join Meeting</button>
            </div>
        </div>
    );
}

export default Homepage;