import React from 'react';
import { Form, ListGroup } from 'react-bootstrap';
import classnames from 'classnames';

const SidebarEvictionsPanel = ({ id, active, disabled, setActive }) => {
    return (
        <ListGroup.Item
            variant={active ? 'light' : 'secondary'}
            className={classnames({ 'border-left-red': active })}
        >
            <div className="d-flex justify-content-between align-items-center">
                <div
                    className="d-flex flex-column flex-grow-1 pointer"
                    onClick={() => !disabled && setActive(id)}
                >
                    <Form.Check>
                        <Form.Check.Input
                            id="evictions-form-check-input"
                            className="pointer"
                            type="checkbox"
                            checked={active}
                            disabled={disabled}
                            readOnly
                        />
                        <Form.Check.Label
                            className={classnames('pointer', { 'text-blue-3': active })}
                        >
                            Evictions
                        </Form.Check.Label>
                    </Form.Check>
                </div>
            </div>
        </ListGroup.Item>
    );
};

export default SidebarEvictionsPanel;
