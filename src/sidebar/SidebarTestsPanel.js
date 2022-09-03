import React from 'react';
import { useState } from 'react';
import {Collapse, Form, ListGroup} from 'react-bootstrap';
import classnames from 'classnames';
import ReactSelect from 'react-select';

import { ReactSelectStyle } from '../styles/common';

const dataOrientationOptions = [
    { label: 'Cumulative tests', value: 'cumulative' },
    { label: 'Daily tests', value: 'daily' },
    { label: 'Daily tests per 100K population', value: 'dailyPer100K' },
    { label: 'Daily tests 7-day rolling average', value: 'daily7DayAvg' },
    { label: 'Daily tests 14-day rolling average', value: 'daily14DayAvg' },
    { label: 'Percent change in daily tests', value: 'percentChangeInDaily' },
    { label: 'Percent change in daily tests over 7 days', value: 'percentChangeInDailyOver7' },
    { label: 'Percent change in daily tests over 14 days', value: 'percentChangeInDailyOver14' },
    { label: 'Positivity rate', value: 'positivityRate' },
    { label: 'Positivity rate 7-day rolling average', value: 'positivityRate7DayAvg' },
    { label: 'Positivity rate 14-day rolling average', value: 'positivityRate14DayAvg' },
    { label: 'Percent change in positivity rate', value: 'percentChangeInPositivityRate' },
    { label: 'Percent change in positivity rate over 7 days', value: 'percentChangeInPositivityRateOver7' },
    { label: 'Percent change in positivity rate over 14 days', value: 'percentChangeInPositivityRateOver14' }
];

const SidebarTestsPanel = ({ id, active, disabled, setActive, onDataOrientationSelect }) => {
    const [orientation, setOrientation] = useState([]);
    const onDataOrientationChange = dataOrientation => {
        onDataOrientationSelect({ name: id, orientation: dataOrientation?.value });
        setOrientation(dataOrientation);
    }
    return (
        <ListGroup.Item
            variant={active ? 'light' : 'secondary'}
            className={classnames({ 'border-left-yellow': active })}
        >
            <div className="d-flex justify-content-between align-items-center">
                <div
                    className="d-flex flex-column flex-grow-1 pointer"
                    onClick={() => {
                        if (!disabled) {
                            onDataOrientationChange(orientation);
                            setActive(id);
                        }
                    }}
                >
                    <Form.Check>
                        <Form.Check.Input
                            id="tests-form-check-input"
                            className="pointer"
                            type="checkbox"
                            checked={active}
                            disabled={disabled}
                            readOnly
                        />
                        <Form.Check.Label
                            className={classnames('pointer', { 'text-blue-3': active })}
                        >
                            Tests
                        </Form.Check.Label>
                    </Form.Check>
                    <Collapse in={active}>
                        <div>
                            <div className="mb-2" onClick={e => e.stopPropagation()}>
                                <Form.Label className="mb-0">Data orientation</Form.Label>
                                <ReactSelect
                                    options={dataOrientationOptions}
                                    styles={ReactSelectStyle}
                                    onChange={onDataOrientationChange}
                                />
                            </div>
                        </div>
                    </Collapse>
                </div>
            </div>
        </ListGroup.Item>
    );
};

export default SidebarTestsPanel;
