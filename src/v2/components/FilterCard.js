import React, { useEffect, useState } from 'react';
import {
    Card,
    Chip,
    Stack,
} from '@mui/material';
import ListLabelDot from './ListLabelDot';
import MultiButton from './MultiButton';
import { getFilterDropdownOptions } from '../common/services'

import '../styles/stateSection/filterCard.scss'

const filterOptions = ["County Subdivision", "City", "Census Track"];

//category= {id:"",name:""}

function FilterCard({location, category, color, handleOnChange}) {

    const [selectedItems, setSelectedItems] = useState([]);
    const [filterOptions, setFilterItems] = useState([]);

    useEffect(() => {
        setFilterItems(getFilterDropdownOptions(category));
    }, []);

    const selectedOnChange=(event, values) =>{
        console.log("Change filter: " + JSON.stringify(values));
        setSelectedItems(values);
        handleOnChange(values);
    }

    const handleChipDelete = (label, key) => {
        console.log("Delete chip: "+ label + " " + key);
        setSelectedItems((selectedItems)=> selectedItems.filter((item, index) => index !== key));
        handleOnChange(selectedItems);
    }

    const labelChips = selectedItems.map((item, index) => <Chip label={item} key={index} onDelete={()=> handleChipDelete(item, index)} />);

    return (
        <Card className="inner-card" id="filter-card">
            <Stack spacing={1}>
                <Stack className="flex-center" direction="row">
                    <ListLabelDot title={location.name} color={color}/>
                    <MultiButton listItems={filterOptions} handleOnChange={selectedOnChange} value={selectedItems}/>
                </Stack>
                <Stack className="wrap" direction="row" spacing={1} useFlexGap>
                    {labelChips}
                </Stack>
            </Stack>
        </Card>
    )
}

export default FilterCard