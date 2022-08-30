import React from 'react';
import { Spinner } from 'react-bootstrap';

const DashboardGraphSpinner = ({ dimensions, yOffset = 0, xOffset = 0 }) => (
    <div
        style={{
            position: 'absolute',
            left: `${(dimensions.width / 2) + dimensions.x + xOffset}px`,
            top: `${(dimensions.height / 2) + dimensions.y + yOffset}px`
        }}
    >
        <Spinner animation="border" />
    </div>
);

export default DashboardGraphSpinner;
