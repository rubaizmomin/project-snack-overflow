import React, { useState, useEffect } from 'react';
import { Avatar, Drawer, Sheet, DialogTitle, ModalClose, Divider, DialogContent, Typography } from '@mui/joy';
import { me, updateLanguage } from '../../services/userApiService.js';
import LanguageDropdown from '../language_dropdown/language_dropdown.mjs';
import '../language_dropdown/language_dropdown.css';
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';

const AccountProfile = () => {
    const [openProfile, setOpenProfile] = useState(false);
    const [user, setUser] = useState(null);
    const [cookies, setCookie] = useCookies(['token']);
    const [username, setusername] = useState('Local Stream');
    const [email, setemail] = useState('Local Stream email');
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUser = async () => {
            let retryCount = 0;
            const maxRetries = 3; 

            while (retryCount < maxRetries) {
                try {
                    const response = await me(cookies.token);

                    if (response.success) {
                        setUser(response.user);
                        setusername(response.user.name);
                        setemail(response.user.email);
                        break;
                    }
                    else{
                        navigate('/');
                        return;
                    }
                } catch (error) {
                    console.error('Error fetching user:', error);
                }

                await new Promise(resolve => setTimeout(resolve, 3000));
                retryCount++;
            }
        };
        fetchUser();
    }, []);

    const getNewLanguage = (language, lang_id) => {
        const id = user._id;
        updateLanguage(cookies.token, id, language+':'+lang_id);
    }

    return(
        <div>
            <Avatar onClick={() => setOpenProfile(true)}/>
            <Drawer
                size="md"
                variant="plain"
                open={openProfile}
                onClose={() => setOpenProfile(false)}
                slotProps={{
                content: {
                    sx: {
                    bgcolor: 'transparent',
                    p: { md: 3, sm: 0 },
                    boxShadow: 'none',
                    },
                },
                }}
            >
                <Sheet
                    sx={{
                        borderRadius: 'md',
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        height: '100%',
                        overflow: 'auto',
                    }}
                >
                    <DialogTitle>Account Profile</DialogTitle>
                    <ModalClose />
                    <Divider sx={{ mt: 'auto' }} />
                    <DialogContent sx={{ gap: 2 }}>
                        <Typography align="left" level="title-md" fontWeight="bold" sx={{ mt: 1, mr: 1 }}>
                            Username: {username}
                        </Typography>
                        <Typography align="left" level="title-md" fontWeight="bold" sx={{ mt: 1, mr: 1 }}>
                            Email: {email}
                        </Typography>
                        <LanguageDropdown onLanguageChange={getNewLanguage} />
                    </DialogContent>
                </Sheet>
            </Drawer>
        </div>
    );
}

export default AccountProfile;