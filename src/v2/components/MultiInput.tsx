import React, { useState } from 'react';
import { FormControl, Typography, Autocomplete, TextField, AutocompleteChangeReason, styled, Chip, ChipProps, Theme } from '@mui/material';
import '../styles/components/multiInput.scss';

interface Props<T> {
    title: string;
    itemList: T[];
    handleOnChange: (values: T[], removedIndex: number, reason: AutocompleteChangeReason) => void;
    labelFunc?: (item: T) => string;
}

interface CustomChipProps extends ChipProps{
    label: string;
}

const textFieldSX = {
    color: 'var(--Gray-140, #2A3039)',
    fontFamily: 'Avenir',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 350,
    lineHeight: '16px',
};

const CustomStyledChip = styled(Chip)(({ theme }: { theme: Theme }) => ({
    // padding: theme.spacing(1),
    // height: '100%',
    // display: 'flex',
    // flexDirection: 'row',
    '& .MuiChip-label': {
        overflowWrap: 'break-word',
        whiteSpace: 'normal',
        textOverflow: 'clip'
    }
}));

const CustomChip: React.FC<CustomChipProps> = ({ label }) => {
    return <CustomStyledChip label={label} />;
};

function MultiInput<T>({title, itemList, handleOnChange, labelFunc=(item : any) => item.name}: Props<T>) {
    const [previousValues, setPreviousValues] = React.useState<T[]>([]);
    const [isEmpty, setIsEmpty] = useState(true);

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
                isOptionEqualToValue={(option, value) => JSON.stringify(option) === JSON.stringify(value)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder={ isEmpty ? "Select..." : undefined}
                        variant="outlined"
                        sx={textFieldSX}
                    />
                )}
                // renderTags={(value, getTagProps) =>
                //     value.map((option, index) => (
                //         <CustomChip
                //             label={labelFunc(option)}
                //             {...getTagProps({ index })}
                //         />
                //     )
                // )}
            />
        </FormControl>
    )
}

export default MultiInput