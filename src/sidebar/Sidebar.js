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
    CASES: 'panel-cases',
    DEATHS: 'panel-deaths',
    TESTS: 'panel-tests',
    VACCINATIONS: 'panel-vaccinations',
    POLICE_SHOOTINGS: 'panel-police-shootings',
    EVICTIONS: 'panel-evictions',
    GOOGLE_MOBILITY: 'panel-google-mobility',
    COVID_BEHIND_BARS: 'panel-covid-behind-bars',
    TWITTER: 'panel-twitter'
};

const isDisabledPanel = (activeSet, id) => activeSet.size === 2 && !activeSet.has(id);

const Sidebar = () => {
    const [activePanelSet, setActivePanelSet] = useState(new Set());
    const toggleActivePanel = id => {
        const updatedActivePanelSet = new Set(activePanelSet);
        if (updatedActivePanelSet.has(id)) {
            updatedActivePanelSet.delete(id);
        }
        else {
            updatedActivePanelSet.add(id);
        }
        setActivePanelSet(updatedActivePanelSet);
    };
    return (
        <ListGroup id="sidebarNavigation" className="sidebar-navigation" key="List-Group">
            <ListGroup.Item key="label-1" className="category-info-select-max-list-group-item">
                Select max. 2 categories
            </ListGroup.Item>
            <SidebarCasesPanel
                id={PANELS.CASES}
                active={activePanelSet.has(PANELS.CASES)}
                disabled={isDisabledPanel(activePanelSet, PANELS.CASES)}
                setActive={toggleActivePanel}
            />
            <SidebarDeathsPanel
                id={PANELS.DEATHS}
                active={activePanelSet.has(PANELS.DEATHS)}
                disabled={isDisabledPanel(activePanelSet, PANELS.DEATHS)}
                setActive={toggleActivePanel}
            />
            <SidebarTestsPanel
                id={PANELS.TESTS}
                active={activePanelSet.has(PANELS.TESTS)}
                disabled={isDisabledPanel(activePanelSet, PANELS.TESTS)}
                setActive={toggleActivePanel}
            />
            <SidebarVaccinationsPanel
                id={PANELS.VACCINATIONS}
                active={activePanelSet.has(PANELS.VACCINATIONS)}
                disabled={isDisabledPanel(activePanelSet, PANELS.VACCINATIONS)}
                setActive={toggleActivePanel}
            />
            <SidebarPoliceShootingsPanel
                id={PANELS.POLICE_SHOOTINGS}
                active={activePanelSet.has(PANELS.POLICE_SHOOTINGS)}
                disabled={isDisabledPanel(activePanelSet, PANELS.POLICE_SHOOTINGS)}
                setActive={toggleActivePanel}
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
