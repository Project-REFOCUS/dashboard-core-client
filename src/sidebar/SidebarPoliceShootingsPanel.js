import React from 'react';
import { useEffect, useState } from 'react';
import { Collapse, Form, ListGroup } from 'react-bootstrap';
import classnames from 'classnames';
import ReactSelect from 'react-select';

import { getRaceEthnicityCategories } from '../common/services';
import { ReactSelectStyle } from '../styles/common';

const dataOrientationOptions = [
    { label: 'Cumulative shootings', value: 'cumulative' },
    { label: 'Daily shootings', value: 'daily' }
];

const SidebarPoliceShootingsPanel = ({ id, active, disabled, setActive }) => {
    const [raceCategoryLoading, setRaceCategoryLoading] = useState(true);
    const [raceCategoryOptions, setRaceCategoryOptions] = useState([]);
    useEffect(() => {
        getRaceEthnicityCategories().then(options => {
            setRaceCategoryOptions(options);
            setRaceCategoryLoading(false);
        });
    }, []);
    return (
        <ListGroup.Item
            variant={active ? 'light' : 'secondary'}
            className={classnames({ 'border-left-orange': active })}
        >
            <div className="d-flex justify-content-between align-items-center">
                <div
                    className="d-flex flex-column flex-grow-1 pointer"
                    onClick={() => !disabled && setActive(id)}
                >
                    <Form.Check>
                        <Form.Check.Input
                            id="police-shootings-form-check-input"
                            className="pointer"
                            type="checkbox"
                            checked={active}
                            disabled={disabled}
                            readOnly
                        />
                        <Form.Check.Label
                            className={classnames('pointer', {'text-blue-3': active })}
                        >
                            Police shootings
                        </Form.Check.Label>
                    </Form.Check>
                    <Collapse in={active}>
                        <div>
                            <div className="mb-2" onClick={e => e.stopPropagation()}>
                                <Form.Label className="mb-0">Data orientation</Form.Label>
                                <ReactSelect
                                    options={dataOrientationOptions}
                                    styles={ReactSelectStyle}
                                />
                            </div>
                            <div className="mb-2" onClick={e => e.stopPropagation()}>
                                <Form.Label className="mb-0">Race</Form.Label>
                                <ReactSelect
                                    isLoading={raceCategoryLoading}
                                    options={raceCategoryOptions}
                                    styles={ReactSelectStyle}
                                />
                            </div>
                        </div>
                    </Collapse>
                </div>
            </div>
        </ListGroup.Item>
    );
};

export default SidebarPoliceShootingsPanel;
