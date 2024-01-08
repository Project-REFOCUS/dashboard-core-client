import React from 'react'
import { useState } from 'react';
import { 
    Autocomplete,
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    FormControl,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    TextField 
} from '@mui/material'
import ChartToggleButton from './ChartToggleButton'
import VisibilityIcon from './VisibilityIcon';
import ExpandIcon from './ExpandIcon';
import GraphPlaceholder from './Graph.png';

import '../styles/chart/chartCard.scss';
import ListLabelDot from '../components/ListLabelDot';


//state card or {county or city or zipcode or block group or census tract} these can be grouped

//county, 

const dateRanges = [
    { dateX: {month: 'January', year: '2023'}, dateY: {month: 'December', year: '2023'}},
    { dateX: {month: 'January', year: '2022'}, dateY: {month: 'December', year: '2022'}},
    { dateX: {month: 'January', year: '2021'}, dateY: {month: 'December', year: '2021'}},
    { dateX: {month: 'January', year: '2020'}, dateY: {month: 'December', year: '2020'}},
]

function ChartCard({handleExpandOnClick, handleCloseExpandOnClick, location}) {

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

    return (
        <Box className='chart-sidebar-panel' sx={{ flex: '2.8 2.8 0' }}>
            <Card className='inner-card'>
                <CardContent>
                    <Stack direction="row">
                        <Stack id="left-chart-panel" sx={{ flex: '1 1 0' }}>
                            <CardHeader>
                                {/* Card Titles */}
                                {/* append the higher level locations */}
                            </CardHeader>
                            <Box>
                                {/* Selected Location Labels List*/}
                                {/* Where do the colors come from? */}
                                <List>
                                    <ListLabelDot title="New York" color="#6C60FF"/>
                                    <ListLabelDot title="Florida" color="#DA5FB0"/>
                                </List>
                            </Box>
                        </Stack>
                        <Box id="right-chart-panel" sx={{ flex: '2.8 2.8 0' }}>
                            <CardActions id="chart-options" direction="row" sx={{ justifyContent: 'space-between' }} fullWidth>
                                <Box sx={{ display: 'flex', flex: '1 1 0' }}>
                                    <ChartToggleButton handleOnChange={handleChartToggle} selected={chartOption}/>
                                </Box>
                                <Stack direction="row"  sx={{ flex: '2.8 2.8 0' }} id="chart-option-right">
                                    <Box className="fill-container" id="date-range-container">
                                        <FormControl id="date-selector" variant="standard">
                                            <Autocomplete
                                                options={dateRanges}
                                                getOptionLabel={(dateRange) => `${dateRange.dateX.month} ${dateRange.dateX.year} - ${dateRange.dateY.month} ${dateRange.dateY.year}`}
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
                            </CardActions>
                            <Box id="chart-iframe">
                                <Box className="crop-container" sx={{ overflow: 'hidden'}}>
                                    <img className="crop-image" src={GraphPlaceholder}/>
                                </Box>
                            </Box>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    )
}

export default ChartCard