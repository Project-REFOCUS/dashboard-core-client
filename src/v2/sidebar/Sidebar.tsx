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
import { fetchAllStates, fetchIndicatorCategories } from '../common/services';
import InfoCard from './InfoCard';
import { Category, Geography } from '../common/types';
import { observer } from 'mobx-react';
import AppStore from '../stores/AppStore';

import '../styles/sidebar/sidebar.scss';


const inputLabelSX = {
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

interface Props {}

const Sidebar : React.FC<Props> = observer(() => {
    const [fullCategoryList, setFullCategoryList] = useState<Category[]>([]);
    const [filteredCategoryList, setFilteredCategoryList] = useState<Category[]>([]);

    const [fullStateList, setFullStateList] = useState<Geography[]>([]);
    const [filteredStateList, setFilteredStateList] = useState<Geography[]>([]);

    const [ isLoading, setIsLoading ] = useState<boolean>(true);

    useEffect(() => {
        Promise.all([
            fetchIndicatorCategories(),
            fetchAllStates()
        ]).then(([categories, states]) => {
            setFullCategoryList(categories);
            setFullStateList(states);
            setIsLoading(false);
        });
    }, []);

    const categoryChange = (event: React.SyntheticEvent<Element, Event>, category: Category | null, reason: AutocompleteChangeReason) => {
        if(reason == 'selectOption' && category !== null){
            AppStore.setCategory(category);
            AppStore.getMapStates(category).then(states => {
                setFilteredStateList(states);
                filterSelectedStates(category.id, Array.from(AppStore.states));
            });
            
        }else if(reason == "removeOption" || reason == "clear"){
            AppStore.setCategory(null);
            setFilteredStateList([]);
        }
    }

    // checks to see if any of the selected state tokens should be removed
    // matches the selected state tokens with the new id's corresponding to the category change
    const filterSelectedStates = (categoryId: string, states : Geography[]) => {

        if(states.length === 0){
            return;
        }

        const foundIndexes : number[] = [];
        const foundArray : Geography[] | undefined = AppStore.categoryStateMap.get(categoryId);

        if(!foundArray){
            console.error("Error finding categoryStatemap for category id: " + categoryId);
        }

        const subjectStates = states
            .filter(state => {
                const foundIndex = foundArray?.findIndex((item)=> item.name === state.name);
                if(foundIndex && foundIndex !== -1){
                    foundIndexes.push(foundIndex);
                }
                return foundIndex !== -1;
            }).map((state, index) => {

                if(foundArray){
                    const foundState : Geography = foundArray[foundIndexes[index]];
                    const newId = foundState.id;
                    if(!foundState){
                        console.error("Error pairing selected states with the new id during category change event");
                    }else{
                        return foundState;
                    }
                }
                return state;
            });

        AppStore.setStates([...subjectStates]);
    }

    const stateChange = (event: React.SyntheticEvent<Element, Event>, states: Geography[], reason: AutocompleteChangeReason) => {
        console.log("Change State reason: "+ reason +" states: " + JSON.stringify(states));
        
        AppStore.setStates(states);
        AppStore.getMapCategories(states).then(categories => setFilteredCategoryList(categories));
    }

    return (
        <Box className="main-sidebar-panel">
            <Stack spacing={1}>
                <Card className='inner-card' elevation={0}>
                    <CardContent>
                        <Stack spacing={2}>
                            <Box>
                                <FormControl variant="standard" size="small" fullWidth>
                                    <Typography sx={inputLabelSX}>Category</Typography>
                                    <Autocomplete
                                        className={isLoading? "input-loading" : ""}
                                        size="small"
                                        id="category-selector"
                                        options={filteredCategoryList.length === 0 ? fullCategoryList : filteredCategoryList}
                                        value={AppStore.category ? AppStore.category : null}
                                        getOptionLabel={(category) => category.name}
                                        disableListWrap
                                        onChange={categoryChange}
                                        isOptionEqualToValue={(option, value) => option.name === value.name}
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
                                    <Typography sx={inputLabelSX}>State</Typography>
                                    <Autocomplete
                                        className={isLoading? "input-loading" : ""}
                                        multiple
                                        limitTags={2}
                                        size="small"
                                        id="state-selector"
                                        options={filteredStateList.length === 0 ? fullStateList : filteredStateList}
                                        getOptionLabel={(state) => state.name}
                                        filterSelectedOptions
                                        disableListWrap
                                        value={AppStore.states}
                                        onChange={stateChange}
                                        isOptionEqualToValue={(option, value) => option.name === value.name}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                placeholder={AppStore.states.length === 0 ? "Select..." : undefined}
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
                { (AppStore.category === null || AppStore.states.length === 0) ? <InfoCard/> : null }
            </Stack>
        </Box>
    );
});

export default Sidebar;