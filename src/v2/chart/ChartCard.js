import React from 'react'
import { useState } from 'react';
import { 
    Autocomplete,
    Box,
    Card,
    FormControl,
    List,
    Stack,
    TextField,
    Typography
} from '@mui/material'
import ChartToggleButton from './ChartToggleButton'
import VisibilityIcon from './VisibilityIcon';
import ExpandIcon from './ExpandIcon';
import GraphPlaceholder from './Graph.png';

import '../styles/chart/chartCard.scss';
import ListLabelDot from '../components/ListLabelDot';

// export enum ChartCardType{
//     STATE,
//     COUNTY,
//     SUBONE,
//     SUBTWO
// }

// locationBreadcrumbs = [[],[],[]] an array of arrays

// Primary (Title lines up with the options, Title Visible when card invisible)
// Primary V2 (Title lines up with the options, Title Visible)
// Secondary (Title is above the options, Lines up when Invisble
// Extended ( like adds onto a Secondary, has a trash can icon to remove)

const dateRanges = [
    { dateX: {month: 'January', year: '2023'}, dateY: {month: 'December', year: '2023'}},
    { dateX: {month: 'January', year: '2022'}, dateY: {month: 'December', year: '2022'}},
    { dateX: {month: 'January', year: '2021'}, dateY: {month: 'December', year: '2021'}},
    { dateX: {month: 'January', year: '2020'}, dateY: {month: 'December', year: '2020'}},
]

function ChartCard({handleExpandOnClick, handleCloseExpandOnClick, titleBreadcrumbs, secondary=false}) {

    const [ chartOption, setChartOption ] = useState("chart");
    const [ selectedDateRange, setSelectedDateRange] = useState(dateRanges[0]);
    const [ isVisible, setIsVisible ] = useState(true);
    const [ isExpanded, setIsExpanded ] = useState(false);

    const handleChartToggle = (event, value) => {
        console.log("Chart Toggle value: " + value);
        setChartOption(value);
    }

    const handleVisibilityToggle = () => {
        console.log("OnClick value: "+ !isVisible);
        setIsVisible(!isVisible);
    }

    const handleDateChange = (event, dateRange, reason) => {
        console.log("Change Date reason: "+ reason +" states: " + JSON.stringify(dateRange));
        
        setSelectedDateRange(dateRange);
    }

    const openPopUp = () => {
        setIsExpanded(true);
    }

    const closePopUp = () => {
        setIsExpanded(false);
    }

    const titleElements = titleBreadcrumbs.map( (titleArray, index) => {
        const title = titleArray.join(', ');
        return <Typography id="chart-section-header">{title}</Typography>;
    });

    return (
        <Box id="chart-sidebar-panel" className="flex-right-ratio">
            <Card className="inner-card" elevation={0}>
                <Box id="chart-section-container">
                    <Stack spacing={1}>
                        <Stack direction="row" spacing={1}>
                            <Stack id="chart-header-container" 
                                className="flex-left-ratio" 
                                direction="row" 
                                divider={<Typography id="chart-section-header">|</Typography>}
                                spacing={0.5}
                            >
                                { secondary || !isVisible ? titleElements : null}
                            </Stack>
                            <Stack id="chart-options" className="flex-right-ratio" direction="row" sx={{ justifyContent: 'space-between' }}>
                                <Box className="flex-left-ratio">
                                    <ChartToggleButton handleOnChange={handleChartToggle} selected={chartOption}/>
                                </Box>
                                <Stack direction="row" className="flex-right-ratio" id="chart-option-right">
                                    <Box className="fill-container" id="date-range-container">
                                        <FormControl id="date-selector" variant="standard">
                                            <Autocomplete
                                                options={dateRanges}
                                                getOptionLabel={(dateRange) =>
                                                     `${dateRange.dateX.month} ${dateRange.dateX.year} - ${dateRange.dateY.month} ${dateRange.dateY.year}`}
                                                key={(dateRange, index) => index }
                                                value={selectedDateRange}
                                                onChange={handleDateChange}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        variant="outlined"
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                    </Box>
                                    {/* To do: there are hover over descriptions for the buttons */}
                                    <VisibilityIcon handleOnClick={handleVisibilityToggle} isVisible={isVisible}/>
                                    <ExpandIcon handleOnClick={handleExpandOnClick}/>
                                </Stack>
                            </Stack>
                        </Stack>
                        { isVisible ? 
                            <Stack direction="row">
                                <Box className="flex-left-ratio">
                                    {/* Where do the colors come from? */}
                                    <ListLabelDot title="New York" color="#6C60FF"/>
                                    <ListLabelDot title="Florida" color="#DA5FB0"/>
                                </Box>
                                <Box id="chart-iframe" className="flex-right-ratio">
                                    <Box className="crop-container" sx={{ overflow: 'hidden'}}>
                                        <img className="crop-image" src={GraphPlaceholder}/>
                                    </Box>
                                </Box>
                            </Stack>
                            : null
                        }
                    </Stack>
                </Box>
            </Card>
        </Box>
    )
}

export default ChartCard