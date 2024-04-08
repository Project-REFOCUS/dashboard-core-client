import React, { useEffect, useState } from 'react';
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
import { fetchSubGeographies } from '../common/services';
import { GeographyEnum, GraphTypeEnum } from '../common/enum';
import { DateDelta, Geography } from '../common/types';
import TrashIcon from './TrashIcon';
import AppStore from '../stores/AppStore';
import CloseIcon from './CloseIcon';
import { dateRanges } from '../common/constants';

import '../styles/chart/chartCard.scss';
import { observer } from 'mobx-react';
import GraphIframe from './GraphIframe';
import EmptyChartCard from './EmptyChartCard';

interface Props {
    handleClosePopUpOnClick?: () => void;
    handleDelete?: () => void;  //only for recursive, used to remove the filterCard chips
    filterName: GeographyEnum;  //the desired geography
    geography: Geography;       // the parent geography
    state: Geography;
    ancestry: Geography[];
    extension?: boolean;        // determines if this card populates within the parent card
};

const ChartCardExtendable = observer(({geography, filterName, ancestry, state, handleDelete=() => {}, extension=false} : Props) => {

    const [ locationFilterList, setLocationFilterList ] = useState<Geography[]>([]);
    const [ selectedLocationFilterList, setSelectedLocationFilterList ] = useState<Geography[]>([]);
    const [ chartOption, setChartOption ] = useState<GraphTypeEnum>(GraphTypeEnum.BAR);
    const [ chartOptionsList, setChartOptionsList ] = useState<GraphTypeEnum[]>([]);
    const [ selectedDateRange, setSelectedDateRange] = useState<DateDelta | null>(dateRanges[0]);
    const [ isVisible, setIsVisible ] = useState<boolean>(true);
    const [ isExpanded, setIsExpanded ] = useState<boolean>(false);

    const [ childFiltersArray, setChildFiltersArray ] = useState<GeographyEnum[][]>([]);
    
    useEffect(() => {
        fetchSubGeographies(
            AppStore.category ? AppStore.category.id : null,
            geography.id,
            filterName
        ).then(dropdownLocations => setLocationFilterList(dropdownLocations));
    }, []);

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

    // Adding/Removing a new Geography Card
    const handleLocationFilterChange = (values : Geography[], removedIndex: number, reason: AutocompleteChangeReason) => {
        // console.log("Change filter: " + JSON.stringify(values));
        if(reason == "removeOption" && removedIndex !== -1){
            setChildFiltersArray((prevFiltersArray) => {
                if(prevFiltersArray[removedIndex]?.length > 0){
                    prevFiltersArray.splice(removedIndex, 1);
                }

                return [...prevFiltersArray];
            });
        }
        setSelectedLocationFilterList(values);
    }

    // Adding/Removing a new geography type toast to a Geography Card
    const handleSubFilterChange = (values: GeographyEnum[], index: number) => {
        setChildFiltersArray((prevFiltersArray) => {
            prevFiltersArray[index] = values;
            return [...prevFiltersArray];
        });
    }

    const removeChildFilter = (geoIndex: number, removeIndex: number) => {
        
        setChildFiltersArray((prevFiltersArray) => {
            prevFiltersArray[geoIndex] = prevFiltersArray[geoIndex].filter((child, index) => index !== removeIndex);
            // console.log("After remove: "+ JSON.stringify(prevFiltersArray[geoIndex]));
            return [...prevFiltersArray];
        });
    }

    const titleElements = ancestry.map((geographyItem, index) => <Typography id="chart-section-header" key={index}>{geographyItem.name}</Typography>);

    const filterCards = selectedLocationFilterList.map((locationFilter, index) => <FilterCard geography={locationFilter} color="#DA5FB0" key={index} handleOnChange={(values)=> handleSubFilterChange(values, index)} selectedItems={childFiltersArray[index]}/>);

    const extensionCards = selectedLocationFilterList.length === 0 ? null : 
        selectedLocationFilterList.map((geographyExtention, geoIndex) => childFiltersArray[geoIndex] === undefined ? null :
        childFiltersArray[geoIndex].map((filter, filterIndex) =>
            <ChartCardExtendable 
                geography={geographyExtention}
                state={state} ancestry={[...ancestry, geographyExtention]}
                filterName={filter} 
                handleDelete={()=>removeChildFilter(geoIndex, filterIndex)}
                extension
                key={filterIndex}
            />
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
                            <Stack className={isVisible ? "flex-left-ratio" : "vanish"} id="chart-card-left-container" sx={{ justifyContent: 'space-between'}} spacing={1}>
                                <Box sx={{maxWidth: 209 }}>
                                    <MultiInput title={filterName} itemList={locationFilterList} handleOnChange={handleLocationFilterChange}/>
                                    <Box className="flex-left-ratio">
                                        {filterCards}
                                    </Box>
                                </Box>
                            </Stack>
                            <Stack id="chart-card-right-container" className="flex-right-ratio" spacing={1}>
                                <Stack id="chart-options" direction="row" sx={{ justifyContent: 'space-between' }}>
                                    <Box className="flex-left-ratio">
                                        <ChartToggleButton handleOnChange={handleChartToggle} selected={chartOption} options={chartOptionsList}/>
                                    </Box>
                                    <Stack direction="row" className="flex-right-ratio" id="chart-option-right">
                                        <Box className="fill-container" id="date-range-container">
                                            <FormControl id="date-selector" variant="standard">
                                                <Autocomplete
                                                    size="small"
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
                                        {/* Todo: there are hover over descriptions for the buttons */}
                                        <VisibilityIcon handleOnClick={handleVisibilityToggle} isVisible={isVisible}/>
                                        { !isExpanded ? <ExpandIcon handleOnClick={openPopUp}/> : <CloseIcon handleOnClick={closePopUp}/>}
                                    </Stack>
                                </Stack>
                                <Box id="chart-iframe" className={ isVisible ? "flex-right-ratio" : "vanish" }>
                                    <Box className="crop-container" sx={{ overflow: 'hidden'}}>
                                        { selectedLocationFilterList.length > 0 ?
                                        <GraphIframe  
                                            geographies={selectedLocationFilterList} 
                                            targetType={filterName} 
                                            graphType={chartOption && chartOptionsList.length > 0 ? chartOption : undefined} 
                                            category={AppStore.category} 
                                            handleGraphTypeOptions={handleGraphTypeOptions}
                                            fullscreen={isExpanded}
                                        />
                                        :
                                        <EmptyChartCard geographyType={filterName}/>
                                        }
                                    </Box>
                                </Box>
                            </Stack>
                        </Box>
                    </Stack>
                </Stack>
            </Box>
            {!isExpanded ? extensionCards : null}
        </Stack>
    )
})

export default ChartCardExtendable