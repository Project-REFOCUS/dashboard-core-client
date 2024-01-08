import React, { useState } from 'react'
import { FormControl, Typography, Autocomplete, TextField } from '@mui/material'
import '../styles/components/multiInput.scss'

function MultiInput({title, itemList, handleOnChange, keyFunc=(item) => item.id, labelFunc=(item) => item.name, size="small"}) {

    const [isEmpty, setIsEmpty] = useState(true);

    const handleInputChange = (event, values, reason) => {
        setIsEmpty(!values.length > 0);
        handleOnChange(values);
    }

    return (
        <FormControl variant="standard" size={"small"} fullWidth>
            <Typography className="input-title">{title}</Typography>
            <Autocomplete
                multiple
                limitTags={2}
                size={size}
                options={itemList}
                getOptionLabel={labelFunc}
                key={keyFunc}
                filterSelectedOptions
                disableListWrap
                onChange={handleOnChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder={ isEmpty ? "Select..." : null}
                        variant="outlined"
                    />
                )}
            />
        </FormControl>
    )
}

export default MultiInput