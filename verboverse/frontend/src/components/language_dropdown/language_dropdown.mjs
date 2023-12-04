import React, { useState, useRef, useEffect } from 'react';
import { Popper, ClickAwayListener } from '@mui/base';
import { Typography, Button, MenuItem, MenuList } from '@mui/material';
import { styled } from '@mui/joy';
import { me } from '../../services/userApiService.js';
import { langs } from './languages.mjs';
import './language_dropdown.css';
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';

const Popup = styled(Popper)({
    zIndex: 1000,
});

const LanguageDropdown = ({ onLanguageChange }) => {
    const buttonRef = useRef(null);
    const [openDropdown, setOpenDropdown] = useState(false);
    const [cookies, setCookie] = useCookies(['token']);
    const navigate = useNavigate();
    const [language, setLanguage] = useState('English');

    useEffect(() => {
        const fetchUser = async () => {
            let retryCount = 0;
            const maxRetries = 3; 

            while (retryCount < maxRetries) {
                try {
                    const response = await me(cookies.token);

                    if (response.success) {
                        setLanguage(response.user.language.split(':')[0]);
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

    const handleCloseDropdown = () => {
        setOpenDropdown(false);
      };
    
    const handleListKeyDown = (event) => {
        if (event.key === 'Tab') {
        setOpenDropdown(false);
        } else if (event.key === 'Escape') {
        buttonRef.current.focus();
        setOpenDropdown(false);
        }
    };

    const handleLanguageChange = (language, lang_id) => {
        handleCloseDropdown(); 
        setLanguage(language);
        onLanguageChange(language, lang_id);
    }

    return(
      <div id="language_select">
        <Typography color="black" align="left" level="title-md" fontWeight="bold" sx={{ mt: 1, mr: 1 }}>
            Primary Language:
        </Typography>
          <Button
              ref={buttonRef}
              id="composition-button"
              aria-controls={'composition-menu'}
              aria-haspopup="true"
              aria-expanded={openDropdown ? 'true' : undefined}
              color="secondary"
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                  setOpenDropdown(!openDropdown);
              }}
          >
              {language}
          </Button>
          <Popup
              role={undefined}
              id="composition-menu"
              open={openDropdown}
              anchorEl={buttonRef.current}
              disablePortal
              modifiers={[
              {
                  name: 'offset',
                  options: {
                  offset: [0, 4],
                  },
              },
              ]}
          >
              <ClickAwayListener
              onClickAway={(event) => {
                  if (event.target !== buttonRef.current) {
                  handleCloseDropdown();
                  }
              }}
              >
              <MenuList
                  onKeyDown={handleListKeyDown}
                  sx={{ boxShadow: 'md' }}
              >
                  {langs.map(([lang, [lang_id]]) => (
                      <MenuItem key={lang_id} onClick={ () => { handleLanguageChange(lang, lang_id) }}>{lang}</MenuItem>
                  ))}
              </MenuList>
              </ClickAwayListener>
          </Popup>
      </div>
    );
}

export default LanguageDropdown;