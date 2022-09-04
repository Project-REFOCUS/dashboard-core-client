import React from 'react';
import {Spinner, Stack} from 'react-bootstrap';

const DashboardGraphSpinner = () => (
    <Stack className="d-flex max-height justify-content-center align-items-center">
        <div className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" />
        </div>
    </Stack>
);

export default DashboardGraphSpinner;
