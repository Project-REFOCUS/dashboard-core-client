import React, { useEffect, useState } from 'react';
import { Form, Collapse } from 'react-bootstrap';
import { PlusLg } from 'react-bootstrap-icons';
import ReactSelect, { components, createFilter } from 'react-select';
import { XLg } from 'react-bootstrap-icons';

import { dataOrientationOption, raceOption, stateOptions } from '../../data';
import { fontStyles, customFontStyles } from '../customFontStyleHelper';
import { isEmptyKeyObject } from '../../utility_helpers';

import '../customStyles.scss';
import '../../CustomVariables.scss';

const groupStateOptions = [
  {
    label: "United States",
    options: [ { value: "deselect", label: "Deselect All" }, ...stateOptions ]
  }
]

const stateMenuListComponent = ({ selectProps, ...props }) => {
 
  const { onInputChange, stateInputValue, onMenuInputFocus } = selectProps;

  const ariaAttributes = {
    "aria-autocomplete": "list",
    "aria-label": selectProps["aria-label"],
    "aria-labelledby": selectProps["aria-labelledby"]
  };

  const focusAndStopProp = (e) => {
    e.stopPropagation();
    e.target.focus();
  }

  return (
    <>
      <Form.Group className="px-2 py-1">
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
          onMouseDown={ focusAndStopProp }
          onTouchEnd={ focusAndStopProp }
          onFocus={ onMenuInputFocus }
          placeholder="Search state..."
          { ...ariaAttributes } />
      </Form.Group>
      <components.MenuList { ...props } selectProps={ selectProps }>
        { props.children }
      </components.MenuList>
    </>
  )
}

const stateGroupHeadingComponent = (props) => {
  
  return(
    <>
      <components.GroupHeading { ...props }>
        <div className="d-flex justify-content-between align-items-center">
          <Form.Check>
            <Form.Check.Input
              id={ props.data.label }
              type="checkbox"
              onChange={ () => null }/>
            <Form.Check.Label
              htmlFor={ props.data.label }
              style={
                { ...customFontStyles({ ...fontStyles, color: "#000000" }) }
              }>{ props.children }
            </Form.Check.Label>
          </Form.Check>
        </div>
      </components.GroupHeading>
      <hr className="hr-style-1" />
      
    </>
  );
}
const stateOptionComponent = ({ selectProps, ...props }) => {
  const { stateInputValue } = selectProps;

  if(props.value === "deselect")
    return (
      (selectProps.value).length > 0 && 
      <components.Option { ...props } selectProps={ selectProps }>
        <div className="d-flex justify-content-between align-items-center">
          { props.label }
        </div>
      </components.Option>
    )
  return (
    <components.Option { ...props } selectProps={ selectProps }>
      <div className="d-flex justify-content-between align-items-center">
        <Form.Check>
          <Form.Check.Input
            id={ props.label }
            type="checkbox" 
            checked={ props.isSelected }
            onChange={ () => null }/>
          <Form.Check.Label
            htmlFor={ props.label }
            style={
              { ...customFontStyles({ ...fontStyles, color: "#000000" }) }
            }>{ 
              stateInputValue === "" 
              ? props.label : 
              ( 
                <>
                  <strong 
                    style={{ 
                      ...customFontStyles({ ...fontStyles, fontWeight: 700 })
                    }}>{ (props.label).substring(0, stateInputValue.length) }</strong>
                  { (props.label).substring(stateInputValue.length) }
                </>
              )
            }
          </Form.Check.Label>
        </Form.Check>
      </div>
    </components.Option>
  );
};

const stateValueContainerComponent = ({ children, selectProps, ...props }) => {
  return (
    <components.ValueContainer { ...props } selectProps={ selectProps }>
      { 
        React.Children.map(children, 
          (child, index) => {
            if(index <= 5)
              return child;
            
            return;
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
              padding: "4px"
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
      <XLg className="remove-tag-icon-1" />
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
      backgroundColor: state.isSelected ? "#086EBE" : base.backgroundColor,
      cursor: "pointer"                                    
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
  const [ placeState, setPlaceState ] = useState([]);

  useEffect(
    () => {
      if(!showCollapse){
        setDataOrientation({});
        setRace({});
        setPlaceState([]);
      }
    }
    ,[ showCollapse ]
  );

  /* handle changes on the category data */
  const handleReactSelectChange = (selected, action) => {
    switch(action.name){
      case "dataOrientationSelectName":
        setDataOrientation(selected);
        handleDataOrientationChange(type, selected.value);
        break;
      case "raceSelectName":
        setRace(selected);
        handleRaceChange(type, selected.value);
        break;
    }
  }

  const handlePlaceStateChange = (options) => {
    if (
      options !== null &&
      options.length > 0 &&
      options[options.length - 1].value === "deselect"
    ) {
      setPlaceState([]);
      handleGeographyChange(type, []);
    }
    else{
      setPlaceState(options);
      handleGeographyChange(type, options.map((option) => option.value));
    }
    setIsStateFocused(false);
  }
  
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
            styles={ ReactSelectStyle1 }
            name="dataOrientationSelectName"
            onChange={ handleReactSelectChange }
            value={isEmptyKeyObject(dataOrientation) ? null : dataOrientation }
            placeholder="Data Orientation: "
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
            styles={ ReactSelectStyle1 }
            isDisabled={ isEmptyKeyObject(dataOrientation) }
            value={ isEmptyKeyObject(race) ? null : race }
            placeholder="Race: "
            name="raceSelectName"
            onChange={ handleReactSelectChange }
          />
        </div>
        {/* end: Race */}

        {/* begin: Geography */}
        <div className="mb-2">
          <Form.Label className="mb-0">
            Geography
          </Form.Label>
          <ReactSelect 
            options={ groupStateOptions }
            components={{
              MenuList: stateMenuListComponent,
              Option: stateOptionComponent,
              MultiValueRemove: stateMultiValueRemoveComponent,
              ValueContainer: stateValueContainerComponent,
              DropdownIndicator: stateDropdownIndicatorComponent,
              ClearIndicator: () => null,
              GroupHeading: stateGroupHeadingComponent
            }}
            isDisabled={ isEmptyKeyObject(dataOrientation) }
            styles={{
              control: (base) => ({
                ...base,
                "&:hover": {
                  backgroundColor: "#D3ECFF"
                },
                minHeight: "30px"
              }),
              dropdownIndicator: (base) => ({
                ...base,
                justifyContent: "space-between"
              }),
              indicatorSeparator:(base) => ({
                ...base,
                width: 0
              }),
              groupHeading: (base) => ({
                ...base,
                textTransform: "none"
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
                  backgroundColor: state.isSelected ? "#086EBE" : base.backgroundColor,
                  cursor: "pointer"                                   
                }
              }),
              placeholder: (base) => ({
                ...base,
                ...customFontStyles({ ...fontStyles, color: "#B2BEC3" })
              })
            }}
            pageSize={ 5 }
            filterOption={createFilter({ matchFrom: "start" })}
            hideSelectedOptions={ false }
            stateInputValue={ stateInputValue }
            isSearchable={ false }
            closeMenuOnSelect={ false }
            onMenuInputFocus={() => setIsStateFocused(true)}
            onChange={ handlePlaceStateChange }
            value={ placeState }
            placeholder="Location: "
            onInputChange={
              (value) => {
                setStateInputValue(value)
              }
            }
            isMulti
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