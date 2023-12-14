import React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';

import '../styles/header/header.scss';
const Header = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="static"
                component="nav"
                color="inherit"
                elevation={0}
                sx={{ borderBottom: 1, borderColor: '#DFE6E9' }}
            >
                <Toolbar variant="dense">
                    <Typography sx={{ fontWeight: 900 }} variant="h6" component="div">CRISIS MONITORING SYSTEM</Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
