import React, { useEffect, useState } from 'react';
import { Card, Box, Stack, AutocompleteChangeReason } from '@mui/material';
import SidebarFilter from './SidebarFilter';
import ChartCard from '../chart/ChartCard';
import ChartCardExtendable from '../chart/ChartCardExtendable';
import { Geography } from '../common/types';
import EmptyChartCard from '../chart/EmptyChartCard';
import { GeographyEnum } from '../common/enum';
import { observer } from 'mobx-react';
import { fetchSubGeographies } from '../common/services';
import AppStore from '../stores/AppStore';

interface Props {
    state: Geography,
}

const StateSection = observer(({state} : Props) => {

    const [ geoArray, setGeoArray ] = useState<Geography[]>([]);
    const [ countyList, setCountyList ] = useState<Geography[]>([]);

    //filters corresponding to the index of the locations in the geoArray
    // i.e. geoArray[1] has multiple filters in filtersArray[1]. One to Many relationship
    const [ filtersArray, setFiltersArray ] = useState<GeographyEnum[][]>([]);

    useEffect(() => {
        fetchSubGeographies(
            AppStore.category ? AppStore.category.id : null, 
            state.id, 
            GeographyEnum.COUNTY
        ).then(counties => setCountyList(counties));
    }, []);

    // Adding or Removing the county cards that populate under the input
    const handleGeoArrayChange = (geographies: Geography[], removedIndex: number, reason: AutocompleteChangeReason) => {
        if(reason == "removeOption" && removedIndex !== -1){
            setFiltersArray((prevFilterArray) => {
                if(prevFilterArray[removedIndex]?.length > 0){
                    //prevFilterArray[removedIndex] = [];
                    prevFilterArray.splice(removedIndex, 1);
                }
                return [...prevFilterArray];
            })
        }
        // console.log("State section node geography:" + JSON.stringify(geographies[0]));
        setGeoArray(geographies);
    }

    // Changing the filter with a corresponding index
    const handleFilterChange = (filters: GeographyEnum[], index: number) => {
        //console.log("State section node filter:" + JSON.stringify(filters[0]));
        
        setFiltersArray((prevFilterArray) => {
            prevFilterArray[index] = filters;
            return [...prevFilterArray];
        });
    }

    const chartCard = geoArray.length === 0  ? <EmptyChartCard geographyType={GeographyEnum.COUNTY} /> :
        <ChartCard 
            geographies={geoArray}
            targetType={GeographyEnum.COUNTY} 
            titleBreadcrumbs={[[state.name],["County"]]} 
            secondary
        />
    ;
    
    const chartCardExtendable = geoArray.length === 0 ? null : 
    geoArray.map((geography, index) => (filtersArray[index] === undefined) ? null :
        filtersArray[index].map((filter, filterIndex) =>
            <Card className="inner-card" elevation={0} key={filterIndex}>
                <ChartCardExtendable geography={geography} state={state} ancestry={[state, geography]} filterName={filter} key={filterIndex}/>
            </Card>
        )
    );

    return (
        <Card className={countyList.length === 0 ? "vanish" : ""} elevation={0}>
            <Stack direction="row">
                <SidebarFilter state={state} counties={countyList} handleGeoOnChange={handleGeoArrayChange} handleFilterOnChange={handleFilterChange}/>
                <Stack className="flex-right-ratio" sx={{ paddingRight: '8px'}} spacing={1}>
                    <Card elevation={0}>
                        {chartCard}
                        <Box id="chart-sidebar-panel" className="flex-right-ratio">
                            {chartCardExtendable}
                        </Box>
                    </Card>
                </Stack>
            </Stack>
        </Card>
    )
})

export default StateSection