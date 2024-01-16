import React, { useEffect, useState } from 'react';
import {
    AutocompleteChangeReason,
    Card,
    Chip,
    Stack,
} from '@mui/material';
import ListLabelDot from './ListLabelDot';
import MultiButton from './MultiButton';
import { getGeographyDropdownOptions } from '../common/services'
import { Category, Geography } from '../common/types';

import '../styles/stateSection/filterCard.scss'
import { GeographyEnum } from '../common/enum';


const filterOptions = ["County Subdivision", "City", "Census Track"];

//category= {id:"",name:""}

interface Props {
    geography: Geography;
    color: string;
    handleOnChange: (values : GeographyEnum[]) => void;
}

function FilterCard({geography, color, handleOnChange}: Props) {

    const [selectedItems, setSelectedItems] = useState<GeographyEnum[]>([]);
    const [filterOptions, setFilterItems] = useState<GeographyEnum[]>([]);

    useEffect(() => {
        setFilterItems(getGeographyDropdownOptions(geography.type));
    }, []);

    const selectedOnChange= (event: React.SyntheticEvent<Element, Event>, values: GeographyEnum[], reason: AutocompleteChangeReason) => {
        console.log("Change filter: " + JSON.stringify(values));
        setSelectedItems(values);
        handleOnChange(values);
    }

    const handleChipDelete = (label : GeographyEnum, key : number) => {
        console.log("Delete chip: "+ label + " " + key);
        setSelectedItems((selectedItems)=> selectedItems.filter((item, index) => index !== key));
        handleOnChange(selectedItems);
    }

    const labelChips = selectedItems.map((item, index) => 
        <Chip label={item} key={index} onDelete={()=> handleChipDelete(item, index)} />
    );

    return (
        <Card className="inner-card" id="filter-card">
            <Stack spacing={1}>
                <Stack className="flex-center" direction="row">
                    <ListLabelDot title={geography.name} color={color}/>
                    <MultiButton itemList={filterOptions} handleOnChange={(event, values, reason) => selectedOnChange(event, values as GeographyEnum[], reason)} value={selectedItems}/>
                </Stack>
                <Stack className="wrap" direction="row" spacing={1} useFlexGap>
                    {labelChips}
                </Stack>
            </Stack>
        </Card>
    )
}

export default FilterCard