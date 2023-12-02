import React, { useState } from 'react';
import { Avatar, Drawer, Sheet, DialogTitle, ModalClose, Divider, DialogContent, Typography} from '@mui/joy';
import LanguageDropdown from '../language_dropdown/language_dropdown.mjs';

const AccountProfile = () => {
    const [openProfile, setOpenProfile] = useState(false);

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
                            Username:
                        </Typography>
                        <Typography align="left" level="title-md" fontWeight="bold" sx={{ mt: 1, mr: 1 }}>
                            Email:
                        </Typography>
                        <LanguageDropdown />
                    </DialogContent>
                </Sheet>
            </Drawer>
        </div>
    );
}

export default AccountProfile;