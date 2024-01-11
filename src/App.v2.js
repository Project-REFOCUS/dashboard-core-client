import React from 'react';
import Header from './v2/header/Header';
import Sidebar from './v2/sidebar/Sidebar';
import StateMap from './v2/components/StateMap';
import ChartCard from './v2/chart/ChartCard';
import { Box, Card, CardContent, Container, Stack, Typography } from '@mui/material';

import './v2/styles/index.scss';
import StateSection from './v2/stateSection/StateSection';

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

const App = () => {
    return (
        <Box>
            <Header />
            <Container>
                <Stack spacing={1}>
                    <Box>
                        <Card elevation={0} sx={CardSX}>
                            <CardContent sx={{display: 'flex'}}>
                                <Sidebar/>
                                {/* <StateMap/> */}
                                <ChartCard titleBreadcrumbs={[["Covid Deaths"],["New York","Florida"]]} primary={true}/>
                            </CardContent>
                        </Card>
                    </Box>
                    <StateSection state={"New York"}/>
                </Stack>
                <Box id="chart-popup">
                    {/**Try to do this inside of the Statistic Card */}
                </Box>
            </Container>
        </Box>
    );
};

export default App;
