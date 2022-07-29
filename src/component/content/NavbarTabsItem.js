import React from 'react';

const NavbarTabsItem = ({ handleTabChange, tabIsActive, label, tabKey }) => {
  return(
    <li className="nav-item"
      role="presentation"
      onClick={ () => { handleTabChange(tabKey) } }>
      <button type="button"
        id={ `tab-${ tabKey }` }
        className={ `nav-link ${ tabIsActive ? `active`: `` }` }
        role="tab">
        { label }
      </button>
    </li>
  );
}

export default NavbarTabsItem;