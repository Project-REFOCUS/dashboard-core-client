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
import { Geography } from '../common/types';
import { GeographyEnum } from '../common/enum';

import '../styles/stateSection/filterCard.scss'

interface Props {
    geography: Geography;
    color: string;
    handleOnChange: (values : GeographyEnum[]) => void;
    selectedItems: GeographyEnum[];
}

function FilterCard({geography, color, selectedItems=[], handleOnChange}: Props) {

    const [filterOptions, setFilterItems] = useState<GeographyEnum[]>([]);

    useEffect(() => {
        setFilterItems(getGeographyDropdownOptions(geography.type));
    }, []);

    const selectedOnChange= (event: React.SyntheticEvent<Element, Event>, values: GeographyEnum[], reason: AutocompleteChangeReason) => {
        console.log("Change filter: " + JSON.stringify(values));
        handleOnChange(values);
    }

    const handleChipDelete = (label: GeographyEnum, key : number) => {
        console.log("Delete chip: "+ label + " " + key);

        const filteredItems = selectedItems.filter((item, index) => index !== key);
        handleOnChange(filteredItems);
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