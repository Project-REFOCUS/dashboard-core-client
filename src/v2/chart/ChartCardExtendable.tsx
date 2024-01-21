import React, { useEffect } from 'react';
import { useState } from 'react';
import { 
    Autocomplete,
    AutocompleteChangeReason,
    Box,
    FormControl,
    Stack,
    TextField,
    Typography
} from '@mui/material'
import ChartToggleButton from './ChartToggleButton';
import VisibilityIcon from './VisibilityIcon';
import ExpandIcon from './ExpandIcon';
import FilterCard from '../components/FilterCard';
import MultiInput from '../components/MultiInput';
import { getSubGeographiesByGeographyAndType } from '../common/services';
import { GeographyEnum } from '../common/enum';
import { DateDelta, Geography } from '../common/types';
import TrashIcon from './TrashIcon';
import appStore from '../stores/appStore';
import CloseIcon from './CloseIcon';
import { dateRanges } from '../common/constants';

import '../styles/chart/chartCard.scss';

const GraphPlaceholder = require('./Graph.png');
const GraphXL = require('../../graph_xl.png');

interface Props {
    handleClosePopUpOnClick?: () => void;
    handleDelete?: () => void;
    filterName: GeographyEnum;
    geography: Geography;
    state: Geography;
    ancestry: Geography[];
    extension?: boolean;

};

function ChartCardExtendable ({geography, filterName, ancestry, state, handleDelete=() => {}, extension=false} : Props) {

    const [ locationFilterList, setLocationFilterList ] = useState<Geography[]>([]);
    const [ selectedLocationFilterList, setSelectedLocationFilterList ] = useState<Geography[]>([]);
    const [ chartOption, setChartOption ] = useState<string>("chart");
    const [ selectedDateRange, setSelectedDateRange] = useState<DateDelta | null>(dateRanges[0]);
    const [ isVisible, setIsVisible ] = useState<boolean>(true);
    const [ isExpanded, setIsExpanded ] = useState<boolean>(false);

    const [ childFiltersArray, setChildFiltersArray ] = useState<GeographyEnum[][]>([]);

    useEffect(() => {
        getSubGeographiesByGeographyAndType(state, geography, filterName).then(options => setLocationFilterList(options));
    }, []);

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
        //console.log("Extendable node filter: index:"+ index +" " + JSON.stringify(values));
        
        setChildFiltersArray((prevFiltersArray) => {
            prevFiltersArray[index] = values;
            return [...prevFiltersArray];
        });
    }

    const removeChildFilter = (geoIndex: number, removeIndex: number) => {
        //console.log("Remove child filter: index:"+ geoIndex +" "+removeIndex +" " + JSON.stringify(childFiltersArray[geoIndex]));
        
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
            <ChartCardExtendable geography={geography} state={state} ancestry={[...ancestry, geography]} filterName={filter} handleDelete={()=>removeChildFilter(geoIndex, filterIndex)} extension/>
        )
    );

    return (
        <Stack id="chart-extendable-container" className={isExpanded ? "expand-popup" : ""} spacing={1}>
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
                                        { !isExpanded ? <ExpandIcon handleOnClick={openPopUp}/> : <CloseIcon handleOnClick={closePopUp}/>}
                                    </Stack>
                                </Stack>
                                <Box id="chart-iframe" className={ isVisible ? "flex-right-ratio" : "vanish" }>
                                    <img className={isExpanded ? "img-expand": ""} src={isExpanded ? GraphXL : GraphPlaceholder}/>
                                </Box>
                            </Stack>
                        </Box>
                    </Stack>
                </Stack>
            </Box>
            {!isExpanded ? extensionCards : null}
        </Stack>
    )
}

export default ChartCardExtendable