import React from "react";
import { Navbar, Container, Nav, Image } from "react-bootstrap";

/* Images */
import Logo from "../../Project_Refocus_Logo.png";
import maskOne from "../../image_mask_one.png";
import maskTwo from "../../image_mask_two.png";

import "./TopNavbar.scss";

const TopNavBar = () => {
  return (
    <>
      <Navbar id="topNavbar">
        <Container fluid>
          <div className="logo-container">
            <Image
              src={Logo}
              alt="project-refocus-logo"
              className="project-refocus-logo"
            />
          </div>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Item>
                <span id="account-log-name" className="d-inline-block">
                  Hi, Admin
                </span>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="banner-mask-container">
        <div className="row g-0 w-100 h-100">
          <div className="col-9 h-100">
            <Image
              src={maskOne}
              alt="pic-mask-one"
              className="imageMask-WxH1"
            />
          </div>
          <div className="col-3 h-100">
            <Image
              src={maskTwo}
              alt="pic-mask-two"
              className="imageMask-WxH1"
            />
          </div>
        </div>

        <div className="banner-mask-overlay"></div>
      </div>
    </>
  );
};

export default TopNavBar;
