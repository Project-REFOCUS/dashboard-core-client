import React, { useEffect, useState } from "react";
import { PlusLg } from "react-bootstrap-icons";

import NavbarTabsItem from "./NavbarTabsItem";
import NavbarTabsPane from "./NavbarTabsPane";

import "./NavbarTabsStyles.scss";
import "../customStyles.scss";

const NavbarTabs = () => {
  const [ lastTabCount, setLastTabCount ] = useState(0);
  const [ lastCurrentTab, setLastCurrentTab ] = useState(0);

  const [tabData, setTabData] = useState([
    {
      tabKey: "Dashboard",
      dataPeriod: "",
      categories: [],
    },
  ]);

  const [tabList, setTabList] = useState([
    {
      key: "Dashboard",
      label: "Dashboard",
      tabIsActive: true,
    },
  ]);

  useEffect(
    () => {
      if(!tabList.some((tab) => tab.tabIsActive === true)){
       setTabList(
          tabList.map(
            (tab, index) => {
              if(index === 0)
                return { ...tab, tabIsActive: true };
               
              return tab;
            }
          )
        )
      }
    },
    [tabList]
  );

  const handleTabChange = (key) => {
    setTabList(
      tabList.map((tab) => {
        return { ...tab, tabIsActive: tab.key === key };
      })
    );
  };

  const handleRemoveTab = (key) => {
    tabList.forEach((tab, index) => {
      if(tab.key === key) setLastCurrentTab(index); 
    });

    setTabList(tabList.filter((tab) => tab.key !== key));
    setTabData(tabData.filter((tab) => tab.tabKey !== key));

    
    /* const newTabList = tabList.filter((item) => item.key !== key);
    const newTabData = tabData.filter((item) => item.tabKey !== key);

    newTabList.forEach((item, idx) => {
      if (idx > 0) {
        var [key, label] = [`Dashboard-${idx}`, `Dashboard ${idx}`];
        newTabList[idx].key = key;
        newTabList[idx].label = label;
        newTabData[idx].tabKey = key;
      }
    });
    setTabList(newTabList);
    setTabData(newTabData); */
  };

  return (
    <div id="tabNavigation">
      <ul className="nav nav-tabs" role="tablist">
        {tabList.map((tabs) => {
          const { key, tabIsActive, label } = tabs;

          return (
            <NavbarTabsItem
              key={key}
              tabIsActive={tabIsActive}
              label={label}
              tabKey={key}
              length={ tabList.length }
              handleTabChange={handleTabChange}
              handleRemoveTab={handleRemoveTab}
            />
          );
        })}
        <li
          className="nav-item"
          role="presentaion"
          onClick={() => {
            const tabCount = lastTabCount + 1;
            setTabList([
              ...tabList,
              {
                key: `Dashboard-${ tabCount }`,
                label: `Dashboard ${ tabCount }`,
                tabIsActive: false,
              },
            ]);

            setTabData([
              ...tabData,
              {
                tabKey: `Dashboard-${ tabCount }`,
                dataPeriod: "",
                categories: [],
              },
            ]);

            setLastTabCount((lastTabCount) => lastTabCount + 1);
          }}
        >
          <button type="button" className="nav-link" role="tab">
            <PlusLg className="icon-style-1" />
          </button>
        </li>
      </ul>
      <div className="tab-content">
        {tabList.map((tabs, index) => {
          const { key, label, tabIsActive } = tabs;
          return (
            <NavbarTabsPane
              key={label}
              tabKey={key}
              tabIsActive={tabIsActive}
              setTabData={setTabData}
              tabData={tabData[index]}
              tabDataAll={tabData}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NavbarTabs;
