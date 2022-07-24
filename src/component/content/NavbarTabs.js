import React, { useState } from 'react';
import { PlusLg } from 'react-bootstrap-icons';

import DashboardContent from './DashboardContent';

import './NavbarTabsStyles.scss';
import '../customStyles.scss';

const NavbarTabs = () => {

  const [ tabData, setTabData ] = useState([{
    tabKey: "Dashboard",
    dataPeriod: "",
    categories: []
  }]);

  const [ tabList, setTabList ] = useState([
    {
      key: "Dashboard",
      label: "Dashboard",
      tabIsActive: true
    }
  ]);
  
  const handleTabChange = (key) => {
    setTabList(
      tabList.map(
        (tab) => {
          return { ...tab, tabIsActive : tab.key === key }
        }
      )
    )
  }
  
  return (
    <div id="tabNavigation">
      <ul className="nav nav-tabs"
        role="tablist">
        {
          tabList.map(
            (tabs) => {
              const { key, tabIsActive, label } = tabs;
              
              return (
                <li 
                  key={ key }
                  className="nav-item"
                  role="presentation"
                  onClick={ () => { handleTabChange(key) } }>
                  <button type="button"
                    id={ `tab-${ key }` }
                    className={ `nav-link ${ tabIsActive ? `active`: `` }` }
                    role="tab">
                    { label }
                  </button>
                </li>
              )
            }
          )
        }
        {/* <li className="nav-item"
          role="presentaion"
          onClick={ 
            () => {
              const tabsLength = tabList.length;

              if(tabsLength < 3){
                setTabList([ ...tabList, 
                  {
                    key: `Dashboard-${ tabsLength }`,
                    label: `Dashboard ${ tabsLength }`,
                    tabIsActive: false
                  }
                ])

                setTabData([...tabData, 
                  {
                    tabKey: `Dashboard-${ tabsLength }`,
                    dataInfo: "",
                    dataPeriod: "",
                    categories: []
                  }
                ]);
              }
              else alert("Tabs limit to 3");
            }
          }>
          <button type="button"
            className="nav-link"
            role="tab">
            <PlusLg className="icon-style-1" />
          </button>
        </li> */}
      </ul>
      <div className="tab-content">
        {
          tabList.map(
            (tabs, index) => {
              const { key, label, tabIsActive } = tabs;
              return (
                <div key={ label }
                  role="tabpanel"
                  id={ `tabpane-${ key }` }
                  className={ `fade g-lg-0 tab-pane ${ tabIsActive ? `active show`: ``}` }>
                  <DashboardContent
                    setTabData={ setTabData }
                    tabData={ tabData[index] }
                    tabDataAll={ tabData }
                  />
                </div>
              )
            }
          )
        }
      </div>
    </div>
  );
}

export default NavbarTabs;