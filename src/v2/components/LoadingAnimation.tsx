import React, { useEffect, useRef, useState } from 'react';
import {  Alert, Box, CircularProgress } from '@mui/material';

const aspectRatio = 0.57;

const boxSx = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    backgroundFilter: 'blur(3px)',
    zIndex: 49,
}

interface Props {
    loading: boolean
    error: boolean
}

const LoadingAnimation = ({loading, error}: Props) => {

    const boxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(boxRef.current !== null){
            boxRef.current.style.height = `${boxRef.current.clientWidth * 0.57 }px`;
        }
    }, []);

    return (
        <Box ref={boxRef} sx={boxSx}>
            { loading && <CircularProgress sx={{zIndex:99}}/> }
            { error && <Alert sx={{margin: "auto"}} severity="warning">Something went wrong. Please try again.</Alert> }
        </Box>
    );
};

export default LoadingAnimation;