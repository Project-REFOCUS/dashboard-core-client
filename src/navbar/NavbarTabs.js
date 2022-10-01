import React from 'react';
import { useRef, useState } from 'react';
import { PlusLg } from 'react-bootstrap-icons';
import NavbarTabsItem from './NavbarTabsItem';

import './NavbarTabs.scss';

const NavbarTabs = ({ onTabAdded, onTabSelected, onTabRemoved }) => {
    const [tabList, setTabList] = useState([{ label: 'Dashboard', value: 'dashboard' }]);
    const [activeTab, setActiveTab] = useState('dashboard');
    const tabIdReference = useRef(0)
    const addTab = () => {
        tabIdReference.current += 1;
        const newTab = { label: 'Dashboard ' + tabIdReference.current, value: 'dashboard' + tabIdReference.current };
        setTabList(originalTabList => (originalTabList.concat([newTab])));
        setActiveTab('dashboard' + tabIdReference.current);
        onTabAdded(newTab.value);
    };
    const removeTab = value => {
        setTabList(list => list.filter(tab => tab.value !== value));
        onTabRemoved(value);
    };
    return (
        <div id="tabNavigation">
            <ul className="nav nav-tabs" role="tabList">
                {tabList.map(tab => (
                    <NavbarTabsItem
                        key={tab.value}
                        active={activeTab === tab.value}
                        label={tab.label}
                        value={tab.value}
                        showClose={tabList.length > 1}
                        onSelect={() => {
                            setActiveTab(tab.value)
                            onTabSelected(tab.value);
                        }}
                        onRemove={() => removeTab(tab.value)}
                    />
                ))}
                <li className="nav-item" role="presentation" onClick={addTab}>
                    <button type="button" className="nav-link" role="tab">
                        <PlusLg className="icon-style-1" />
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default NavbarTabs;
