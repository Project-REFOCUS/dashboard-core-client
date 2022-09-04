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

const noCategoryWithEmptyValue = categories =>
    categories?.length && categories.every(category => category.orientation && category.name);

const shouldRefreshData = query =>
    query && noCategoryWithEmptyValue(query.categories) && query.period;

const App = () => {
    const [dashboardIsLoading, setDashboardIsLoading] = useState(false);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const [dashboardQuery, setDashboardQuery] = useState([{}]);
    const [dashboardData, setDashboardData] = useState([{}]);
    const { xAxisData, yAxisData } = dashboardData[selectedTabIndex];
    const onCategoriesUpdate = (category, shouldRemove) => {
        const newDashboardQuery = [...dashboardQuery];
        const query = dashboardQuery[selectedTabIndex];
        query.categories = query.categories || [];
        query.categories = query.categories
            .filter(query => query.name !== category.name)
            .concat(shouldRemove ? [] : [category]);
        setDashboardQuery(newDashboardQuery);
    };
    const onPeriodSelect = period => {
        const newDashboardQuery = [...dashboardQuery];
        const query = dashboardQuery[selectedTabIndex];
        query.period = {...period};
        setDashboardQuery(newDashboardQuery);
    };
    const activeQuery = dashboardQuery[selectedTabIndex];
    useEffect(() => {
        if (shouldRefreshData(activeQuery)) {
            setDashboardIsLoading(true);
            window.console.log(activeQuery);
            getDataFromQuery(activeQuery)
                .then(results => {
                    const newDashboardData = [...dashboardData];
                    const [xAxisData, yAxisData] = results;
                    window.console.log('LeftAxisData: ', xAxisData);
                    window.console.log('RightAxisData: ', yAxisData);
                    newDashboardData[selectedTabIndex] = {xAxisData, yAxisData};

                    setDashboardData(newDashboardData);
                    setDashboardIsLoading(false);
                });
        }

    }, [activeQuery.period, activeQuery.categories]);
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
                            <Sidebar onCategoriesUpdate={onCategoriesUpdate} />
                        </Col>
                        <Col className="max-height mb-sm-4 mb-4" xl={10} lg={9}>
                            <Dashboard isLoading={dashboardIsLoading} xAxisData={xAxisData} yAxisData={yAxisData} />
                        </Col>
                    </div>
                </Container>
            </Container>
        </div>
    );
};

export default App;
