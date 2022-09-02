import React from 'react';
import { useEffect, useState } from 'react';
import { Col, Container } from 'react-bootstrap'
import Header from './header/Header';
import TopNavbar from './navbar/TopNavBar';
import NavbarTabs from './navbar/NavbarTabs';
import Toolbar from './toolbar/Toolbar';
import Sidebar from './sidebar/Sidebar';
import Dashboard from './dashboard/Dashboard';

import './App.scss';

const hasNonEmptyValue = object => {
    const keys = object ? Object.keys(object) : [];
    return keys.length && keys.some(key => object[key]);
};

const shouldRefreshData = query =>
    query && hasNonEmptyValue(query.category) && query.period;

const App = () => {
    const [dashboardIsLoading, setDashboardIsLoading] = useState(false);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const [dashboardData, setDashboardData] = useState([{ query: {} }]);
    const onCategoryUpdate = (category, shouldRemove) => {
        const newDashboardData = [...dashboardData];
        const { query: activeQuery } = newDashboardData[selectedTabIndex];
        activeQuery.category = activeQuery.category ? {...activeQuery.category} : {};
        if (shouldRemove) {
            delete activeQuery[category.name];
        }
        else {
            activeQuery.category[category.name] = category.orientation;
        }

        setDashboardData(newDashboardData);
    };
    const onPeriodSelect = period => {
        const newDashboardData = [...dashboardData];
        const currentDashboard = newDashboardData[selectedTabIndex];
        currentDashboard.query.period = {...period};
        setDashboardData(newDashboardData);
    };
    const activeQuery = dashboardData[selectedTabIndex].query;
    useEffect(() => {
        const currentDashboard = dashboardData[selectedTabIndex];
        const { query } = currentDashboard;
        if (shouldRefreshData(query)) {
            setDashboardIsLoading(true);
            window.setTimeout(() => {
                setDashboardIsLoading(false);
            }, 2000);
        }

    }, [activeQuery.period, activeQuery.category]);
    return (
        <div className="max-height">
            <Header />
            <TopNavbar />
            <Container fluid className="d-flex g-lg-0 bg-white position-relative main-container">
                <Container fluid className="d-flex flex-column g-lg-0 bg-white">
                    <NavbarTabs />
                    <Toolbar onPeriodSelect={onPeriodSelect} />
                    <div className="d-flex flex-row max-height overflow-hidden">
                        <Col xl={2} lg={3} md={4} xs={12} className="g-0 max-height overflow-scroll">
                            <Sidebar onCategoryUpdate={onCategoryUpdate} />
                        </Col>
                        <Col className="max-height mb-sm-4 mb-4" xl={10} lg={9}>
                            <Dashboard isLoading={dashboardIsLoading} />
                        </Col>
                    </div>
                </Container>
            </Container>
        </div>
    );
};

export default App;
