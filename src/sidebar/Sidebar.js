import React from 'react';
import { useState } from 'react';
import { ListGroup } from 'react-bootstrap';

import SidebarCasesPanel from './SidebarCasesPanel';
import SidebarDeathsPanel from './SidebarDeathsPanel';
import SidebarTestsPanel from './SidebarTestsPanel';
import SidebarVaccinationsPanel from './SidebarVaccinationsPanel';
import SidebarPoliceShootingsPanel from './SidebarPoliceShootingsPanel';
/*
import SidebarEvictionsPanel from './SidebarEvictionsPanel';
import SidebarGoogleMobilityPanel from './SidebarGoogleMobilityPanel';
import SidebarCovidBehindBarsPanel from './SidebarCovidBehindBarsPanel';
import SidebarTwitterPanel from './SidebarTwitterPanel';
*/

import './Sidebar.scss';

const PANELS = {
    CASES: 'cases',
    DEATHS: 'deaths',
    TESTS: 'tests',
    VACCINATIONS: 'vaccinations',
    POLICE_SHOOTINGS: 'police-shootings',
    EVICTIONS: 'evictions',
    GOOGLE_MOBILITY: 'google-mobility',
    COVID_BEHIND_BARS: 'covid-behind-bars',
    TWITTER: 'twitter'
};

const isDisabledPanel = (activeSet, id) => activeSet.size === 2 && !activeSet.has(id);

const Sidebar = ({ onCategoryUpdate, onCategoriesUpdate }) => {
    const [activePanelSet, setActivePanelSet] = useState(new Set());
    const toggleActivePanel = id => {
        const updatedActivePanelSet = new Set(activePanelSet);
        const exists = updatedActivePanelSet.has(id);
        const method = exists ? 'delete' : 'add';
        updatedActivePanelSet[method](id);

        onCategoriesUpdate({ name: id }, exists);
        setActivePanelSet(updatedActivePanelSet);
    };
    return (
        <ListGroup id="sidebarNavigation" className="sidebar-navigation" key="List-Group">
            <ListGroup.Item
                key="label-1"
                variant="secondary"
                className="category-info-select-max-list-group-item"
            >
                Select max. 2 categories
            </ListGroup.Item>
            <SidebarCasesPanel
                id={PANELS.CASES}
                active={activePanelSet.has(PANELS.CASES)}
                disabled={isDisabledPanel(activePanelSet, PANELS.CASES)}
                setActive={toggleActivePanel}
                onQueryUpdate={onCategoriesUpdate}
            />
            <SidebarDeathsPanel
                id={PANELS.DEATHS}
                active={activePanelSet.has(PANELS.DEATHS)}
                disabled={isDisabledPanel(activePanelSet, PANELS.DEATHS)}
                setActive={toggleActivePanel}
                onQueryUpdate={onCategoriesUpdate}
            />
            <SidebarTestsPanel
                id={PANELS.TESTS}
                active={activePanelSet.has(PANELS.TESTS)}
                disabled={isDisabledPanel(activePanelSet, PANELS.TESTS)}
                setActive={toggleActivePanel}
                onQueryUpdate={onCategoriesUpdate}
            />
            <SidebarVaccinationsPanel
                id={PANELS.VACCINATIONS}
                active={activePanelSet.has(PANELS.VACCINATIONS)}
                disabled={isDisabledPanel(activePanelSet, PANELS.VACCINATIONS)}
                setActive={toggleActivePanel}
                onQueryUpdate={onCategoriesUpdate}
            />
            <SidebarPoliceShootingsPanel
                id={PANELS.POLICE_SHOOTINGS}
                active={activePanelSet.has(PANELS.POLICE_SHOOTINGS)}
                disabled={isDisabledPanel(activePanelSet, PANELS.POLICE_SHOOTINGS)}
                setActive={toggleActivePanel}
                onDataOrientationSelect={onCategoryUpdate}
            />
            {/* *}
            <SidebarEvictionsPanel
                id={PANELS.EVICTIONS}
                active={activePanelSet.has(PANELS.EVICTIONS)}
                disabled={isDisabledPanel(activePanelSet, PANELS.EVICTIONS)}
                setActive={toggleActivePanel}
            />
            <SidebarGoogleMobilityPanel
                id={PANELS.GOOGLE_MOBILITY}
                active={activePanelSet.has(PANELS.GOOGLE_MOBILITY)}
                disabled={isDisabledPanel(activePanelSet, PANELS.GOOGLE_MOBILITY)}
                setActive={toggleActivePanel}
            />
            <SidebarCovidBehindBarsPanel
                id={PANELS.COVID_BEHIND_BARS}
                active={activePanelSet.has(PANELS.COVID_BEHIND_BARS)}
                disabled={isDisabledPanel(activePanelSet, PANELS.COVID_BEHIND_BARS)}
                setActive={toggleActivePanel}
            />
            <SidebarTwitterPanel
                id={PANELS.TWITTER}
                active={activePanelSet.has(PANELS.TWITTER)}
                disabled={isDisabledPanel(activePanelSet, PANELS.TWITTER)}
                setActive={toggleActivePanel}
            />
            {/* */}
        </ListGroup>
    );
};

export default Sidebar;
