import React from 'react'
import { useState } from 'react';
import { 
    Autocomplete,
    AutocompleteChangeReason,
    Box,
    Card,
    FormControl,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import ChartToggleButton from './ChartToggleButton'
import VisibilityIcon from './VisibilityIcon';
import ExpandIcon from './ExpandIcon';
import ListLabelDot from '../components/ListLabelDot';
import { DateDelta, Geography } from '../common/types';
import CloseIcon from './CloseIcon';
import appStore from '../stores/appStore'
import { dateRanges } from '../common/constants';

import '../styles/chart/chartCard.scss';


const GraphPlaceholder = require('./Graph.png');
const GraphXL = require('../../graph_xl.png');

// Primary (Title lines up with the options, Title Visible when card invisible)
// Secondary (Title lines up with the options, Title Visible)

interface Props {
    titleBreadcrumbs: string[][];
    secondary?: boolean;
    geographies: Geography[];
    handleClosePopUpOnClick?: () => void;
}

const ChartCard = ({geographies, titleBreadcrumbs, secondary=false, handleClosePopUpOnClick}: Props) => {

    const [ chartOption, setChartOption ] = useState<string>("chart");
    const [ selectedDateRange, setSelectedDateRange] = useState<DateDelta | null>(dateRanges[0]);
    const [ isVisible, setIsVisible ] = useState<boolean>(true);
    const [ isExpanded, setIsExpanded ] = useState<boolean>(false);

    const handleChartToggle = (value : string) => {
        console.log("Chart Toggle value: " + value);
        setChartOption(value);
    }

    const handleVisibilityToggle = () => {
        console.log("OnClick value: "+ !isVisible);
        if(isExpanded && isVisible){
            closePopUp();
        }
        setIsVisible(!isVisible);
    }

    const handleDateChange = (event : React.SyntheticEvent<Element, Event>, dateRange : DateDelta | null, reason : AutocompleteChangeReason) => {
        console.log("Change Date reason: "+ reason +" states: " + JSON.stringify(dateRange));
        setSelectedDateRange(dateRange);
    }

    const openPopUp = () => {
        if(!isVisible){
            setIsVisible(true);
        }
        setIsExpanded(true);
        appStore.setIsExpanded(true);
    }

    const closePopUp = () => {
        setIsExpanded(false);
        appStore.setIsExpanded(false);
    }

    const titleElements = titleBreadcrumbs.map( (titleArray : string[], index : number) => {
        const title = titleArray.join(', ');
        return <Typography id="chart-section-header">{title}</Typography>;
    });

    const listLabelDots = geographies.map(geography => <ListLabelDot title={geography.name} color="#DA5FB0"/>);

    return (
        <Box id="chart-sidebar-panel" className={isExpanded ? "expand-popup" : "flex-right-ratio"}>
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
                                { secondary || !isVisible || isExpanded ? titleElements : null}
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
                                                    `${dateRange.x.month} ${dateRange.x.year} - ${dateRange.y.month} ${dateRange.y.year}`}
                                                value={selectedDateRange}
                                                onChange={handleDateChange}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        // variant="outlined"
                                                        sx={{padding: 0}}
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                    </Box>
                                    {/* To do: there are hover over descriptions for the buttons */}
                                    <VisibilityIcon handleOnClick={handleVisibilityToggle} isVisible={isVisible}/>
                                    { !isExpanded ? <ExpandIcon handleOnClick={openPopUp}/> : <CloseIcon handleOnClick={closePopUp}/>}
                                </Stack>
                            </Stack>
                        </Stack>
                        { isVisible &&
                            <Stack direction="row">
                                <Box className="flex-left-ratio">
                                    {/* Where do the colors come from? */}
                                    {listLabelDots}
                                </Box>
                                <Box id="chart-iframe" className="flex-right-ratio" >
                                    <img className={isExpanded ? "img-expand": ""} src={isExpanded ? GraphXL : GraphPlaceholder}/>
                                </Box>
                            </Stack>
                        }
                    </Stack>
                </Box>
            </Card>
        </Box>
    )
}

export default ChartCard

{/* <Box id="chart-iframe" className="flex-right-ratio">
                                    <Box className="crop-container" sx={{ overflow: 'hidden'}}>
                                        <img className="crop-image" src={isExpanded ? GraphXL : GraphPlaceholder}/>
                                    </Box>
                                </Box> */}