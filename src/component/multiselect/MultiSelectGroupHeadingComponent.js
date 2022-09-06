import React from 'react';
import { Form } from 'react-bootstrap';
import { components } from 'react-select';

const MultiSelectGroupHeadingComponent = props => {
    return (
        <>
            <components.GroupHeading {...props}>
                <div className="d-flex justify-content-between align-items-center">
                    <Form.Check>
                        <Form.Check.Input
                            id={props.data.label}
                            type="checkbox"
                            onChange={() => null}
                        />
                        <Form.Check.Label
                            htmlFor={props.data.label}
                            style={{ color: '#000000' }}
                        >
                            {props.children}
                        </Form.Check.Label>
                    </Form.Check>
                </div>
            </components.GroupHeading>
            <hr className="hr-style-1" />
        </>
    );
};

export default MultiSelectGroupHeadingComponent;
