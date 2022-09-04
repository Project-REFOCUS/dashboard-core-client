import React from 'react';
import { Image, Stack } from 'react-bootstrap';
import EmptyDataImg from '../empty_data_img.png';

const DashboardEmpty = () => (
    <Stack className="d-flex max-height justify-content-center align-items-center">
        <div className="d-flex justify-content-center align-items-center ellipse-style-1">
            <Image height="50px" src={EmptyDataImg} alt="empty-data" className="m-auto d-block" />
        </div>
        <p className="mt-2 paragraph-style-1">Select a category to start</p>
    </Stack>
);

export default DashboardEmpty;
