import React from 'react';
import DashboardContent from './DashboardContent';

const NavbarTabsPane = ({ tabKey, tabIsActive, setTabData, tabData, tabDataAll }) => {
  return(
    <div role="tabpanel"
      id={ `tabPane ${ tabKey }`}
      className={ `fade g-lg-0 tab-pane ${ tabIsActive ? `active show`: `` }`}>
      <DashboardContent 
        setTabData={ setTabData }
        tabData={ tabData }
        tabDataAll={ tabDataAll }
      />
    </div>
  );
}

export default NavbarTabsPane;