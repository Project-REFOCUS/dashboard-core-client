import React from 'react';
import { Form, ListGroup } from 'react-bootstrap';
import classnames from 'classnames';

const SidebarGoogleMobilityPanel = ({ id, active, disabled, setActive}) => {
    return (
        <ListGroup.Item
            variant={active ? 'light' : 'secondary'}
            className={classnames({ 'border-left-red': active })}
        >
            <div className="d-flex justify-content-between align-items-center">
                <div
                    className="d-flex justify-content-between flex-grow-1 pointer"
                    onClick={() => !disabled && setActive(id)}
                >
                    <Form.Check>
                        <Form.Check.Input
                            id="google-mobility-form-check-input"
                            className="pointer"
                            type="checkbox"
                            checked={active}
                            disabled={disabled}
                            readOnly
                        />
                        <Form.Check.Label
                            className={classnames('pointer', { 'text-blue-3': active })}
                        >
                            Google mobility
                        </Form.Check.Label>
                    </Form.Check>
                </div>
            </div>
        </ListGroup.Item>
    );
};

export default SidebarGoogleMobilityPanel;
