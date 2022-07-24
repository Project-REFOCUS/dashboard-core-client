import React from 'react';
import { Form } from 'react-bootstrap'
import { PlusLg, Trash } from 'react-bootstrap-icons';

import '../customStyles.scss';

const CollapseToggle = ({ handleCollapseToggle, handleAddSameCategory, showCollapse, type, label, length, categories }) => {
  
  const disabledCategory = (categories.length === 2 
    && categories.some((value) => { return value.categoryName === type })) || 
    categories.length < 2;

  return(
    <div className="d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <Form.Check 
          type="checkbox"
          id={ label }
          label={ label }
          onChange={ () => handleCollapseToggle(type) }
          disabled={ disabledCategory ? false : true }
          checked={ showCollapse }
          className={ showCollapse ? `text-blue-3`: `` }
        />
      </div>
      { 
        (showCollapse && length < 2) && 
        <PlusLg className="icon-style-1" 
          /* onClick={ () => { handleAddSameCategory(type) } } *//>
      }
      {
        /* type.indexOf("1") !== -1 &&
        <Trash className="icon-style-1" /> */
      }
    </div>
  );
    
};

export default CollapseToggle;