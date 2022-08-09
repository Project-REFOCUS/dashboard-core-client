import React, { useState } from "react";
import { PlusLg } from "react-bootstrap-icons";

import NavbarTabsItem from "./NavbarTabsItem";
import NavbarTabsPane from "./NavbarTabsPane";

import "./NavbarTabsStyles.scss";
import "../customStyles.scss";

const NavbarTabs = () => {
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

  const handleTabChange = (key) => {
    setTabList(
      tabList.map((tab) => {
        return { ...tab, tabIsActive: tab.key === key };
      })
    );
  };

  const handleRemoveTab = (key) => {
    return setTabList(tabList.filter((item) => item.key !== key));
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
              handleTabChange={handleTabChange}
              handleRemoveTab={handleRemoveTab}
            />
          );
        })}
        <li
          className="nav-item"
          role="presentaion"
          onClick={() => {
            const tabsLength = tabList.length;

            setTabList([
              ...tabList,
              {
                key: `Dashboard-${tabsLength}`,
                label: `Dashboard ${tabsLength}`,
                tabIsActive: false,
              },
            ]);

            setTabData([
              ...tabData,
              {
                tabKey: `Dashboard-${tabsLength}`,
                dataPeriod: "",
                categories: [],
              },
            ]);
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
