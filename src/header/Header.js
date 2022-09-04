import React from 'react';
import { Navbar, Container, Nav, Image } from 'react-bootstrap';

import ProjectRefocusLogo from '../Project_Refocus_Logo.png';

const Header = () => {
    return (
        <Navbar id="topNavbar">
            <Container fluid>
                <div className="logo-container">
                    <Image
                        src={ProjectRefocusLogo}
                        alt="project-refocus-logo"
                        className="project-refocus-logo"
                    />
                </div>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="response-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    <Nav>
                        <Nav.Item>
                            <span id="account-log-name" className="d-inline-block"></span>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
