import React from 'react';
import { Container } from 'react-bootstrap'
import TopNavbar from './component/navbar/TopNavBar';
import NavbarTabs from './component/content/NavbarTabs';

const App = () => {
  return (
    <>
      <TopNavbar />
      <Container fluid
        className="g-lg-0 bg-white position-relative">
        <Container fluid
          className="g-lg-0 bg-white">
          <NavbarTabs />
        </Container>
      </Container>
    </>
  );
}

export default App;
