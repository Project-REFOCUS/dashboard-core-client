import React from 'react';
import { useId } from 'react';
import classnames from 'classnames';
import { XLg } from 'react-bootstrap-icons';
import '../component/customStyles.scss';

const NavbarTabsItem = ({ label, active, showClose, onSelect, onRemove }) => (
    <li className="nav-item position-relative" role="presentation">
        <button
            role="tab"
            type="button"
            id={`tab-${useId()}`}
            className={classnames('nav-link', { active })}
            onClick={onSelect}
        >
            {label}
        </button>
        {showClose && (
            <button type="button" role="tab" className="nav-link" onClick={onRemove}>
                <XLg className="remove-tag-icon-2" />
            </button>
        )}
    </li>
);

export default NavbarTabsItem;
