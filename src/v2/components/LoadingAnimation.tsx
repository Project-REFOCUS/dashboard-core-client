import React, { useEffect, useRef, useState } from 'react';
import {  Box, CircularProgress } from '@mui/material';

const aspectRatio = 0.57;

const boxSx = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    backgroundFilter: 'blur(3px)',
    zIndex: 49,
}

const LoadingAnimation = () => {

    const boxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(boxRef.current !== null){
            boxRef.current.style.height = `${boxRef.current.clientWidth * 0.57 }px`;
        }
    }, []);

    return (
        <Box ref={boxRef} sx={boxSx}>
            <CircularProgress sx={{zIndex:99}}/>
        </Box>
    );
};

export default LoadingAnimation;