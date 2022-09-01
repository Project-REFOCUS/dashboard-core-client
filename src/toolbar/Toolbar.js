import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import ReactSelect from 'react-select';

import { ReactSelectStyle } from '../styles/common';

const selectOptions = [
    { label: 'Last 7 days', value: 'last7Days' },
    { label: 'Last 30 days', value: 'last30Days' },
    { label: 'Last 90 days', value: 'last90Days' },
    { label: 'Last 365 days', value: 'last365Days' }
];

const Toolbar = ({ title }) => {
    return (
        <div className="container-fluid g-sm-0 ps-2 py-sm-2 py-md-2">
            <Row className="g-0 d-flex justify-content-md-center align-items-md-center flex-md-row">
                <Col xl={9} lg={8} md={7} xs={12} className="mb-sm-2">
                    <div className="text-wrap text-break">{title}</div>
                </Col>
                <Col xl={3} lg={4} md={5} xs={12} className="g-0">
                    <div className="pl-lg-0 pe-lg-2">
                        <Form.Label className="mb-0">Period:</Form.Label>
                        <ReactSelect
                            options={selectOptions}
                            styles={ReactSelectStyle}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    )
};

export default Toolbar;
