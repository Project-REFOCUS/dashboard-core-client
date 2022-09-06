import React from 'react';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { components } from 'react-select';

const onMouseDown = e => {
    e.target.focus();
    e.stopPropagation();
};

const MultiSelectMenuListComponent = ({ selectProps, ...props }) => {
    const { onSearchInputChange, onSearchInputFocus, onSearchInputBlur } = selectProps;
    const [value, setValue] = useState('');
    const ariaAttributes = {
        'aria-autocomplete': 'list',
        'aria-label': selectProps['aria-label'],
        'aria-labelledby': selectProps['aria-labelledby']
    };
    const detectSpaceBar = e => {
        if (e.keyCode === 32) {
            setValue(value => value + ' ');
        }
    };
    return (
        <>
            <Form.Group className="px-2 py-1">
                <Form.Control
                    type="text"
                    id="multi-select-search"
                    autoCorrect="off"
                    autoComplete="off"
                    spellCheck="false"
                    placeholder="Search..."
                    value={value}
                    onMouseDown={onMouseDown}
                    onKeyDown={detectSpaceBar}
                    onFocus={onSearchInputFocus}
                    onBlur={onSearchInputBlur}
                    onChange={e => {
                        setValue(e.target.value);
                        onSearchInputChange(e.target.value);
                    }}
                    {...ariaAttributes}
                />
            </Form.Group>
            <components.MenuList {...props} selectProps={{...selectProps, inputValue: value}}>
                {props.children}
            </components.MenuList>
        </>
    );
};

export default MultiSelectMenuListComponent;
