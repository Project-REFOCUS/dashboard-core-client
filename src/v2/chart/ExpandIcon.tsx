import React from 'react'
import { Box } from '@mui/material'

interface Props {
    handleOnClick: () => void;
}

function ExpandIcon({handleOnClick} : Props) {
    return (
        <Box className="svg-container">
            <svg className="svg-clickable" id="expand-icon" onClick={handleOnClick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <g clip-path="url(#clip0_2961_3213)">
                    <path d="M9.85781 13.6125L0.75 22.7203V16.1297C0.75 15.9226 0.582234 15.7549 0.375234 15.7549C0.167766 15.7547 0 15.9187 0 16.125V23.5828C0 23.8313 0.167578 24 0.374812 24H7.83281C8.04084 24 8.20594 23.8317 8.20594 23.6253C8.20594 23.4182 8.03817 23.2505 7.83112 23.2505H1.27969L10.3875 14.1427C10.7344 13.7953 10.2047 13.2234 9.85781 13.6125ZM23.625 0H16.125C15.917 0 15.7519 0.168187 15.7519 0.374719C15.7519 0.581813 15.9196 0.749531 16.1267 0.749531H22.7173L13.6095 9.85734C13.2596 10.2071 13.7883 10.7386 14.1397 10.3875L23.2475 1.27969V7.87031C23.2475 8.07741 23.4152 8.24512 23.6222 8.24512C23.8313 8.24531 24 8.08125 24 7.83281V0.374719C24 0.167719 23.8312 0 23.625 0Z" fill="black"/>
                </g>
                <defs>
                    <clipPath id="clip0_2961_3213">
                        <rect width="24" height="24" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
        </Box>

    )
}

export default ExpandIcon