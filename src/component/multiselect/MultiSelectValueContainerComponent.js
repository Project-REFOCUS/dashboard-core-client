import React from 'react';
import { components } from 'react-select';

const MultiSelectValueContainerComponent = ({ children, selectProps, ...props }) => (
    <components.ValueContainer {...props} selectProps={selectProps}>
        {children}
    </components.ValueContainer>
);

export default MultiSelectValueContainerComponent;
