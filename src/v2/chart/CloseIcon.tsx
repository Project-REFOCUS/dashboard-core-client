import React from 'react'
import { Box } from '@mui/material'

interface Props {
    handleOnClick: () => void;
}

function ExpandIcon({handleOnClick} : Props) {
    return (
        <Box className="svg-container">
            <svg className="svg-clickable" id="expand-icon" onClick={handleOnClick} xmlns="http://www.w3.org/2000/svg" width="20" height="32" viewBox="0 0 20 32" fill="none">
                <g clipPath="url(#clip0_2676_27750)">
                    <path d="M19.8562 25.1437C20.0516 25.339 20.0516 25.6555 19.8562 25.8506C19.6608 26.046 19.3446 26.046 19.1494 25.8506L9.99999 16.7062L0.856235 25.85C0.660797 26.0454 0.344609 26.0454 0.149359 25.85C-0.0459531 25.6547 -0.0459531 25.3382 0.149359 25.1431L9.29374 16L0.146484 6.85622C-0.0488281 6.66091 -0.0488281 6.34447 0.146484 6.14934C0.341797 5.95422 0.658235 5.95403 0.85336 6.14934L9.99999 15.2937L19.1437 6.14997C19.3391 5.95466 19.6555 5.95466 19.8506 6.14997C20.0457 6.34528 20.0459 6.66172 19.8506 6.85684L10.7062 16L19.8562 25.1437Z" fill="black"/>
                </g>
                <defs>
                    <clipPath id="clip0_2676_27750">
                        <rect width="20" height="32" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
        </Box>

    )
}

export default ExpandIcon