import React from 'react';
import { useEffect, useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
    Typography,
    TextField,
    Autocomplete
} from '@mui/material';
import { getIndicatorCategories , getListOfStates } from '../common/services';
import { isArrayEmpty } from '../common/utils';

import '../styles/sidebar/sidebar.scss';
import InfoCard from './InfoCard';

const CardSX = {
    backgroundColor: 'rgba(223, 230, 233, 0.20)',
    borderRadius: 4
};

const InputLabelSX = {
    paddingBottom: '4px'
};

//use a flatmap and a set to get the values

//if the state is already selected but the category changes
//i want to show it but cross it out

//it doesnt refresh the filters

//@param reason — One of "createOption", "selectOption", "removeOption", "blur" or "clear".
const Sidebar = () => {
    const [fullCategoryList, setFullCategoryList] = useState([]);
    const [filteredCategoryList, setFilteredCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    
    const [fullStateList, setFullStateList] = useState([]);
    const [filteredStateList, setFilteredStateList] = useState([]);
    const [selectedStates, setSelectedStates] = useState([]);

    useEffect(() => {
        getIndicatorCategories().then(categories => setFullCategoryList(categories));
        getListOfStates().then(states => setFullStateList(states));
    }, []);

    const handleCategoryChange = (event, category, reason) => {
        console.log("Change Category reason: "+ reason +" category: " + JSON.stringify(category));

        if(reason == 'selectOption'){
            setSelectedCategory(category);

            let subjectStates = findStatesWithCategory(category.name, fullStateList);
            setFilteredStateList(subjectStates);
            setSelectedStates(findStatesWithCategory(category.name, selectedStates));
            
        }else if(reason == "removeOption" || reason === "clear"){
            setSelectedCategory('');
            setFilteredStateList([]);
        }
    }

    const findStatesWithCategory = (name, states) => {
        return states.filter( states => states.categories.find(category => category.name == name))
    }

    const handleStateChange = (event, states, reason) => {
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
                        <Stack spacing={3} columns={1}>
                            <Stack>
                                <FormControl variant="standard" size="small" fullWidth>
                                    <Typography sx={InputLabelSX}>Category</Typography>
                                    <Autocomplete
                                        select
                                        size="small"
                                        id="category-selector"
                                        options={filteredCategoryList.length === 0 ? fullCategoryList : filteredCategoryList}
                                        value={selectedCategory ? selectedCategory : null}
                                        getOptionLabel={(category) => category.name}
                                        key={(category) => category.id}
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
                                        getOptionLabel={(state) => state.name}
                                        key={(state) => state.id}
                                        filterSelectedOptions
                                        disableListWrap
                                        value={selectedStates}
                                        onChange={handleStateChange}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                placeholder={selectedStates.length == 0 ? "Select..." : null}
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
