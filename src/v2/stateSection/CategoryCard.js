import React, { useState } from 'react';
import { DownArrow } from '../components/CustomIcons';
import {
    Box,
    Button,
    Card,
    Chip,
    Stack,
    Autocomplete
} from '@mui/material';
import ListLabelDot from '../components/ListLabelDot';

import '../styles/stateSection/categoryCard.scss'

const categoryOptions = ["County Subdivision", "City", "Census Track"];

function CategoryCard({title, color}) {

    const [selectedItems, setSelectedItems] = useState([]);

    const selectedOnChange=(event, values) =>{
        console.log("Change category: " + JSON.stringify(values));
        setSelectedItems(values);
    }

    const handleChipDelete = (label, key) => {
        console.log("Delete chip: "+ label + " " + key);

        setSelectedItems((selectedItems)=> selectedItems.filter((item, index) => index !== key));
    }

    const labelChips = selectedItems.map((item, index) => <Chip label={item} key={index} onDelete={()=> handleChipDelete(item, index)} />);

    return (
        <Card className="inner-card" id="category-card">
            <Stack>
                <Stack className="flex-center" direction="row">
                    <ListLabelDot title={title} color={color}/>
                    <Autocomplete
                        multiple
                        size="small"
                        options={categoryOptions}
                        filterSelectedOptions
                        disableListWrap
                        onChange={selectedOnChange}
                        value={selectedItems}
                        ListboxProps={{size:'lg', color:'primary'}}
                        renderInput={(params) => (
                            <Box ref={params.InputProps.ref}>
                                <Button 
                                    {...params.inputProps}
                                    variant="contained"
                                    endIcon={<DownArrow />}
                                    sx={{background: 'var(--blue-2, #00AEEF)'}}
                                >
                                    Add
                                </Button>
                            </Box>
                            
                        )}
                    />
                </Stack>
                <Stack className="wrap" direction="row" spacing={1} useFlexGap>
                    {labelChips}
                </Stack>
            </Stack>
        </Card>
    )
}

export default CategoryCard