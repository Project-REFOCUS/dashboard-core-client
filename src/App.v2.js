import React from 'react';
import Header from './v2/header/Header';
import Sidebar from './v2/sidebar/Sidebar';
import { Card, CardContent, Container } from '@mui/material';

import './v2/styles/index.scss';

const CardSX = {
    width: '100%',
    border: 1,
    borderColor: 'rgba(178, 190, 195, .2)',
    borderRadius: 2,
    backgroundColor: 'rgba(223, 230, 233, .2)'
};

const App = () => {
    return (
        <div>
            <Header />
            <Container>
                <Card elevation={0} sx={CardSX}>
                    <CardContent>
                        <Sidebar/>
                        <div style={{ width: '250px', padding: '8px' }}>
                            <Card elevation={0}>
                                <CardContent>
                                    Please select a category and state to drill down
                                    and access more detailed information about that state's
                                    data and statistics.
                                </CardContent>
                            </Card>
                        </div>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
};

export default App;
