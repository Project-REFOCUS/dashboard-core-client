import React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Collapse, Form, ListGroup } from 'react-bootstrap';
import classnames from 'classnames';
import ReactSelect from 'react-select';

import { getRaceEthnicityCategories } from '../common/services';
import { ReactSelectStyle } from '../styles/common';

const subCategoryOptions = [
    { label: 'Distributed vaccines', value: 'distributed', category: 'distributed' },
    { label: 'Administered vaccines', value: 'administered', category: 'administered' },
    { label: 'Administered One dose vaccines', value: 'administeredOneDose', category: 'one dose administered' },
    { label: 'Administered Two dose vaccines', value: 'administeredTwoDose', category: 'two doses administered' }
];

const getDataOrientationOptions = ({ category }) => [
    { label: `Cumulative ${category} vaccines`, value: 'cumulative' },
    { label: `Daily ${category} vaccines`, value: 'daily' },
    { label: `Daily ${category} vaccines per 100K population`, value: 'dailyPer100K' },
    { label: `Daily ${category} vaccines 7-day rolling average`, value: 'daily7DayAvg' },
    { label: `Daily ${category} vaccines 14-day rolling average`, value: 'daily14DayAvg' },
    { label: `Percent change in daily ${category} vaccines`, value: 'percentChangeInDaily' },
    { label: `Percent change in daily ${category} over 7 days`, value: 'percentChangeInDailyOver7' },
    { label: `Percent change in daily ${category} over 14 days`, value: 'percentChangeInDailyOver14' }
].concat(
    ['one dose administered', 'two dose administered'].includes(category)
        ? [{ label: `Percent of populaion with ${category} vaccines`, value: 'percentOfPopulation'}]
        : []
);

const SidebarVaccinationsPanel = ({ id, active, disabled, setActive }) => {
    const [raceCategoryLoading, setRaceCategoryLoading] = useState(true);
    const [raceCategoryOptions, setRaceCategoryOptions] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState(subCategoryOptions[0]);
    const [selectedDataOrientation, setSelectedDataOrientation] =
        useState(useMemo(() => getDataOrientationOptions(selectedSubCategory), []));
    useEffect(() => {
        getRaceEthnicityCategories().then(options => {
            setRaceCategoryOptions(options);
            setRaceCategoryLoading(false);
        });
    }, []);
    return (
        <ListGroup.Item
            variant={active ? 'light' : 'secondary'}
            className={classnames({ 'border-left-green-1': active })}
        >
            <div className="d-flex justify-content-between align-items-center">
                <div
                    className="d-flex flex-column flex-grow-1 pointer"
                    onClick={() => !disabled && setActive(id)}
                >
                    <Form.Check>
                        <Form.Check.Input
                            id="vaccinations-form-check-input"
                            className="pointer"
                            type="checkbox"
                            checked={active}
                            disabled={disabled}
                            readOnly
                        />
                        <Form.Check.Label
                            className={classnames('pointer', {'text-blue-3': active })}
                        >
                            Vaccinations
                        </Form.Check.Label>
                    </Form.Check>
                    <Collapse in={active}>
                        <div>
                            <div className="mb-2" onClick={e => e.stopPropagation()}>
                                <Form.Label className="mb-0">Sub-category</Form.Label>
                                <ReactSelect
                                    options={subCategoryOptions}
                                    styles={ReactSelectStyle}
                                    onChange={subCategory => {
                                        setSelectedSubCategory(subCategory);
                                        setSelectedDataOrientation(getDataOrientationOptions(subCategory)[0]);
                                    }}
                                    value={selectedSubCategory}
                                />
                            </div>
                            <div className="mb-2" onClick={e => e.stopPropagation()}>
                                <Form.Label className="mb-0">Data orientation</Form.Label>
                                <ReactSelect
                                    options={getDataOrientationOptions(selectedSubCategory)}
                                    styles={ReactSelectStyle}
                                    onChange={dataOrientation => setSelectedDataOrientation(dataOrientation)}
                                    value={selectedDataOrientation}
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
    )
};

export default SidebarVaccinationsPanel;
