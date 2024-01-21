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
import { GeoTreeNode } from '../common/classes';
import TrashIcon from './TrashIcon';

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
    handleDelete: () => void;
    filterName: GeographyEnum;
    geography: Geography;
    state: Geography;
    ancestry: Geography[];
    extension: boolean;

}

//location vs titleBreadcrumbs we need to keep one
function ChartCardExtendable ({geography, filterName, ancestry, state, handleExpandOnClick, handleDelete, extension=false} : Props) {

    const [ locationFilterList, setLocationFilterList ] = useState<Geography[]>([]);
    const [ selectedLocationFilterList, setSelectedLocationFilterList ] = useState<Geography[]>([]);
    const [ chartOption, setChartOption ] = useState<string>("chart");
    const [ selectedDateRange, setSelectedDateRange] = useState<DateDelta | null>(dateRanges[0]);
    const [ isVisible, setIsVisible ] = useState<boolean>(true);
    const [ isExpanded, setIsExpanded ] = useState<boolean>(false);

    //const [ extendedFilterOptions, setExtendedFilterOptions ] = useState<GeographyEnum[]>([]);
    const [ childFiltersArray, setChildFiltersArray ] = useState<GeographyEnum[][]>([]);

    useEffect(() => {
        getSubGeographiesByGeographyAndType(state, geography, filterName).then(options => setLocationFilterList(options));
        //setExtendedFilterOptions(getGeographyDropdownOptions(filterName));
    }, []);

    useEffect

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

    const handleLocationFilterChange = (values : Geography[], removedIndex: number, reason: AutocompleteChangeReason) => {
        console.log("Change filter: " + JSON.stringify(values));
        if(reason == "removeOption" && removedIndex !== -1){
            setChildFiltersArray((prevFiltersArray) => {
                if(prevFiltersArray[removedIndex].length > 0){
                    prevFiltersArray[removedIndex] = [];
                }

                return [...prevFiltersArray];
            });
        }
        setSelectedLocationFilterList(values);
    }

    const handleSubFilterChange = (values: GeographyEnum[], index: number) => {
        console.log("Extendable node filter: index:"+ index +" " + JSON.stringify(values));
        
        setChildFiltersArray((prevFiltersArray) => {
            prevFiltersArray[index] = values;
            return [...prevFiltersArray];
        });
    }

    const removeChildFilter = (geoIndex: number, removeIndex: number) => {

        console.log("Remove child filter: index:"+ geoIndex +" "+removeIndex +" " + JSON.stringify(childFiltersArray[geoIndex]));
        //setSelectedLocationFilterList((prevList)=> prevList.filter((location, index)=> index == removeIndex));

        setChildFiltersArray((prevFiltersArray) => {
            prevFiltersArray[geoIndex] = prevFiltersArray[geoIndex].filter((child, index) => index !== removeIndex);
            console.log("After remove: "+ JSON.stringify(prevFiltersArray[geoIndex]));
            return [...prevFiltersArray];
        });
    }

    const titleElements = ancestry.map((geography, index) => <Typography id="chart-section-header" key={index}>{geography.name}</Typography>);

    const filterCards = selectedLocationFilterList.map((locationFilter, index) => <FilterCard geography={locationFilter} color="#DA5FB0" key={index} handleOnChange={(values)=> handleSubFilterChange(values, index)} selectedItems={childFiltersArray[index]}/>);

    const extensionCards = selectedLocationFilterList.length === 0 ? null : 
        selectedLocationFilterList.map((geography, geoIndex) => childFiltersArray[geoIndex] === undefined ? null :
        childFiltersArray[geoIndex].map((filter, filterIndex) =>
            <ChartCardExtendable geography={geography} state={state} ancestry={[...ancestry, geography]} filterName={filter} handleExpandOnClick={()=>{}} handleDelete={()=>removeChildFilter(geoIndex, filterIndex)} extension/>
        )
    );

    return (
        <Stack id="chart-extendable-container" spacing={1}>
            <Box id="chart-section-container">
                <Stack spacing={1}>
                    <Stack direction={isVisible ? "column" : "row"} spacing={1}>
                        <Stack id="chart-header-container" className={"flex-left-ratio"} direction="row" spacing={0.5}>
                            <Stack
                                direction="row" 
                                divider={<Typography id="chart-section-header">|</Typography>}
                                spacing={0.5}
                            >
                            {titleElements}
                            </Stack>
                            {extension && <TrashIcon handleOnClick={handleDelete}/>}
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
                                {/* <Box className={selectedLocationFilter.length && extendedFilterOptions.length ? "" : "vanish"}>
                                    <MultiButton 
                                        itemList={extendedFilterOptions}
                                        handleOnChange={(event, values, reason) => multiButtonOnChange(event, values as GeographyEnum[])}
                                        value={selectedExtendedItems}
                                    />
                                </Box> */}
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