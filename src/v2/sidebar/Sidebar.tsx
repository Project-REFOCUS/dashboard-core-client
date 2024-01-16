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

import '../styles/sidebar/sidebar.scss';

const InputLabelSX = {
    paddingBottom: '4px'
};

//use a flatmap and a set to get the values

//if the state is already selected but the category changes
//i want to show it but cross it out

//it doesnt refresh the filters

//@param reason — One of "createOption", "selectOption", "removeOption", "blur" or "clear".
const Sidebar : React.FC = () => {
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

    const handleCategoryChange = (event: React.SyntheticEvent<Element, Event>, category: Category | null, reason: AutocompleteChangeReason) => {
        console.log("Change Category reason: "+ reason +" category: " + JSON.stringify(category));

        if(reason == 'selectOption' && category !== null){
            setSelectedCategory(category);

            let subjectStates = filterGeoCatWithCategoryName(category.name, fullStateList);
            setFilteredStateList(subjectStates);
            setSelectedStates(filterGeoCatWithCategoryName(category.name, selectedStates));
            
        }else if(reason == "removeOption" || reason === "clear"){
            setSelectedCategory(null);
            setFilteredStateList([]);
        }
    }

    const filterGeoCatWithCategoryName = (name: string, states : GeoCategory[]) => {
        return states.filter( geoCategory => geoCategory.categories.find(category => category.name == name))
    }

    const handleStateChange = (event: React.SyntheticEvent<Element, Event>, states: GeoCategory[], reason: AutocompleteChangeReason) => {
        console.log("Change State reason: "+ reason +" states: " + JSON.stringify(states));
        
        setSelectedStates(states);

        let subjectCategories = states.flatMap(state => state.categories);
        let unqiqueCategorySet = new Set(subjectCategories);
        setFilteredCategoryList(Array.from(unqiqueCategorySet));
    }

    return (
        <Box className="main-sidebar-panel">
            <Stack spacing={1}>
                <Card className='inner-card' elevation={0}>
                    <CardContent>
                        <Stack spacing={3}>
                            <Stack>
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
                                        onChange={handleCategoryChange}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                placeholder="Select..."
                                                variant="outlined"
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Stack>
                            <Stack>
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
                                        onChange={handleStateChange}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                placeholder={selectedStates.length == 0 ? "Select..." : undefined}
                                                variant="outlined"
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
                { !selectedCategory && selectedStates.length == 0 ? <InfoCard/> : null }
            </Stack>
        </Box>
    );
};

export default Sidebar;
