import React from 'react';
import { useEffect, useState } from 'react';
import {Collapse, Form, ListGroup} from 'react-bootstrap';
import classnames from 'classnames';
import ReactSelect from 'react-select';
import MultiSelect from '../component/multiselect/MultiSelect';

import {getRaceEthnicityCategories, getListOfStates} from '../common/services';
import { ReactSelectStyle } from '../styles/common';

const dataOrientationOptions = [
    { label: 'Cumulative deaths', value: 'cumulative' },
    { label: 'Daily deaths', value: 'daily' },
    { label: 'Daily deaths per 100k population', value: 'dailyPer100K' },
    { label: 'Daily deaths 7-day rolling average', value: 'daily7DayAvg' },
    { label: 'Daily deaths 14-day rolling average', value: 'daily14DayAvg' },
    { label: 'Percent change in daily deaths', value: 'percentChangeInDaily' },
    { label: 'Percent change in daily deaths over 7 days', value: 'percentChangeInDailyOver7' },
    { label: 'Percent change in daily deaths over 14 days', value: 'percentChangeInDailyOver14' },
    { label: 'Mortality rate (death rate)', value: 'mortalityRate' },
    { label: 'Percent change in mortality rate', value: 'percentChangeInMortalityRate' },
    { label: 'Percent change in mortality rate over 7 days', value: 'percentChangeInMortalityRateOver7' },
    { label: 'Percent change in mortality rate over 14 days', value: 'percentChangeInMortalityRateOver14' }
];

const colorLabel = 'purple';

const SidebarDeathsPanel = ({ id, active, disabled, setActive, onQueryUpdate }) => {
    const [raceCategoryLoading, setRaceCategoryLoading] = useState(true);
    const [raceCategoryOptions, setRaceCategoryOptions] = useState([]);
    const [stateOptionsLoading, setStateOptionsLoading] = useState(true);
    const [stateOptions, setStateOptions] = useState([]);
    const [orientation, setOrientation] = useState(null);
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
        getRaceEthnicityCategories().then(options => {
            setRaceCategoryOptions(options);
            setRaceCategoryLoading(false);
        });
        getListOfStates().then(options => {
            setStateOptions(options);
            setStateOptionsLoading(false);
        })
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
                            id="deaths-form-check-input"
                            className="pointer"
                            type="checkbox"
                            checked={active}
                            disabled={disabled}
                            readOnly
                        />
                        <Form.Check.Label
                            className={classnames('pointer', { 'text-blue-3': active })}
                        >
                            Deaths
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
                                <Form.Label className="mb-0">Race</Form.Label>
                                <ReactSelect
                                    isLoading={raceCategoryLoading}
                                    options={raceCategoryOptions}
                                    styles={ReactSelectStyle}
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

export default SidebarDeathsPanel;
