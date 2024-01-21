import React, { useState }from 'react';
import Header from './v2/header/Header';
import Sidebar from './v2/sidebar/Sidebar';
import StateMap from './v2/components/StateMap';
import ChartCard from './v2/chart/ChartCard';
import { Box, Card, CardContent, Container, Stack, Typography } from '@mui/material';
import StateSection from './v2/stateSection/StateSection';

import './v2/styles/index.scss';
import { Category, Geography } from './v2/common/types';
import { GeographyEnum } from './v2/common/enum';
import { observer, useLocalStore } from 'mobx-react';
import appStore from './v2/stores/appStore';
// import AppStore from './v2/stores/AppStore';

const CardSX = {
    width: '100%',
    border: 1,
    borderColor: 'rgba(178, 190, 195, .2)',
    borderRadius: 2,
    backgroundColor: 'rgba(223, 230, 233, .2)'
};

//global state ideas

// what states are selected
// expand event 
// what graph is expanded

//global states
//initial: state map & info card
//  what states:[counties[cities[zipcodes ... ]]] are selected
//analyze: statviewcard
//expand: popup ? maybe we dont want to reload the iframe. We may just expand it where it is 
//so there would be no need for global state
//would the expand be a new tab or just cover the page?
//consider if there are multiple items, then we can have the popup height just cover the screen size
//make sure to include aria

const newYork : Geography = {id: "2", name: "New York", shortName: "NY", type: GeographyEnum.STATE };

const App: React.FC = observer(() => {

    const [ appCategory, setAppCategory ] = useState<Category | null>(null);
    const [ appStates, setAppStates ] = useState<Geography[]>([]);

    const stateSections = (appStates.length > 0) && appCategory !== null ? 
        appStates.map((state: Geography) => <StateSection state={state}/>) : null;

    return (
        <Box>
            <Header />
            <Container>
                <Stack spacing={1}>
                    <Box>
                        <Card elevation={0} sx={CardSX}>
                            <CardContent sx={{display: 'flex'}}>
                                <Sidebar handleCategoryOnChange={setAppCategory} handleGeographyOnChange={setAppStates}/>
                                { (appStates.length > 0) && appCategory !== null ?
                                <ChartCard geographies={appStates} titleBreadcrumbs={[[appCategory?.name], appStates.map((state: Geography)=> state.name)]} handleExpandOnClick={()=>{}} />
                                :
                                <StateMap/>
                                }
                            </CardContent>
                        </Card>
                    </Box>
                    {stateSections}
                </Stack>
                <Box id="chart-popup">
                    {/**Try to do this inside of the Statistic Card */}
                </Box>
            </Container>
        </Box>
    );
});

export default App;