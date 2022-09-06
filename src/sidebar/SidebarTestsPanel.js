import React from 'react';
import { useEffect, useState } from 'react';
import {Collapse, Form, ListGroup} from 'react-bootstrap';
import classnames from 'classnames';
import ReactSelect from 'react-select';
import MultiSelect from '../component/multiselect/MultiSelect';

import { ReactSelectStyle } from '../styles/common';
import {getListOfStates} from "../common/services";

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

const colorLabel = 'yellow';

const SidebarTestsPanel = ({ id, active, disabled, setActive, onQueryUpdate }) => {
    const [stateOptionsLoading, setStateOptionsLoading] = useState(true);
    const [stateOptions, setStateOptions] = useState([]);
    const [orientation, setOrientation] = useState([]);
    const [states, setStates] = useState(null);
    const onDataOrientationChange = dataOrientation => {
        onQueryUpdate({ name: id, orientation: dataOrientation?.value, colorLabel, states });
        setOrientation(dataOrientation);
    };
    const onStatesChange = updatedStates => {
        onQueryUpdate({ name: id, orientation: orientation?.value, colorLabel, states: updatedStates });
        setStates(updatedStates);
    };
    useEffect(() => {
        getListOfStates().then(options => {
            setStateOptions(options);
            setStateOptionsLoading(false);
        });
    }, []);
    return (
        <ListGroup.Item
            variant={active ? 'light' : 'secondary'}
            className={classnames({ [`border-left-${colorLabel}`]: active })}
        >
            <div className="d-flex justify-content-between align-items-center">
                <div
                    className="d-flex flex-column flex-grow-1 pointer"
                    onClick={() => {
                        if (!disabled) {
                            setOrientation(null);
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
                                    value={orientation}
                                />
                            </div>
                            <div className="mb-2" onClick={e => e.stopPropagation()}>
                                <Form.Label className="mb-0">Geography</Form.Label>
                                <MultiSelect
                                    isLoading={stateOptionsLoading}
                                    options={stateOptions}
                                    onChange={onStatesChange}
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
