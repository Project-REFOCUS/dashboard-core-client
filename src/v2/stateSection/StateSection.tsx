import React, { useState } from 'react';
import { Card, Box, Stack, AutocompleteChangeReason } from '@mui/material';
import SidebarFilter from './SidebarFilter';
import ChartCard from '../chart/ChartCard';
import ChartCardExtendable from '../chart/ChartCardExtendable';
import { Geography } from '../common/types';
import EmptyChartCard from '../chart/EmptyChartCard';
import { GeographyEnum } from '../common/enum';

interface Props {
    state: Geography;
}

function StateSection({state} : Props) {

    const [ geoArray, setGeoArray ] = useState<Geography[]>([]);

    const [ filtersArray, setFiltersArray ] = useState<GeographyEnum[][]>([]);

    const handleGeoArrayChange = (geographies: Geography[], removedIndex: number, reason: AutocompleteChangeReason) => {
        if(reason == "removeOption" && removedIndex !== -1){
            setFiltersArray((prevFilterArray) => {
                if(prevFilterArray[removedIndex]?.length > 0){
                    prevFilterArray[removedIndex] = [];
                }
                return [...prevFilterArray];
            })
        }
        // console.log("State section node geography:" + JSON.stringify(geographies[0]));
        setGeoArray(geographies);
    }

    const handleFilterChange = (filters: GeographyEnum[], index: number) => {
        //console.log("State section node filter:" + JSON.stringify(filters[0]));
        
        setFiltersArray((prevFilterArray) => {
            prevFilterArray[index] = filters;
            return [...prevFilterArray];
        });
    }

    const chartCard = geoArray.length === 0  ? <EmptyChartCard/> :
        <ChartCard 
            geographies={geoArray} 
            titleBreadcrumbs={[[state.name],["County"]]} 
            secondary
        />
    ;
    
    const chartCardExtendable = geoArray.length === 0 ? null : 
    geoArray.map((geography, index) => (filtersArray[index] === undefined) ? null :
        filtersArray[index].map((filter, filterIndex)=>
            <Card className="inner-card" elevation={0} key={filterIndex}>
                <ChartCardExtendable geography={geography} state={state} ancestry={[state, geography]} filterName={filter} />
            </Card>
        )
    );

    return (
        <Card elevation={0}>
            <Stack direction="row">
                <SidebarFilter state={state} handleGeoOnChange={handleGeoArrayChange} handleFilterOnChange={handleFilterChange}/>
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
}

export default StateSection