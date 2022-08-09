import React from "react";

const NavbarTabsItem = ({
  handleTabChange,
  handleRemoveTab,
  tabIsActive,
  label,
  tabKey,
}) => {
  return (
    <>
      <li className="nav-item" role="presentation">
        <button
          type="button"
          id={`tab-${tabKey}`}
          className={`nav-link ${tabIsActive ? `active` : ``}`}
          role="tab"
          style={{ borderRadius: tabKey !== "Dashboard" && "4px 0px 0px 0px" }}
          onClick={() => {
            handleTabChange(tabKey);
          }}
        >
          {label}
        </button>
        {tabKey !== "Dashboard" && (
          <span
            type="button"
            className={`nav-link ${tabIsActive ? `active` : ``}`}
            role="tab"
            style={{
              borderRadius: "0px 4px 0px 0px",
            }}
            onClick={() => {
              handleRemoveTab(tabKey);
            }}
          >
            x
          </span>
        )}
      </li>
    </>
  );
};

export default NavbarTabsItem;
