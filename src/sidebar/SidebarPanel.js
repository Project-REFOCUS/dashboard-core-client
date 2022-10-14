import React from 'react';
import { useMemo, useState } from 'react';
import { Collapse, Form, ListGroup } from 'react-bootstrap';
import { PlusLg, Trash } from 'react-bootstrap-icons';
import classnames from 'classnames';
import SidebarPanelDropdown from './SidebarPanelDropdown';

const isDuplicate = id => id.endsWith('duplicated');
const objectifyMap = dropdownMap =>
    [...dropdownMap].reduce((object, [key, value]) => {
        object[key] = value;
        return object;
    }, {});



const SidebarPanel = ({ active, color, disabled, label, dropdowns, id, name, selectedValues, setActive, onQueryUpdate, canDuplicate, isDuplicated, onDuplicate, onRemove }) => {
    selectedValues && window.console.log(selectedValues);
    const [dropdownMap, setDropdownMap] = useState(useMemo(() => dropdowns.reduce((map, dropdown) => map.set(dropdown.id, dropdown.value), new Map()), [dropdowns]));
    const onDropdownChange = ({ dropdown, value }) => {
        const updatedDropdownMap = new Map(dropdownMap);
        updatedDropdownMap.set(dropdown.id, value);

        setDropdownMap(updatedDropdownMap);

        typeof dropdown.onChange === 'function' && dropdown.onChange(updatedDropdownMap);
        onQueryUpdate({ id, name, label, ...objectifyMap(updatedDropdownMap), color })
    };
    return (
        <ListGroup.Item
            variant={active ? 'light' : 'secondary'}
            className={classnames({ [`border-left-${color}`]: active })}
        >
            <div className="d-flex justify-content-between align-items-center">
                <div
                    className="d-flex flex-column flex-grow-1 pointer"
                    onClick={() => !disabled && !isDuplicated && setActive(id)}
                >
                    <div className="d-flex flex-row flex-grow-1 pointer justify-content-between align-items-center">
                        <Form.Check>
                            <Form.Check.Input
                                id={`${id}-form-check-input`}
                                className="pointer"
                                type="checkbox"
                                checked={active}
                                disabled={disabled}
                                readOnly
                            />
                            <Form.Check.Label className={classnames('pointer', { 'text-blue-3': active })}>
                                {label}
                            </Form.Check.Label>
                        </Form.Check>
                        {active && canDuplicate && (
                            <PlusLg
                                className="icon-style-1 pointer"
                                onClick={e => {
                                    onDuplicate(id);
                                    e.stopPropagation();
                                }}
                            />
                        )}
                        {active && isDuplicate(id) && (
                            <Trash
                                onClick={e => {
                                    onRemove(id);
                                    e.stopPropagation();
                                }}
                            />
                        )}
                    </div>
                    <Collapse in={active}>
                        <div>
                            {dropdowns?.map(dropdown => (
                                <SidebarPanelDropdown
                                    key={dropdown.id}
                                    dropdown={dropdown}
                                    dropdownMap={dropdownMap}
                                    onDropdownChange={onDropdownChange}
                                    value={selectedValues?.[dropdown.id] ?? null}
                                />
                            ))}
                        </div>
                    </Collapse>
                </div>
            </div>
        </ListGroup.Item>
    )
};

export default SidebarPanel;
