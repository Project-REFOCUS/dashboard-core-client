import { Card, Box, Stack, CardContent, AutocompleteChangeReason } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SidebarFilter from './SidebarFilter'
import ChartCard from '../chart/ChartCard'
import ChartCardExtendable from '../chart/ChartCardExtendable'
import { Geography } from '../common/types'
import { GeoTreeNode } from '../common/classes'
import EmptyChartCard from '../chart/EmptyChartCard'
import { debugPrint } from '../common/utils'
import { GeographyEnum } from '../common/enum'

interface Props {
    state: Geography;
}

function StateSection({state} : Props) {

    // const [ geoNode, setGeoNode ] = useState<GeoTreeNode>(new GeoTreeNode(state));

    const [ geoArray, setGeoArray ] = useState<Geography[]>([]);

    const [ filtersArray, setFiltersArray ] = useState<GeographyEnum[][]>([]);

    // useEffect(()=>{},[geoNode]);

    const handleGeoArrayChange = (geographies: Geography[], removedIndex: number, reason: AutocompleteChangeReason) => {
        if(reason == "removeOption" && removedIndex !== -1){
            setFiltersArray((prevFilterArray) => {
                if(prevFilterArray[removedIndex]?.length > 0){
                    prevFilterArray[removedIndex] = [];
                }
                return [...prevFilterArray];
            })
        }
        console.log("State section node geography:" + JSON.stringify(geographies[0]));
        setGeoArray((prevGeographies)=>geographies);    //filter out the filter array of unncessary data
        //its the same class so it wont update
    }

    const handleFilterChange = (filters: GeographyEnum[], index: number) => {
        console.log("State section node filter:" + JSON.stringify(filters[0]));
        
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
            handleExpandOnClick={()=>{}}
        />
    ;
    
    const chartCardExtendable = geoArray.length === 0 ? null : 
    geoArray.map((geography, index) => (filtersArray[index] === undefined) ? null :
        filtersArray[index].map((filter)=>
            <Card className="inner-card" elevation={0}>
                <ChartCardExtendable geography={geography} state={state} ancestry={[state, geography]} filterName={filter} handleExpandOnClick={()=>{}}/>
            </Card>
        )
    );

    return (
        <Card elevation={0}>
            <Stack spacing={1}>
                <Stack direction="row" spacing={1}>
                    <SidebarFilter state={state} handleGeoOnChange={handleGeoArrayChange} handleFilterOnChange={handleFilterChange}/>
                    {chartCard}
                </Stack>
                <Stack direction="row" spacing={1}>
                    <Box className="sidebar-spacer flex-left-ratio"></Box>
                    <Box id="chart-sidebar-panel" className="flex-right-ratio">
                        {chartCardExtendable}
                    </Box>
                </Stack>
            </Stack>
        </Card>
    )
}

export default StateSection