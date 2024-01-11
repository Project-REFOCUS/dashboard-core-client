import React from 'react'
import { 
    Autocomplete,
    Box,
    Button
} from '@mui/material'
import { DownArrow } from '../components/CustomIcons';

const MultiButton = ({listItems, handleOnChange, value}) => {
    return (
        <Autocomplete
            multiple
            size="small"
            options={listItems}
            filterSelectedOptions
            disableListWrap
            onChange={handleOnChange}
            value={value}
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
    )
}

export default MultiButton