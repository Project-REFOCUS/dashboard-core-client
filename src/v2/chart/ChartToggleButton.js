import React from 'react'
import { ToggleButtonGroup, ToggleButton } from '@mui/material'

function ChartToggleButton({handleOnChange, selected}) {
    return (
        <ToggleButtonGroup
            size="small"
            color="primary"
            value={selected}
            exclusive
            onChange={handleOnChange}
            aria-label="Chart or Bar Graph Toggle"
        >
            <ToggleButton  value="chart">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M2 25C2 26.6562 3.34312 28 5 28H31C31.55 28 32 28.45 32 29C32 29.55 31.55 30 31 30H5C2.23875 30 0 27.7625 0 25V3C0 2.4475 0.44775 2 1 2C1.5525 2 2 2.4475 2 3V25ZM20.7062 18.7062C20.3187 19.1 19.6813 19.1 19.2938 18.7062L13.9438 13.4125L7.70625 19.7062C7.31875 20.1 6.68125 20.1 6.29375 19.7062C5.9025 19.3187 5.9025 18.6813 6.29375 18.2938L13.2937 11.2937C13.6812 10.9 14.3188 10.9 14.7063 11.2937L20 16.5875L28.2938 8.29375C28.6813 7.9 29.3187 7.9 29.7062 8.29375C30.1 8.68125 30.1 9.31875 29.7062 9.70625L20.7062 18.7062Z" fill="black"/>
                </svg>
            </ToggleButton>
            <ToggleButton  value="bar">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M1 2C1.5525 2 2 2.4475 2 3V25C2 26.6562 3.34312 28 5 28H31C31.55 28 32 28.45 32 29C32 29.55 31.55 30 31 30H5C2.23875 30 0 27.7625 0 25V3C0 2.4475 0.44775 2 1 2ZM9 16C9.55 16 10 16.45 10 17V23C10 23.55 9.55 24 9 24C8.45 24 8 23.55 8 23V17C8 16.45 8.45 16 9 16ZM16 23C16 23.55 15.55 24 15 24C14.45 24 14 23.55 14 23V9C14 8.45 14.45 8 15 8C15.55 8 16 8.45 16 9V23ZM21 12C21.55 12 22 12.45 22 13V23C22 23.55 21.55 24 21 24C20.45 24 20 23.55 20 23V13C20 12.45 20.45 12 21 12ZM28 23C28 23.55 27.55 24 27 24C26.45 24 26 23.55 26 23V7C26 6.45 26.45 6 27 6C27.55 6 28 6.45 28 7V23Z" fill="black"/>
                </svg>
            </ToggleButton>
        </ToggleButtonGroup>
    )
}

export default ChartToggleButton