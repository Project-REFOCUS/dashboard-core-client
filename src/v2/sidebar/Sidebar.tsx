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
import { trimLowerCase } from '../common/utils';


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
    const [filteredCategoryList, setFilteredCategoryList] = useState<Category[] | null>(null);

    const [fullStateList, setFullStateList] = useState<Geography[]>([]);
    const [filteredStateList, setFilteredStateList] = useState<Geography[] | null>(null);

    const [ isLoading, setIsLoading ] = useState<boolean>(true);

    useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search);
        const siteParameter = queryParameters.get('site');

        Promise.all([
            fetchIndicatorCategories(),
            fetchAllStates()
        ]).then(([categories, states]) => {
            setFullCategoryList(categories);
            // console.log("FULL STATE LIST: " + JSON.stringify(states));
            setFullStateList(states);
    
            if(siteParameter){
                const preSelectedState = states.find(state => state.name === siteParameter);
                if(preSelectedState){
                    stateChange([preSelectedState],'selectOption');
                }
            }
            setIsLoading(false);
        });
    }, []);

    const categoryChange = (event: React.SyntheticEvent<Element, Event>, category: Category | null, reason: AutocompleteChangeReason) => {
        if(reason == 'selectOption' && category !== null){
            console.log("Category is now: ", JSON.stringify(category));
            AppStore.getMapStates(category).then(states => {
                // console.log("THESE ARE the FILTERED States: " + JSON.stringify(states));
                setFilteredStateList(states);
                const statesWithNewIds = filterSelectedStates(category.id, Array.from(AppStore.states));
                AppStore.setCategory(category, statesWithNewIds);
            });
            
        }else if(reason == "removeOption" || reason == "clear"){
            setFilteredStateList(null);
            AppStore.setCategory(null);
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

        // console.log("Searching for states: " + JSON.stringify(states));
        const subjectStates : Geography[] = states
            .filter( state => {
                const foundIndex = foundArray?.findIndex((item, index) => {
                    if(trimLowerCase(item.name) === trimLowerCase(state.name)){
                        // console.log(`Compare at index{${index}} {${state.name}}: item.name = {${item.name}}, boolean result: ${trimLowerCase(item.name) === trimLowerCase(state.name)}`);
                    }
                    return trimLowerCase(item.name) === trimLowerCase(state.name);
                });

                if(foundIndex === undefined || foundIndex === -1){
                    console.error("Error pairing selected state " + JSON.stringify(state) + " during category change event");
                    return false;
                }else{
                    // console.log("Found state: " + state.name + " in filterList[index" + foundIndex + "]");
                    foundIndexes.push(foundIndex);
                    return true;
                }
            }).map((state, index) => {
                if(foundArray){
                    const foundState : Geography = foundArray[foundIndexes[index]];
                    if(!foundState || trimLowerCase(foundState.name) !== trimLowerCase(state.name)){
                        console.error("Error pairing selected state " + JSON.stringify(state) + " with the new id during category change event");
                    }else{
                        return foundState;
                    }
                }
                return state;
            });

        // console.log("Here are the transformed states: ", JSON.stringify(subjectStates));
        return subjectStates ? subjectStates : [];
    }

    const stateChange = (states: Geography[], reason: AutocompleteChangeReason) => {
        // console.log("Change State reason: "+ reason +" states: " + JSON.stringify(states));
        AppStore.setStates(states);

        if((reason === "removeOption" || reason === "clear") && states.length === 0){
            setFilteredCategoryList(null);
        }else{
            AppStore.getMapCategories(states).then(categories => setFilteredCategoryList(categories));
        }
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
                                        options={filteredCategoryList || fullCategoryList}
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
                                        options={filteredStateList || fullStateList}
                                        getOptionLabel={(state) => state.name}
                                        filterSelectedOptions
                                        disableListWrap
                                        value={AppStore.states}
                                        onChange={(e,value,reason) => stateChange(value, reason)}
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