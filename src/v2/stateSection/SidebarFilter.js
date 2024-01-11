import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import MultiInput from '../components/MultiInput';
import { getListOfCounties } from '../common/services';
import CategoryCard from './CategoryCard';

import '../styles/stateSection/sidebarFilter.scss';

function SidebarFilter({location}) {

    const [ itemList, setItemList ] = useState([]);
    const [ selectedItems, setSelectedItems ] = useState([]);

    useEffect(() => {
        getListOfCounties(location).then(counties => setItemList(counties));
    }, []);

    const countyOnChange=(event, values, reason) =>{
        console.log("Change Counties reason: "+ reason +" counties: " + JSON.stringify(values));
        setSelectedItems(values);
    }

   const categoryCards = selectedItems.map((county) => <CategoryCard title={county.name} color="#DA5FB0" key={county.id}/>);

    return (
        <Box className="sidebar-panel">
            <Card elevation={0}>
                <Typography id="state-section-header">{location}</Typography>
                <Stack spacing={1}>
                    <Box>
                        <MultiInput title="County" itemList={itemList} handleOnChange={countyOnChange}/>
                    </Box>
                    {categoryCards}
                </Stack>
            </Card>
        </Box>
    )
}

export default SidebarFilter