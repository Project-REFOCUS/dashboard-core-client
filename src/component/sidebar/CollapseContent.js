import React, { useState } from 'react';
import { Form, Collapse } from 'react-bootstrap';
import { PlusLg } from 'react-bootstrap-icons';
import ReactSelect, { components, createFilter } from 'react-select';
import { XLg } from 'react-bootstrap-icons';

import { fontStyles, customFontStyles } from '../customFontStyleHelper';

import '../customStyles.scss';
import '../../CustomVariables.scss';

const dataOrientationOption = [
  {
    value: "dailyPer100k",
    label: "Daily per 100,000"
  },
  {
    value: "weeklyPer100k",
    label: "Weekly per 100,000"
  },
  {
    value: "monthlyPer1M",
    label: "Monthly per 1,000,000"
  }
];

const raceOption = [
  {
    value: 'All',
    label: 'All'
  },
  {
    value: 'race1',
    label: 'Race 1'
  },
  {
    value: 'race2',
    label: 'Race 2'
  }
];

const stateOptions = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AS', label: 'American Samoa' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'DC', label: 'District Of Columbia' },
  { value: 'FM', label: 'Federated States Of Micronesia' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'GU', label: 'Guam' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MH', label: 'Marshall Islands' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'MP', label: 'Northern Mariana Islands' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PW', label: 'Palau' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'PR', label: 'Puerto Rico' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VI', label: 'Virgin Islands' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
];

const stateMenuListComponent = ({ selectProps, ...props }) => {
  const { onInputChange, stateInputValue, onMenuInputFocus } = selectProps;

  // Copied from source
  const ariaAttributes = {
    "aria-autocomplete": "list",
    "aria-label": selectProps["aria-label"],
    "aria-labelledby": selectProps["aria-labelledby"]
  };

  return (
    <>
      <Form.Group className="p-2">
        <Form.Control type="text"
          id="state-search"
          autoCorrect="off"
          autoComplete="off"
          spellCheck="false"
          value={ stateInputValue }
          onChange={(e) =>
            onInputChange(e.currentTarget.value, {
              action: "input-change"
            })
          }
          onMouseDown={(e) => {
            e.stopPropagation();
            e.target.focus();
          }}
          onTouchEnd={(e) => {
            e.stopPropagation();
            e.target.focus();
          }}
          onFocus={ onMenuInputFocus }
          placeholder="Search"
          { ...ariaAttributes } />
      </Form.Group>
      <components.MenuList {...props} selectProps={selectProps}>
        { props.children }
      </components.MenuList>
    </>
  )
}

const stateOptionComponent = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <div className="d-flex justify-content-between align-items-center">
          <Form.Check 
            id={ props.label }>
            <Form.Check.Input 
              type="checkbox" 
              checked={ props.isSelected }
              onChange={ () => null }/>
            <Form.Check.Label
              htmlFor={ props.label }
              style={
                { ...customFontStyles({ ...fontStyles, color: "#000000" }) }
              }>{ props.label }</Form.Check.Label>
          </Form.Check>
        </div>
      </components.Option>
    </div>
  );
};

const stateValueContainerComponent = ({ children, selectProps, ...props }) => {
  return (
    <components.ValueContainer {...props} selectProps={selectProps}>
      { 
        React.Children.map(children, 
          (child, index) => {
            if(index <= 5)
              return child;
          }
        )
      }
    </components.ValueContainer>
  );
}

const stateDropdownIndicatorComponent = (props) => {
  const stateValues = props.selectProps.value;
  return(
    <div className="d-flex justify-content-between align-items-center flex-column align-self-stretch">
      <components.DropdownIndicator { ...props }/>
      {
        stateValues && stateValues.length > 6 ?
        (
          <div 
            style={{
              ...customFontStyles({
                ...fontStyles,
                fontSize: "10px",
                lineHeight: "14px",
                color: "#636E72"
              }),
              padding: "8px"
            }}>
            { `${ stateValues.length - 6 } +` }
          </div>
        ) : (<></>)
      }
    </div>
  );
}
const stateMultiValueRemoveComponent = (props) => {
  return(
    <components.MultiValueRemove { ...props }>
      <XLg style={{
        width: "11px",
        height: "11px",
        color: "#000000"
      }}/>
    </components.MultiValueRemove>
  );
}

const ReactSelectStyle1 = {
  control: (base) => ({
    ...base,
    "&:hover": {
      backgroundColor: "#D3ECFF"
    },
    minHeight: "30px"
  }),
  indicatorSeparator:(base) => ({
    ...base,
    width: 0
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0px 8px",
  }),
  singleValue: (base) => ({
    ...base,
    ...customFontStyles({ ...fontStyles, color: "#2D3436" })
  }),
  option: (base, state) => ({
    ...base,
    ...customFontStyles({ ...fontStyles, color: "#000000" }),
    backgroundColor: state.isSelected ? "#72BBF4" : base.backgroundColor,
    "&:hover": { 
      backgroundColor: state.isSelected ? "#086EBE" : base.backgroundColor                                     
    }
  }),
  placeholder: (base) => ({
    ...base,
    ...customFontStyles({ ...fontStyles, color: "#B2BEC3" })
  })
}

const CollapseContent = ({ showCollapse, type, handleDataOrientationChange, handleRaceChange, handleGeographyChange }) => {
  const [isStateFocused, setIsStateFocused] = useState(false);
  const [stateInputValue, setStateInputValue] = useState("");
  const [ dataOrientation, setDataOrientation] = useState({});
  const [ race, setRace ] = useState({});

  return (
    <Collapse in={ showCollapse } >
      <div>

        {/* begin: Data Orientation */}
        <div className="mb-2">
          <Form.Label className="mb-0">
            Data Orientation
          </Form.Label>
          <ReactSelect
            options={ dataOrientationOption }
            defaultValue={ dataOrientationOption[0] }
            styles={ ReactSelectStyle1 }
            onChange={ (selected) => {
              setDataOrientation(selected);
              handleDataOrientationChange(type, selected.value);
            }}
            placeholder="Data Orientation "
          />
        </div>
        {/* end: Data Orientation */}

        {/* begin: Race */}
        <div className="mb-2">
          <Form.Label className="mb-0">
            Race
          </Form.Label>
          <ReactSelect
            options={ raceOption }
            defaultValue={ raceOption[0] }
            styles={ ReactSelectStyle1 }
            onChange={ (selected) => {
              setRace(selected);
              handleRaceChange(type, selected.value);
            }}
            placeholder="Race "
          />
        </div>
        {/* end: Race */}

        {/* begin: Geography */}
        <div className="mb-2">
          <Form.Label className="mb-0">
            Geography
          </Form.Label>
          <ReactSelect 
            options={ stateOptions }
            isMulti
            components={{
              MenuList: stateMenuListComponent,
              Option: stateOptionComponent,
              MultiValueRemove: stateMultiValueRemoveComponent,
              ValueContainer: stateValueContainerComponent,
              DropdownIndicator: stateDropdownIndicatorComponent,
              ClearIndicator: () => null
            }}
            styles={{
              control: (base) => ({
                ...base,
                "&:hover": {
                  backgroundColor: "#D3ECFF"
                }
              }),
              dropdownIndicator: (base) => ({
                ...base,
                justifyContent: "space-between"
              }),
              indicatorSeparator:(base) => ({
                ...base,
                width: 0
              }),
              multiValue: (base) => ({
                ...base,
                ...customFontStyles({
                  ...fontStyles,
                  fontSize: "11px",
                  lineHeight: "15px",
                  color: "#000000"
                }),
                backgroundColor: "#DFE6E9",
                borderRadius: "4px"
              }),
              option: (base, state) => ({
                ...base,
                ...customFontStyles({ ...fontStyles, color: "#000000" }),
                backgroundColor: state.isSelected ? "#72BBF4" : base.backgroundColor,
                "&:hover": { 
                  backgroundColor: state.isSelected ? "#086EBE" : base.backgroundColor                                     
                }
              }),
              placeholder: (base) => ({
                ...base,
                ...customFontStyles({ ...fontStyles, color: "#B2BEC3" })
              })
            }}
            filterOption={createFilter({ matchFrom: "start" })}
            hideSelectedOptions={ false }
            stateInputValue={ stateInputValue }
            isSearchable={ false }
            closeMenuOnSelect={ false }
            onMenuInputFocus={() => setIsStateFocused(true)}
            onChange={(options) => {
              handleGeographyChange(type, options.map((option) => option.value));
              setIsStateFocused(false)
            }}
            
            onInputChange={(value) => setStateInputValue(value)}
            {...{
              menuIsOpen: isStateFocused || undefined,
              isFocused: isStateFocused || undefined
            }}
          />
          <div className="text-end custom-style-1">Advanced options</div>
        </div>
        {/* end: Geography */}

        <div className="d-flex justify-content-between">
          <div>
            <PlusLg className="me-2 plusLgStyle1" />
            <span className="custom-style-1">Add denominator { `(max: 2)` }</span>
          </div>
        </div>
      </div>
    </Collapse>
  );
}

export default CollapseContent;