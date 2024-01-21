import React from 'react'
import { Box } from '@mui/material';

const stateMap = require('../../us_and_canada.png');

function StateMap() {
    return (
        <Box className="map-container" sx={{ py: 7 , flex: '3 3 0' }}>
            <Box className="crop-container" >
                <img className="crop-image" src={stateMap}/>
            </Box>
        </Box>
    )
}

export default StateMap