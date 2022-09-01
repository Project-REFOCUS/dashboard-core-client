import React from 'react';
import { Col, Container } from 'react-bootstrap'
import Header from './header/Header';
import TopNavbar from './navbar/TopNavBar';
import NavbarTabs from './navbar/NavbarTabs';
import Toolbar from './toolbar/Toolbar';
import Sidebar from './sidebar/Sidebar';
import Dashboard from './dashboard/Dashboard';

import './App.scss';

const App = () => {
    return (
        <div className="max-height">
            <Header />
            <TopNavbar />
            <Container fluid className="d-flex g-lg-0 bg-white position-relative main-container">
                <Container fluid className="d-flex flex-column g-lg-0 bg-white">
                    <NavbarTabs />
                    <Toolbar />
                    <div className="d-flex flex-row max-height overflow-hidden">
                        <Col xl={2} lg={3} md={4} xs={12} className="g-0 max-height overflow-scroll">
                            <Sidebar />
                        </Col>
                        <Col className="max-height mb-sm-4 mb-4" xl={10} lg={9}>
                            <Dashboard />
                        </Col>
                    </div>
                </Container>
            </Container>
        </div>
    );
};

export default App;
