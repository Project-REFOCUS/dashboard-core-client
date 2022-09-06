import React from 'react';
import { Form } from 'react-bootstrap';
import { components } from 'react-select';

const MultiSelectOptionComponent = ({ selectProps, ...props }) => {
    // TODO: Highlight search term in bolded characters
    return (
        <components.Option {...props} selectProps={selectProps}>
            <div className="d-flex justify-content-between align-items-center">
                <Form.Check>
                    <Form.Check.Input
                        id={props.label}
                        type="checkbox"
                        checked={props.isSelected}
                        onChange={() => null}
                    />
                    <Form.Check.Label
                        htmlFor={props.label}
                        styles={{ color: '#000000' }}
                    >
                        {props.label}
                    </Form.Check.Label>
                </Form.Check>
            </div>
        </components.Option>
    );
};

export default MultiSelectOptionComponent;
