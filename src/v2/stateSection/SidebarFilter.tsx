import React, { useState, useEffect } from 'react';
import { AutocompleteChangeReason, Box, Card, CardContent, Stack, Typography } from '@mui/material';
import MultiInput from '../components/MultiInput';
import { getListOfCounties } from '../common/services';
import FilterCard from '../components/FilterCard';
import { Category, Geography } from '../common/types';
import { GeographyEnum } from '../common/enum';

import '../styles/stateSection/sidebarFilter.scss';


interface Props {
    geography: Geography;
}

function SidebarFilter({geography} : Props) {

    const [ itemList, setItemList ] = useState<Geography[]>([]);
    const [ selectedItems, setSelectedItems ] = useState<Geography[]>([]);

    useEffect(() => {
        getListOfCounties(geography).then(counties => setItemList(counties));
    }, []);

    const countyOnChange = (values: Geography[]) => {
        setSelectedItems(values);
    }

    const handleSubFilterChange = (values: GeographyEnum[]) => {

    }

    const filterCards = selectedItems.map((county) => 
        <FilterCard geography={county} color="#DA5FB0" key={county.id} handleOnChange={handleSubFilterChange}/>
    );

    return (
        <Box className="sidebar-panel">
            <Card elevation={0}>
                <Typography id="state-section-header">{geography.name}</Typography>
                <Stack spacing={1}>
                    <Box>
                        <MultiInput title={geography.type} itemList={itemList} handleOnChange={countyOnChange}/>
                    </Box>
                    {filterCards}
                </Stack>
            </Card>
        </Box>
    )
}

export default SidebarFilter