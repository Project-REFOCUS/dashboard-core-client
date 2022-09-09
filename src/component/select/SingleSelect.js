import React from 'react';
import { useEffect, useState } from 'react';
import ReactSelect from 'react-select';
import { ReactSelectStyle } from '../../styles/common';

const unwrap = unwrappable => typeof unwrappable === 'function' ? unwrappable() : unwrappable;

const SingleSelect = ({ options: optionsProp, value: valueProp, optionsPromise, onChange, disabled }) => {
    const [options, setOptions] = useState(optionsPromise || disabled ? [] : unwrap(optionsProp));
    const [value, setValue] = useState(valueProp || null);
    const onChangeEvent = updatedValue => {
        setValue(updatedValue);
        onChange(updatedValue);
    };
    useEffect(() => {
        if (typeof optionsPromise === 'function' && !disabled) {
            optionsPromise().then(results => setOptions(results));
        }
    }, [optionsPromise, disabled]);
    useEffect(() => {
        !disabled && setOptions(unwrap(optionsProp));
    }, [disabled, optionsProp]);
    useEffect(() => {
        !disabled && setValue(unwrap(valueProp));
    }, [disabled, valueProp]);

    return (
        <ReactSelect
            options={options}
            value={value}
            onChange={onChangeEvent}
            styles={ReactSelectStyle}
            isDisabled={disabled}
        />
    );
};

export default SingleSelect;
