import React from 'react'
import { Box } from '@mui/material';

function StateMap() {
    return (
        <Box className="map-container" sx={{ py: 7 , flex: '3 3 0' }}>
            <Box className="crop-container" sx={{ overflow: 'hidden'}}>
                <img className="crop-image" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} src="https://upload.wikimedia.org/wikipedia/commons/5/52/US_map_-_states.png"/>
            </Box>
        </Box>
    )
}

export default StateMap