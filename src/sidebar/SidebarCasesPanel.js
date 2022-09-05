import React from 'react';
import { useEffect, useState } from 'react';
import { Collapse, Form, ListGroup } from 'react-bootstrap';
import classnames from 'classnames';
import ReactSelect from 'react-select';

import { getRaceEthnicityCategories } from '../common/services';
import { ReactSelectStyle } from '../styles/common';

const dataOrientationOptions = [
    { label: 'Cumulative cases', value: 'cumulative' },
    { label: 'Daily cases', value: 'daily' },
    { label: 'Daily cases per 100k population', value: 'dailyPer100K' },
    { label: 'Daily cases 7-day rolling average', value: 'daily7DayAvg' },
    { label: 'Daily cases 14-day rolling average', value: 'daily14DayAvg' },
    { label: 'Percent change in daily cases', value: 'percentChangeInDaily' },
    { label: 'Percent change in daily cases over 7 days', value: 'percentChangeInDailyOver7' },
    { label: 'Percent change in daily cases over 14 days', value: 'percentChangeInDailyOver14' }
];

const colorLabel = 'hot-pink';

const SidebarCasesPanel = ({ active, disabled, id, setActive, onDataOrientationSelect }) => {
    const [raceCategoryLoading, setRaceCategoryLoading] = useState(true);
    const [raceCategoryOptions, setRaceCategoryOptions] = useState([]);
    const [orientation, setOrientation] = useState(null);
    const onDataOrientationChange = dataOrientation => {
        onDataOrientationSelect({ name: id, orientation: dataOrientation?.value, colorLabel });
        setOrientation(dataOrientation);
    };
    useEffect(() => {
        getRaceEthnicityCategories().then(options => {
            setRaceCategoryOptions(options);
            setRaceCategoryLoading(false);
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
                            id="cases-form-check-input"
                            className="pointer"
                            type="checkbox"
                            checked={active}
                            disabled={disabled}
                            readOnly
                        />
                        <Form.Check.Label className={classnames('pointer', { 'text-blue-3': active })}>
                            Cases
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
                        </div>
                    </Collapse>
                </div>
            </div>
        </ListGroup.Item>
    );
};

export default SidebarCasesPanel;
