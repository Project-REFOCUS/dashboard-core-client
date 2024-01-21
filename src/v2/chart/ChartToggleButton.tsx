import React from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';

const buttonSX = {
    padding: '8px 8px',
    '&.Mui-selected': {
        backgroundColor: 'primary.main'
    },
    '&:hover': {
        backgroundColor: '#a6d0f7'
    },
};


interface Props {
    handleOnChange: (value : string) => void;
    selected : string;
}

function ChartToggleButton({handleOnChange, selected}: Props) {

    const toggleOnChange = (value : string) => {
        if(value !== null){
            handleOnChange(value);
        }      
    }

    return (
        <ToggleButtonGroup
            size="small"
            color="primary"
            value={selected}
            exclusive
            onChange={(e, value) => toggleOnChange(value)}
            aria-label="Chart Line or Bar Graph Toggle"
        >
            <ToggleButton value="chart" sx={buttonSX}>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <g clip-path="url(#clip0_3204_1695)">
                        <path d="M1.80713 11.0322C1.80713 11.7568 2.39475 12.3447 3.11963 12.3447H14.4946C14.7353 12.3447 14.9321 12.5416 14.9321 12.7822C14.9321 13.0229 14.7353 13.2197 14.4946 13.2197H3.11963C1.91158 13.2197 0.932129 12.2408 0.932129 11.0322V1.40723C0.932129 1.16551 1.12802 0.969727 1.36963 0.969727C1.61135 0.969727 1.80713 1.16551 1.80713 1.40723V11.0322ZM9.99111 8.27871C9.82158 8.45098 9.54268 8.45098 9.37315 8.27871L7.03252 5.9627L4.30361 8.71621C4.13408 8.88848 3.85518 8.88848 3.68564 8.71621C3.51447 8.54668 3.51447 8.26777 3.68564 8.09824L6.74814 5.03574C6.91768 4.86348 7.19658 4.86348 7.36611 5.03574L9.68213 7.35176L13.3106 3.72324C13.4802 3.55098 13.7591 3.55098 13.9286 3.72324C14.1009 3.89277 14.1009 4.17168 13.9286 4.34121L9.99111 8.27871Z" fill={selected == "chart" ? "white" : "black"}/>
                    </g>
                    <defs>
                        <clipPath id="clip0_3204_1695">
                            <rect width="14" height="14" fill="white" transform="translate(0.932129 0.0947266)"/>
                        </clipPath>
                    </defs>
                </svg>
            </ToggleButton>
            <ToggleButton  value="bar" sx={buttonSX}>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <g clip-path="url(#clip0_3204_1701)">
                        <path d="M1.36963 0.969727C1.61135 0.969727 1.80713 1.16551 1.80713 1.40723V11.0322C1.80713 11.7568 2.39475 12.3447 3.11963 12.3447H14.4946C14.7353 12.3447 14.9321 12.5416 14.9321 12.7822C14.9321 13.0229 14.7353 13.2197 14.4946 13.2197H3.11963C1.91158 13.2197 0.932129 12.2408 0.932129 11.0322V1.40723C0.932129 1.16551 1.12802 0.969727 1.36963 0.969727ZM4.86963 7.09473C5.11025 7.09473 5.30713 7.2916 5.30713 7.53223V10.1572C5.30713 10.3979 5.11025 10.5947 4.86963 10.5947C4.629 10.5947 4.43213 10.3979 4.43213 10.1572V7.53223C4.43213 7.2916 4.629 7.09473 4.86963 7.09473ZM7.93213 10.1572C7.93213 10.3979 7.73525 10.5947 7.49463 10.5947C7.254 10.5947 7.05713 10.3979 7.05713 10.1572V4.03223C7.05713 3.7916 7.254 3.59473 7.49463 3.59473C7.73525 3.59473 7.93213 3.7916 7.93213 4.03223V10.1572ZM10.1196 5.34473C10.3603 5.34473 10.5571 5.5416 10.5571 5.78223V10.1572C10.5571 10.3979 10.3603 10.5947 10.1196 10.5947C9.879 10.5947 9.68213 10.3979 9.68213 10.1572V5.78223C9.68213 5.5416 9.879 5.34473 10.1196 5.34473ZM13.1821 10.1572C13.1821 10.3979 12.9853 10.5947 12.7446 10.5947C12.504 10.5947 12.3071 10.3979 12.3071 10.1572V3.15723C12.3071 2.9166 12.504 2.71973 12.7446 2.71973C12.9853 2.71973 13.1821 2.9166 13.1821 3.15723V10.1572Z" fill={selected == "bar" ? "white" : "black"}/>
                    </g>
                    <defs>
                        <clipPath id="clip0_3204_1701">
                            <rect width="14" height="14" fill="white" transform="translate(0.932129 0.0947266)"/>
                        </clipPath>
                    </defs>
                </svg>
            </ToggleButton>
        </ToggleButtonGroup>
    )
}

export default ChartToggleButton