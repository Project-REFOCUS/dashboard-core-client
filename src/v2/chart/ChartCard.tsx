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
import AppStore from '../stores/AppStore'
import { dateRanges } from '../common/constants';

import '../styles/chart/chartCard.scss';
import GraphIframe from './GraphIframe';
import { GeographyEnum, GraphTypeEnum } from '../common/enum';
import { observer } from 'mobx-react';

// Primary (Title lines up with the options, Title Visible when card invisible)
// Secondary (Title lines up with the options, Title Visible)

interface Props {
    titleBreadcrumbs: string[][],
    secondary?: boolean,
    geographies: Geography[],
    targetType: GeographyEnum,
    handleClosePopUpOnClick?: () => void,
}

const ChartCard = observer(({geographies, targetType, titleBreadcrumbs, secondary=false, handleClosePopUpOnClick}: Props) => {

    const [ chartOption, setChartOption ] = useState<GraphTypeEnum>(GraphTypeEnum.BAR);
    const [ chartOptionsList, setChartOptionsList ] = useState<GraphTypeEnum[]>([]);
    const [ selectedDateRange, setSelectedDateRange] = useState<DateDelta | null>(dateRanges[0]);
    const [ isVisible, setIsVisible ] = useState<boolean>(true);
    const [ isExpanded, setIsExpanded ] = useState<boolean>(false);

    const handleGraphTypeOptions = (graphOptions : GraphTypeEnum[]) => {
        // console.log("Chart Toggle options values: " + JSON.stringify(graphOptions));
        const option = graphOptions.length < 2 ? graphOptions[0] : graphOptions.find(graphOption => graphOption == chartOption)
        setChartOptionsList(graphOptions);
        setChartOption(option ? option : graphOptions[0]);
    }

    const handleChartToggle = (value : GraphTypeEnum) => {
        // console.log("Chart Toggle value: " + value);
        setChartOption(value);
    }

    const handleVisibilityToggle = () => {
        // console.log("OnClick value: "+ !isVisible);
        if(isExpanded && isVisible){
            closePopUp();
        }
        setIsVisible(!isVisible);
    }

    const handleDateChange = (event : React.SyntheticEvent<Element, Event>, dateRange : DateDelta | null, reason : AutocompleteChangeReason) => {
        // console.log("Change Date reason: "+ reason +" states: " + JSON.stringify(dateRange));
        setSelectedDateRange(dateRange);
    }

    const openPopUp = () => {
        if(!isVisible){
            setIsVisible(true);
        }
        setIsExpanded(true);
        AppStore.setIsExpanded(true);
    }

    const closePopUp = () => {
        setIsExpanded(false);
        AppStore.setIsExpanded(false);
    }

    const titleElements = titleBreadcrumbs.map( (titleArray : string[], index : number) => {
        const title = titleArray.join(', ');
        return <Typography id="chart-section-header" key={index}>{title}</Typography>;
    });

    const listLabelDots = geographies.map((geography, index) => <ListLabelDot title={geography.name} color="#DA5FB0" key={index}/>);

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
                                    <ChartToggleButton handleOnChange={handleChartToggle} selected={chartOption} options={chartOptionsList}/>
                                </Box>
                                <Stack direction="row" className="flex-right-ratio" id="chart-option-right">
                                    <Box className="fill-container" id="date-range-container">
                                        <FormControl id="date-selector" variant="standard">
                                            <Autocomplete
                                                id="date-range-dropdown"
                                                size="small"
                                                options={dateRanges}
                                                getOptionLabel={(dateRange) =>
                                                    `${dateRange.x.month} ${dateRange.x.year} - ${dateRange.y.month} ${dateRange.y.year}`}
                                                value={selectedDateRange}
                                                onChange={handleDateChange}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        sx={{padding: 0}}
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                    </Box>
                                    <VisibilityIcon handleOnClick={handleVisibilityToggle} isVisible={isVisible}/>
                                    { !isExpanded ? <ExpandIcon handleOnClick={openPopUp}/> : <CloseIcon handleOnClick={closePopUp}/>}
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack direction="row" className={!isVisible ? 'vanish' : ''}>
                            <Box className="flex-left-ratio">
                                {/* Todo: Where do the colors come from? */}
                                {listLabelDots}
                            </Box>
                            <Box id="chart-iframe" className="flex-right-ratio" >
                                <Box className="crop-container" sx={{ overflow: 'hidden'}}>
                                    <GraphIframe
                                        geographies={geographies}
                                        targetType={targetType}
                                        graphType={chartOption && chartOptionsList.length > 0 ? chartOption : undefined}
                                        category={AppStore.category}
                                        handleGraphTypeOptions={handleGraphTypeOptions}
                                        fullscreen={isExpanded}
                                    />
                                </Box>
                            </Box>
                        </Stack>
                    </Stack>
                </Box>
            </Card>
        </Box>
    )
})

export default ChartCard