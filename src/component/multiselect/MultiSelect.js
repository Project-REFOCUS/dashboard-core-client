import React from 'react';
import { useEffect, useState } from 'react';
import ReactSelect from 'react-select';
import MultiSelectStyle from './MultiSelectStyle';

import MultiSelectMenuListComponent from './MultiSelectMenuListComponent';
import MultiSelectOptionComponent from './MultiSelectOptionComponent';
import MultiSelectValueRemoveComponent from './MultiSelectValueRemoveComponent';
import MultiSelectValueContainerComponent from './MultiSelectValueContainerComponent';
import MultiSelectDropdownIndicatorComponent from './MultiSelectDropdownIndicatorComponent';
import MultiSelectGroupHeadingComponent from './MultiSelectGroupHeadingComponent';

const ignoreSpaceBar = e => e.keyCode === 32 && e.preventDefault();

const MultiSelect = ({ options: optionsProp, optionsPromise, onChange }) => {
    const [values, setValues] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState(optionsPromise ? [] : optionsProp);
    const [inputValue, setInputValue] = useState('');
    const [additionalProps, setAdditionalProps] = useState({});
    useEffect(() => {
        if (typeof optionsPromise === 'function') {
            setIsLoading(true);
            optionsPromise().then(results => {
                setOptions(results);
                setIsLoading(false);
            });
        }
    }, [optionsPromise])
    return (
        <ReactSelect
            options={options}
            isLoading={isLoading}
            closeMenuOnSelect={false}
            styles={MultiSelectStyle}
            backspaceRemovesValue={false}
            tabSelectsValue={false}
            hideSelectedOptions={false}
            isSearchable={false}
            maxMenuHeight={250}
            menuPosition="absolute"
            value={values}
            isMulti
            onKeyDown={ignoreSpaceBar}
            placeholder="All"
            onSearchInputChange={setInputValue}
            onSearchInputFocus={() => setAdditionalProps({ menuIsOpen: true })}
            onSearchInputBlur={() => setAdditionalProps({})}
            onChange={newValues => {
                setValues(newValues);
                onChange(newValues);
            }}
            components={{
                MenuList: MultiSelectMenuListComponent,
                Option: MultiSelectOptionComponent,
                MultiValueRemove: MultiSelectValueRemoveComponent,
                ValueContainer: MultiSelectValueContainerComponent,
                DropdownIndicator: MultiSelectDropdownIndicatorComponent,
                ClearIndicator: () => null,
                GroupHeading: MultiSelectGroupHeadingComponent
            }}
            inputValue={inputValue}
            {...additionalProps}
        />
    );
};

export default MultiSelect;
