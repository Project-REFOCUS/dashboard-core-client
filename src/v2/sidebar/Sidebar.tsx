import React from 'react';
import { useEffect, useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    FormControl,
    Stack,
    Typography,
    TextField,
    Autocomplete,
    AutocompleteChangeReason
} from '@mui/material';
import { getIndicatorCategories , getListOfStatesWithCategory } from '../common/services';
import InfoCard from './InfoCard';
import { Category, GeoCategory, Geography } from '../common/types';
import { observer } from 'mobx-react';
import AppStore from '../stores/AppStore';

import '../styles/sidebar/sidebar.scss';


const InputLabelSX = {
    paddingBottom: '4px'
};

const textFieldSX = {
    color: 'var(--Gray-140, #2A3039)',

    fontFamily: 'Avenir',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 350,
    lineHeight: '16px',
};

//@param reason — One of "createOption", "selectOption", "removeOption", "blur" or "clear".

interface Props {
    handleCategoryOnChange : (category : Category | null) => void,
    // handleGeographyOnChange : (geography : Geography[]) => void
}

const Sidebar : React.FC<Props> = observer(({handleCategoryOnChange}: Props) => {
    const [fullCategoryList, setFullCategoryList] = useState<Category[]>([]);
    const [filteredCategoryList, setFilteredCategoryList] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    
    const [fullStateList, setFullStateList] = useState<GeoCategory[]>([]);
    const [filteredStateList, setFilteredStateList] = useState<GeoCategory[]>([]);
    const [selectedStates, setSelectedStates] = useState<GeoCategory[]>([]);

    useEffect(() => {
        getIndicatorCategories().then((categories : Category[]) => setFullCategoryList(categories));
        getListOfStatesWithCategory().then((states : GeoCategory[]) => setFullStateList(states));
    }, []);

    const categoryChange = (event: React.SyntheticEvent<Element, Event>, category: Category | null, reason: AutocompleteChangeReason) => {
        console.log("Change Category reason: "+ reason +" category: " + JSON.stringify(category));

        if(reason == 'selectOption' && category !== null){
            setSelectedCategory((prevCategory) => {
                setFilteredStateList(filterGeoCatWithCategoryName(category.name, fullStateList));
                const subjectStates = filterGeoCatWithCategoryName(category.name, selectedStates);
                setSelectedStates(subjectStates);
                AppStore.setStates(subjectStates.map((state) => state.geography));
                return category
            });

        }else if(reason == "removeOption" || reason == "clear"){
            setSelectedCategory(null);
            setFilteredStateList([]);
        }

        handleCategoryOnChange(category);
    }

    const filterGeoCatWithCategoryName = (name: string, states : GeoCategory[]) => {
        return states.filter(geoCategory => geoCategory.categories.find(category => category.name == name))
    }

    const stateChange = (event: React.SyntheticEvent<Element, Event>, states: GeoCategory[], reason: AutocompleteChangeReason) => {
        console.log("Change State reason: "+ reason +" states: " + JSON.stringify(states));
        
        setSelectedStates(states); 
        AppStore.setStates(states.map((state) => state.geography));

        let subjectCategories = states.flatMap(state => state.categories);
        let unqiqueCategorySet = new Set(subjectCategories);
        setFilteredCategoryList(Array.from(unqiqueCategorySet));
    }

    return (
        <Box className="main-sidebar-panel">
            <Stack spacing={1}>
                <Card className='inner-card' elevation={0}>
                    <CardContent>
                        <Stack spacing={2}>
                            <Box>
                                <FormControl variant="standard" size="small" fullWidth>
                                    <Typography sx={InputLabelSX}>Category</Typography>
                                    <Autocomplete
                                        // select
                                        size="small"
                                        id="category-selector"
                                        options={filteredCategoryList.length === 0 ? fullCategoryList : filteredCategoryList}
                                        value={selectedCategory ? selectedCategory : null}
                                        getOptionLabel={(category) => category.name}
                                        disableListWrap
                                        onChange={categoryChange}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                placeholder="Select..."
                                                variant="outlined"
                                                sx={textFieldSX}
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl variant="standard" size="small" fullWidth>
                                    <Typography sx={InputLabelSX}>State</Typography>
                                    <Autocomplete
                                        multiple
                                        limitTags={2}
                                        size="small"
                                        id="state-selector"
                                        options={filteredStateList.length === 0 ? fullStateList : filteredStateList}
                                        getOptionLabel={(geoCategory) => geoCategory.geography.name}
                                        filterSelectedOptions
                                        disableListWrap
                                        value={selectedStates}
                                        onChange={stateChange}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                placeholder={selectedStates.length == 0 ? "Select..." : undefined}
                                                variant="outlined"
                                                sx={textFieldSX}
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>
                { (selectedCategory === null || selectedStates.length === 0) ? <InfoCard/> : null }
            </Stack>
        </Box>
    );
});

export default Sidebar;