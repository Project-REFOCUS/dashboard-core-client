import React from 'react';
import { Col, Container } from 'react-bootstrap'
import Header from './header/Header';
import TopNavbar from './navbar/TopNavBar';
import NavbarTabs from './navbar/NavbarTabs';
import Toolbar from './toolbar/Toolbar';
import Sidebar from './sidebar/Sidebar';
import Dashboard from './dashboard/Dashboard';

const App = () => {
    return (
        <div>
            <Header />
            <TopNavbar />
            <Container fluid className="g-lg-0 bg-white position-relative">
                <Container fluid className="g-lg-0 bg-white">
                    <NavbarTabs />
                    <div className="main-content">
                        <Toolbar />
                        <Col xl={2} lg={3} md={4} xs={12} className="g-0">
                            <Sidebar />
                        </Col>
                        <Col className="mb-sm-4 mb-4" xl={10} lg={9}>
                            <div className="px-lg-3">
                                <Dashboard />
                            </div>
                        </Col>
                    </div>
                </Container>
            </Container>
        </div>
    );
};

export default App;
