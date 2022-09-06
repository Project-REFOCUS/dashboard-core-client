import React from 'react';
import { components } from 'react-select';
import { XLg } from 'react-bootstrap-icons';

const MultiSelectValueRemoveComponent = props => (
    <components.MultiValueRemove {...props}>
        <XLg className="remove-tag-icon-1" />
    </components.MultiValueRemove>
);

export default MultiSelectValueRemoveComponent;
