import React, { useEffect } from 'react';
import { useState } from 'react';
import { 
    Autocomplete,
    AutocompleteChangeReason,
    Box,
    Card,
    FormControl,
    List,
    Stack,
    TextField,
    Typography
} from '@mui/material'
import ChartToggleButton from './ChartToggleButton';
import VisibilityIcon from './VisibilityIcon';
import ExpandIcon from './ExpandIcon';
// import GraphPlaceholder from './Graph.png';
import MultiButton from '../components/MultiButton';
import ListLabelDot from '../components/ListLabelDot';
import FilterCard from '../components/FilterCard';
import MultiInput from '../components/MultiInput';
import { getSubGeographiesByGeographyAndType, getGeographyDropdownOptions } from '../common/services';
import { GeographyEnum } from '../common/enum';
import { DateDelta, Geography } from '../common/types';

import '../styles/chart/chartCard.scss';

const GraphPlaceholder = require('./Graph.png');

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

const dateRanges : DateDelta[] = [
    { x: {month: 'January', year: '2023'}, y: {month: 'December', year: '2023'}},
    { x: {month: 'January', year: '2022'}, y: {month: 'December', year: '2022'}},
    { x: {month: 'January', year: '2021'}, y: {month: 'December', year: '2021'}},
    { x: {month: 'January', year: '2020'}, y: {month: 'December', year: '2020'}},
]

interface Props {
    handleExpandOnClick: () => void;
    handleClosePopUpOnClick?: () => void;
    titleBreadcrumbs: string[][];
    geography: Geography;
    filterName: GeographyEnum;
}

//location vs titleBreadcrumbs we need to keep one
function ChartCardExtendable ({filterName, handleExpandOnClick, titleBreadcrumbs, geography} : Props) {

    const [ locationFilterList, setLocationFilterList ] = useState<Geography[]>([]);
    const [ selectedLocationFilter, setSelectedLocationFilter ] = useState<Geography[]>([]);
    const [ chartOption, setChartOption ] = useState<string>("chart");
    const [ selectedDateRange, setSelectedDateRange] = useState<DateDelta | null>(dateRanges[0]);
    const [ isVisible, setIsVisible ] = useState<boolean>(true);
    const [ isExpanded, setIsExpanded ] = useState<boolean>(false);

    const [ extendedFilterOptions, setExtendedFilterOptions ] = useState<GeographyEnum[]>([]);
    const [ selectedExtendedItems, setSelectedExtendedItems ] = useState<GeographyEnum[]>([]);

    useEffect(() => {
        getSubGeographiesByGeographyAndType(geography, filterName).then(options => setLocationFilterList(options));
        setExtendedFilterOptions(getGeographyDropdownOptions(filterName));
    }, []);

    const handleChartToggle = (value : string) => {
        console.log("Chart Toggle value: " + value);
        setChartOption(value);
    }

    const handleVisibilityToggle = () => {
        console.log("OnClick value: "+ !isVisible);
        setIsVisible(!isVisible);
    }

    const handleDateChange = (event : React.SyntheticEvent<Element, Event>, dateRange : DateDelta | null, reason : AutocompleteChangeReason) => {
        console.log("Change Date reason: "+ reason +" states: " + JSON.stringify(dateRange));
        setSelectedDateRange(dateRange);
    }

    const openPopUp = () => {
        setIsExpanded(true);
        handleExpandOnClick()
    }

    const closePopUp = () => {
        setIsExpanded(false);
    }

    const multiButtonOnChange = (event : React.SyntheticEvent<Element, Event>, values : GeographyEnum[]) => {
        console.log("Change filter: " + JSON.stringify(values));
        setSelectedExtendedItems(values);
    }

    const handleLocationFilterChange = (values : Geography[]) => {
        console.log("Change filter: " + JSON.stringify(values));
        setSelectedLocationFilter(values);
    }

    const handleSubFilterChange = (values: GeographyEnum[]) => {

    }

    const titleElements = titleBreadcrumbs.map( (titleArray, index) => {
        const title = titleArray.join(', ');
        return <Typography id="chart-section-header">{title}</Typography>;
    });

    const filterCards = selectedLocationFilter.map((locationFilter) => <FilterCard geography={locationFilter} color="#DA5FB0" key={locationFilter.id} handleOnChange={handleSubFilterChange}/>);

    const extensionCards = selectedLocationFilter.map((locationFilter) => {
        return selectedExtendedItems.map((extendedItem)=>{
            const newBreadcrumbs = [...titleBreadcrumbs, [locationFilter.name]];
            return <ChartCardExtendable filterName={extendedItem} titleBreadcrumbs={newBreadcrumbs} geography={locationFilter} handleExpandOnClick={openPopUp}/>
        });
    });

    return (
        <Stack id="chart-extendable-container" spacing={1}>
            <Box id="chart-section-container">
                <Stack spacing={1}>
                    <Stack direction={isVisible ? "column" : "row"} spacing={1}>
                        <Stack id="chart-header-container" 
                            className={"flex-left-ratio"}
                            direction="row" 
                            divider={<Typography id="chart-section-header">|</Typography>}
                            spacing={0.5}
                        >
                            {titleElements}
                        </Stack>
                        <Box className={isVisible ? "row" : "flex-right-ratio"} id="chart-content-container">
                            {/* Dont forget the screen readers */}
                            <Stack className={isVisible ? "flex-left-ratio" : "vanish"} id="chart-card-left-container" sx={{ justifyContent: 'space-between' }} spacing={1}>
                                <Box>
                                    <MultiInput title={filterName} itemList={locationFilterList} handleOnChange={handleLocationFilterChange} size="small"/>
                                    <Box className="flex-left-ratio">
                                        {/* Where do the colors come from? */}
                                        {/* <ListLabelDot title="New York" color="#6C60FF"/>
                                        <ListLabelDot title="Florida" color="#DA5FB0"/> */}
                                        {filterCards}
                                    </Box>
                                </Box>
                                <Box className={selectedLocationFilter.length && extendedFilterOptions.length ? "" : "vanish"}>
                                    <MultiButton 
                                        itemList={extendedFilterOptions}
                                        handleOnChange={(event, values, reason) => multiButtonOnChange(event, values as GeographyEnum[])}
                                        value={selectedExtendedItems}
                                    />
                                </Box>
                            </Stack>
                            <Stack id="chart-card-right-container" className="flex-right-ratio" spacing={1}>
                                <Stack id="chart-options" direction="row" sx={{ justifyContent: 'space-between' }}>
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
                                <Box id="chart-iframe" className={ isVisible ? "flex-right-ratio" : "vanish" }>
                                    <Box className="crop-container" sx={{ overflow: 'hidden'}}>
                                        <img className="crop-image" src={GraphPlaceholder}/>
                                    </Box>
                                </Box>
                            </Stack>
                        </Box>
                    </Stack>
                </Stack>
            </Box>
            {extensionCards}
        </Stack>
    )
}

export default ChartCardExtendable