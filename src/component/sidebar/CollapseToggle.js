import React from 'react';
import { Form } from 'react-bootstrap'
import { PlusLg } from 'react-bootstrap-icons';

import '../customStyles.scss';

const CollapseToggle = ({ handleCollapseToggle, showCollapse, type, label, length, categories }) => {
  
  const disabledCategory = (categories.length === 2 
    && categories.some((value) => { return value.categoryName === type })) || 
    categories.length < 2;

  return(
    <div className="d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center flex-grow-1"
        onClick={ () => handleCollapseToggle(type) } >
        <Form.Check>
          <Form.Check.Input 
            id={ label }
            type="checkbox"
            checked={ showCollapse }
            disabled={ disabledCategory ? false : true }
            onChange={ () => handleCollapseToggle(type) } />
          <Form.Check.Label 
            className={ showCollapse ? `text-blue-3`: `` }>
            { label }
          </Form.Check.Label>
        </Form.Check>
      </div>
      { 
        (showCollapse && length < 2) && 
        <PlusLg className="icon-style-1" />
      }
    </div>
  );
    
};

export default CollapseToggle;