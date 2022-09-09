import React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Collapse, Form, ListGroup } from 'react-bootstrap';
import { PlusLg, Trash } from 'react-bootstrap-icons';
import classnames from 'classnames';
import SingleSelect from '../component/select/SingleSelect';
import MultiSelect from '../component/multiselect/MultiSelect';

const shouldInvokeOptions = (options, disabled, dropdownMap) =>
    typeof options === 'function' && (!disabled || (typeof disabled === 'function' && !disabled(dropdownMap)));

const isDisabled = (disabled, dropdownMap) => typeof disabled === 'function' ? disabled(dropdownMap) : disabled;
const getOptions = (options, disabled, dropdownMap) => !isDisabled(disabled, dropdownMap) && typeof options === 'function' ? options(dropdownMap) : options || []
const objectifyMap = dropdownMap =>
    [...dropdownMap].reduce((object, [key, value]) => {
        object[key] = value;
        return object;
    }, {});



const SidebarPanel = ({ active, color, disabled, label, dropdowns, id, name, setActive, onQueryUpdate, isDuplicated, onDuplicate, onRemove, duplicated }) => {
    const [dropdownMap, setDropdownMap] = useState(useMemo(() => dropdowns.reduce((map, dropdown) => map.set(dropdown.id, dropdown.value), new Map()), [dropdowns]));
    const onDropdownChange = ({ dropdown, value }) => {
        const updatedDropdownMap = new Map(dropdownMap);
        updatedDropdownMap.set(dropdown.id, value);

        setDropdownMap(updatedDropdownMap);

        typeof dropdown.onChange === 'function' && dropdown.onChange(updatedDropdownMap);
        onQueryUpdate({ id, name, ...objectifyMap(updatedDropdownMap), color })
    };
    return (
        <ListGroup.Item
            variant={active ? 'light' : 'secondary'}
            className={classnames({ [`border-left-${color}`]: active })}
        >
            <div className="d-flex justify-content-between align-items-center">
                <div
                    className="d-flex flex-column flex-grow-1 pointer"
                    onClick={() => !disabled && setActive(id)}
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
                        {active && !isDuplicated && typeof duplicated === 'function' && (
                            <PlusLg
                                className="icon-style-1 pointer"
                                onClick={e => {
                                    onDuplicate(id, duplicated);
                                    e.stopPropagation();
                                }}
                            />
                        )}
                        {active && isDuplicated && (
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
                                <div key={dropdown.id} className="mb-2" onClick={e => e.stopPropagation()}>
                                    <Form.Label className="mb-0">{dropdown.label}</Form.Label>
                                    {dropdown.isMulti ? (
                                        <MultiSelect
                                            options={shouldInvokeOptions(dropdown.options, dropdown.dis) ? dropdown.options(dropdownMap) : dropdown.options}
                                            optionsPromise={dropdown.optionsPromise}
                                            onChange={value => onDropdownChange({ dropdown, value})}
                                            value={dropdownMap.get(dropdown.id)}
                                        />
                                    ) : (
                                        <SingleSelect
                                            options={getOptions(dropdown.options, dropdown.disabled, dropdownMap)}
                                            optionsPromise={dropdown.optionsPromise}
                                            onChange={value => onDropdownChange({dropdown, value})}
                                            disabled={isDisabled(dropdown.disabled, dropdownMap)}
                                            value={dropdownMap.get(dropdown.id)}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </Collapse>
                </div>
            </div>
        </ListGroup.Item>
    )
};

export default SidebarPanel;
