import React from 'react';
import { useEffect, useState } from 'react';
import { Col, Container } from 'react-bootstrap'
import Header from './header/Header';
import TopNavbar from './navbar/TopNavBar';
import NavbarTabs from './navbar/NavbarTabs';
import Toolbar from './toolbar/Toolbar';
import Sidebar from './sidebar/Sidebar';
import Dashboard from './dashboard/Dashboard';
import { getDataFromQuery } from './common/services';

import './App.scss';

const initializeDashboardData = () => ({ query: { period: null, categories: [] }, data: {} });
const initialDashboardTabId = 'dashboard';
const initialDashboardData = [[initialDashboardTabId, initializeDashboardData()]];

const noCategoryWithEmptyValue = categories =>
    categories.length && categories.every(category => category.orientation && category.name);

const shouldRefreshData = query =>
    query && noCategoryWithEmptyValue(query.categories) && query.period;

const App = () => {
    const [dashboardData, setDashboardData] = useState(new Map(initialDashboardData));
    const [dashboardTabId, setDashboardTabId] = useState(initialDashboardTabId);
    const [dashboardIsLoading, setDashboardIsLoading] = useState(false);

    const { leftAxis, rightAxis } = dashboardData.get(dashboardTabId).data;
    const onCategoriesUpdate = (category, shouldRemove) => {
        const newDashboardData = new Map(dashboardData);
        const dashboardTabData = { ...newDashboardData.get(dashboardTabId)};
        const { query } = dashboardTabData;
        query.categories = query.categories || [];
        query.categories = query.categories
            .filter(c => c.id !== category.id)
            .concat(shouldRemove ? [] : [category]);
        newDashboardData.set(dashboardTabId, dashboardTabData);
        setDashboardData(newDashboardData);
    };
    const onPeriodSelect = period => {
        const newV2DashboardData = new Map(dashboardData);
        const dashboardTabData = newV2DashboardData.has(dashboardTabId)
            ? {...newV2DashboardData.get(dashboardTabId)}
            : initializeDashboardData();
        const { query } = dashboardTabData;
        query.period = {...period};
        newV2DashboardData.set(dashboardTabId, dashboardTabData);
        setDashboardData(newV2DashboardData);
    };
    const onTabAdded = id => {
        setDashboardTabId(id);
        const newDashboardData = new Map(dashboardData);
        newDashboardData.set(id, initializeDashboardData());
        setDashboardData(newDashboardData);
    };
    const onTabSelected = selectedTabId => {
        setDashboardTabId(selectedTabId);
    };
    const onTabRemoved = removedTabId => {
        const newDashboardData = new Map(dashboardData);
        newDashboardData.delete(removedTabId);
        setDashboardData(newDashboardData);
    };
    const {query: activeQuery } = dashboardData.get(dashboardTabId);
    useEffect(() => {
        if (shouldRefreshData(activeQuery)) {
            setDashboardIsLoading(true);
            window.console.log(activeQuery);
            getDataFromQuery(activeQuery)
                .then(results => {
                    const [leftAxisQuery, rightAxisQuery] = activeQuery.categories;
                    const [leftAxisData, rightAxisData] = results;

                    const newDashboardData = new Map(dashboardData);
                    const { data } = {...newDashboardData.get(dashboardTabId)};
                    data.leftAxis = { data: leftAxisData, query: leftAxisQuery };
                    data.rightAxis = { data: rightAxisData, query: rightAxisQuery };

                    setDashboardData(newDashboardData);
                    setDashboardIsLoading(false);
                });
        }
        else if (!activeQuery.categories?.length) {
            const newDashboardData = new Map(dashboardData);
            const { data } = {...newDashboardData.get(dashboardTabId)};
            data.leftAxis = {};
            data.rightAxis = {};

            setDashboardData(newDashboardData);
        }

    }, [activeQuery.period, activeQuery.categories]);
    return (
        <div className="max-height">
            <Header />
            <TopNavbar />
            <Container fluid className="d-flex g-lg-0 bg-white position-relative main-container">
                <Container fluid className="d-flex flex-column g-lg-0 bg-white">
                    <NavbarTabs onTabAdded={onTabAdded} onTabSelected={onTabSelected} onTabRemoved={onTabRemoved} />
                    <Toolbar onPeriodSelect={onPeriodSelect} selectedPeriod={activeQuery.period} />
                    <div className="d-flex flex-row max-height overflow-hidden">
                        <Col xl={2} lg={3} md={4} xs={12} className="g-0 max-height overflow-scroll">
                            <Sidebar onCategoriesUpdate={onCategoriesUpdate} selectedCategories={activeQuery.categories} />
                        </Col>
                        <Col className="max-height mb-sm-4 mb-4" xl={10} lg={9}>
                            <Dashboard isLoading={dashboardIsLoading} leftAxis={leftAxis} rightAxis={rightAxis} />
                        </Col>
                    </div>
                </Container>
            </Container>
        </div>
    );
};

export default App;
