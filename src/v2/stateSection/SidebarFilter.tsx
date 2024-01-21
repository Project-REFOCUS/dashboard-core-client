import React, { useState, useEffect } from 'react';
import { AutocompleteChangeReason, Box, Card, CardContent, Stack, Typography } from '@mui/material';
import MultiInput from '../components/MultiInput';
import { getListOfCounties } from '../common/services';
import FilterCard from '../components/FilterCard';
import { Category, Geography } from '../common/types';
import { GeographyEnum } from '../common/enum';

import '../styles/stateSection/sidebarFilter.scss';
import { GeoTreeNode } from '../common/classes';

interface Props {
    state: Geography;
    handleGeoOnChange: (geographies: Geography[], removedIndex: number, reason: AutocompleteChangeReason) => void;
    handleFilterOnChange: (filters: GeographyEnum[], index: number) => void;
}

function SidebarFilter({state, handleGeoOnChange, handleFilterOnChange} : Props) {

    const [ itemList, setItemList ] = useState<Geography[]>([]);
    const [ selectedItems, setSelectedItems ] = useState<Geography[]>([]);

    const [ subFiltersArray, setSubFiltersArray ] = useState<GeographyEnum[][]>([]);

    useEffect(() => {
        getListOfCounties(state).then(counties => setItemList(counties));
    }, []);

    const countyOnChange = (values: Geography[], removedIndex: number, reason: AutocompleteChangeReason) => {
        setSelectedItems([...values]);
        handleGeoOnChange(values, removedIndex, reason);
    }

    const handleSubFilterChange = (values: GeographyEnum[], index: number) => {
        setSubFiltersArray((prevFiltersArray) => {
            prevFiltersArray[index] = values;
            return [...prevFiltersArray];
        });
        handleFilterOnChange(values, index);
    }

    const filterCards = selectedItems.map((county, index) => 
        <FilterCard geography={county} color="#DA5FB0" key={index} handleOnChange={(values)=> handleSubFilterChange(values, index)} selectedItems={subFiltersArray[index]}/>
    );

    return (
        <Box className="sidebar-panel">
            <Card elevation={0}>
                <Typography id="state-section-header">{state.name}</Typography>
                <Stack spacing={1}>
                    <Box>
                        <MultiInput title={state.type} itemList={itemList} handleOnChange={countyOnChange}/>
                    </Box>
                    {filterCards}
                </Stack>
            </Card>
        </Box>
    )
}

export default SidebarFilter