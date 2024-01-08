import React from 'react';
import { useState } from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';

import '../styles/header/header.scss';
import refocusLogo from '../../Project_Refocus_Logo.png';

const userName = 'Diana Prince';

const Header = () => {

    const [currentTarget, setCurrentTarget] = useState(null);

    handleAccountMenuToggle = (event) => {
        
        if(currentTarget == event.setCurrentTarget)
            handleAccountMenuClose()
        else
            setCurrentTarget(event.setCurrentTarget);
    }

    handleAccountMenuClose = () => {
        setCurrentTarget(null);
    }

    return (
        <Box>
        {/* <Box sx={{ display: 'flex' }}></Box> */}
            <AppBar
                position="static"
                component="nav"
                color="inherit"
                elevation={0}
                sx={{ borderBottom: 1, borderColor: '#DFE6E9' }}
            >
                <Toolbar sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} variant="dense">
                    <Typography sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, gap: '8px', fontSize: '14px', fontWeight: 900 }} variant="h6" component="div">
                        <img src={refocusLogo} alt="Project Refocus Logo" />
                        CRISIS MONITORING SYSTEM
                    </Typography>
                    {/* <Typography sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, fontSize: '12px', justifyContent: 'flex-end', fontWeight: 900 }} variant="h6" component="div">
                        {userName.toUpperCase()}
                        <IconButton onClick={handleAccountMenuToggle}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="25" viewBox="0 0 18 25" fill="none">
                            <path d="M8.95784 17C8.90627 17 8.77179 16.9656 8.69857 16.896L1.6158 10.1469C1.46641 10.0041 1.46055 9.76602 1.60409 9.61673C1.74912 9.46729 1.9864 9.46293 2.13424 9.60501L9.00143 16.1066L15.8686 9.60501C16.0195 9.46293 16.2568 9.46729 16.3988 9.61673C16.5423 9.76616 16.5364 10.0042 16.3871 10.1469L9.30424 16.8969C9.14534 16.9672 9.05159 17 8.95784 17Z" fill="#2D3436"/>
                        </svg>
                        </IconButton>
                    </Typography> */}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
