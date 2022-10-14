import React from 'react';
import { Form } from 'react-bootstrap';
import SingleSelect from '../component/select/SingleSelect';
import MultiSelect from '../component/multiselect/MultiSelect';

const isDisabled = (disabled, dropdownMap) => typeof disabled === 'function' ? disabled(dropdownMap) : disabled;
const getOptions = (options, disabled, dropdownMap) => !isDisabled(disabled, dropdownMap) && typeof options === 'function' ? options(dropdownMap) : options || [];

const SidebarPanelDropdown = ({ dropdown, dropdownMap, onDropdownChange, value }) => {
    return (
        <div className="mb-2" onClick={e => e.stopPropagation()}>
            <Form.Label className="mb-0">{dropdown.label}</Form.Label>
            {dropdown.isMulti ? (
                <MultiSelect
                    options={getOptions(dropdown.options, dropdown.disabled, dropdownMap)}
                    optionsPromise={dropdown.optionsPromise}
                    onChange={value => onDropdownChange({ dropdown, value })}
                    disabled={isDisabled(dropdown.disabled, dropdownMap)}
                    value={value}
                />
            ) : (
                <SingleSelect
                    options={getOptions(dropdown.options, dropdown.disabled, dropdownMap)}
                    optionsPromise={dropdown.optionsPromise}
                    onChange={value => onDropdownChange({ dropdown, value })}
                    disabled={isDisabled(dropdown.disabled, dropdownMap)}
                    value={value}
                />
            )}
        </div>
    );
};

export default SidebarPanelDropdown;
