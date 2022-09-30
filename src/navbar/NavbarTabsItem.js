import React from 'react';
import { useId, useState } from 'react';
import classnames from 'classnames';
import { XLg } from 'react-bootstrap-icons';
import '../component/customStyles.scss';

const NavbarTabsItem = ({ label, active, showClose, onSelect, onRemove }) => {
    const [mouseEntered, setMouseEntered] = useState(false);
    return (
        <li className="nav-item position-relative" role="presentation">
            <button
                role="tab"
                type="button"
                id={`tab-${useId()}`}
                className={classnames('nav-link', { active, closeable: showClose })}
                onMouseEnter={() => setMouseEntered(true)}
                onMouseLeave={() => setMouseEntered(false)}
                onClick={onSelect}
            >
                {label}
            </button>
            {showClose && (
                <button
                    type="button"
                    role="tab"
                    className={classnames('nav-link close-button', { active: active || mouseEntered })}
                    onClick={onRemove}
                >
                    <XLg className="remove-tag-icon-2" />
                </button>
            )}
        </li>
    );
};

export default NavbarTabsItem;
