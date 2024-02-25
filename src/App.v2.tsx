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
import AppStore from './v2/stores/AppStore';

const CardSX = {
    width: '100%',
    border: 1,
    borderColor: 'rgba(178, 190, 195, .2)',
    borderRadius: 2,
    backgroundColor: 'rgba(223, 230, 233, .2)'
};


const App: React.FC = observer(() => {

    // const [ appCategory, setAppCategory ] = useState<Category | null>(null);

    const stateSections = (AppStore.states.length > 0) && AppStore.category !== null ? 
        AppStore.states.map((state: Geography, index: number) => <StateSection state={state} key={index}/>) : null;
        
    return (
        <Box>
            <Header/>
            <Container>
                <Stack spacing={1}>
                    <Box>
                        <Card elevation={0} sx={CardSX}>
                            <CardContent>
                                <Stack direction='row' spacing={1}>
                                    {/* <Sidebar handleCategoryOnChange={setAppCategory} /> */}
                                    <Sidebar/>
                                    {/* { (AppStore.states.length > 0) && appCategory !== null ?
                                    <ChartCard geographies={AppStore.states} titleBreadcrumbs={[[appCategory?.name], AppStore.states.map((state: Geography)=> state.name)]} /> */}
                                    { (AppStore.states.length > 0) && AppStore.category !== null ?
                                    <ChartCard geographies={AppStore.states} titleBreadcrumbs={[[AppStore.category?.name], AppStore.states.map((state: Geography)=> state.name)]} />
                                    :
                                    <StateMap/>
                                    }
                                </Stack>
                                
                            </CardContent>
                        </Card>
                    </Box>
                    {stateSections}
                </Stack>
            </Container>
        </Box>
    );
});

export default App;