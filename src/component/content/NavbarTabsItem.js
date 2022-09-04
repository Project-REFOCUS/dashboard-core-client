import React from "react";
import { XLg } from "react-bootstrap-icons";
import '../customStyles.scss';

const NavbarTabsItem = ({
  handleTabChange,
  handleRemoveTab,
  tabIsActive,
  label,
  tabKey,
  length
}) => {
  return (
    <>
      <li className="nav-item position-relative" role="presentation">
        <button
          type="button"
          id={`tab-${tabKey}`}
          className={`nav-link ${tabIsActive ? `active` : ``}`}
          role="tab"
          style={{ borderRadius: tabKey !== 'Dashboard' && '4px 0px 0px 0px' }}
          onClick={() => {
            handleTabChange(tabKey);
          }}
        >
          {label}
        </button>
        {
          length > 1 &&
          (
            <span
              style={{
                position: "absolute",
                top: "-12px",
                right: "-8px"
              }}
              onClick={() => {
                handleRemoveTab(tabKey);
              }}>
              <XLg className="remove-tag-icon-2" />
            </span>
          )
        }
      </li>
    </>
  );
};

export default NavbarTabsItem;
