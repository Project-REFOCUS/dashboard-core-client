import React, { useState } from 'react';
import { FormControl, Typography, Autocomplete, TextField, AutocompleteChangeReason } from '@mui/material';
import '../styles/components/multiInput.scss';

interface Props<T> {
    title: string;
    itemList: T[];
    handleOnChange: (values: T[], removedIndex: number, reason: AutocompleteChangeReason) => void;
    labelFunc?: (item: T) => string;
    size?: string;
}

function MultiInput<T>({title, itemList, handleOnChange, labelFunc=(item : any) => item.name, size="small"}: Props<T>) {
    const [previousValues, setPreviousValues] = React.useState<T[]>([]);
    const [isEmpty, setIsEmpty] = useState(true);

    // const handleInputChange = (event: React.SyntheticEvent<Element, Event>, values: any[], reason: AutocompleteChangeReason) => {
    //     console.log("Change Counties reason: "+ reason +" counties: " + JSON.stringify(values));
    //     setIsEmpty(values.length === 0);
    //     handleOnChange(values);
    // }

    const handleInputChange = (event: React.SyntheticEvent<Element, Event>, values: T[], reason: AutocompleteChangeReason) => {
        console.log("Change Counties reason: " + reason + " counties: " + JSON.stringify(values));
        
        // find removed element index
        const removedElementIndex = previousValues.findIndex((prevValue) => !values.includes(prevValue));
        
        setPreviousValues([...values]);

        setIsEmpty(values.length === 0);
        handleOnChange(values, removedElementIndex, reason);
    }

    return (
        <FormControl variant="standard" size="small" fullWidth>
            <Typography className="input-title">{title}</Typography>
            <Autocomplete
                multiple
                limitTags={2}
                size="small"
                options={itemList}
                getOptionLabel={labelFunc}
                filterSelectedOptions
                disableListWrap
                onChange={handleInputChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder={ isEmpty ? "Select..." : undefined}
                        variant="outlined"
                    />
                )}
            />
        </FormControl>
    )
}

export default MultiInput