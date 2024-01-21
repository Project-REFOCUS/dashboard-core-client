import React from 'react';
import { useState } from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';

import '../styles/header/header.scss';
import { observer } from 'mobx-react';
import appStore from '../stores/appStore';


const refocusLogo = require("../../Project_Refocus_Logo.png");

const headerSX = {
    zIndex: 999
};

const Header: React.FC = observer(() => {

    return (
        <Box sx={appStore.isExpanded ? headerSX : {}}>
            <AppBar
                position={appStore.isExpanded ? "fixed" :"static"}
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
                </Toolbar>
            </AppBar>
        </Box>
    );
});

export default Header;
