import React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { ListGroup } from 'react-bootstrap';

import SidebarPanel from './SidebarPanel';

import configuration, { duplicateId } from './configuration';

import './Sidebar.scss';

const isDisabledPanel = (activeSet, id) => activeSet.size === 2 && !activeSet.has(id);
const isDuplicatedPanel = (activeSet, id) => activeSet.size === 2 && (id.endsWith('-duplicated') || activeSet.has(`${id}-duplicated`));

const Sidebar = ({ onCategoriesUpdate, selectedCategories }) => {
    const selectedCategoriesMap = useMemo(
        () => selectedCategories?.reduce((map, category) => map.set(category.id, category), new Map()),
        [selectedCategories]
    );
    const [activePanelSet, setActivePanelSet] = useState(new Set());
    const [panels, setPanels] = useState(configuration);
    const toggleActivePanel = id => {
        const updatedActivePanelSet = new Set(activePanelSet);
        const exists = updatedActivePanelSet.has(id);
        const method = exists ? 'delete' : 'add';
        updatedActivePanelSet[method](id);

        onCategoriesUpdate({ id }, exists);
        setActivePanelSet(updatedActivePanelSet);
    };
    const onDuplicate = (id, duplicated) => {
        toggleActivePanel(duplicateId(id));
        setPanels(panels =>
            panels.flatMap(panel => panel.id === id ? [panel, duplicated(panel)] : [panel])
        );
    };
    const onRemove = id => {
        toggleActivePanel(id);
        setPanels(panels => panels.filter(panel => panel.id !== id));
    };
    useEffect(() => {
        const newPanels = configuration.flatMap(config => {
            return selectedCategoriesMap.has(`${config.id}-duplicated`) ? [config, config.duplicated(config)] : [config];
        });
        setPanels(newPanels);
    }, [selectedCategoriesMap]);
    return (
        <ListGroup id="sidebarNavigation" className="sidebar-navigation" key="List-Group">
            <ListGroup.Item
                key="label-1"
                variant="secondary"
                className="category-info-select-max-list-group-item"
            >
                Select max. 2 categories
            </ListGroup.Item>
            {panels.map(panel => (
                <SidebarPanel
                    key={panel.id}
                    active={selectedCategoriesMap.has(panel.id)}
                    disabled={isDisabledPanel(selectedCategoriesMap, panel.id)}
                    duplicated={panel.duplicated}
                    canDuplicate={panel.duplicated && selectedCategoriesMap.size < 2}
                    onDuplicate={id => onDuplicate(id, panel.duplicated)}
                    onRemove={onRemove}
                    isDuplicated={isDuplicatedPanel(selectedCategoriesMap, panel.id)}
                    setActive={toggleActivePanel}
                    onQueryUpdate={onCategoriesUpdate}
                    selectedValues={selectedCategoriesMap.get(panel.id)}
                    {...panel}
                />
            ))}
        </ListGroup>
    );
};

export default Sidebar;
