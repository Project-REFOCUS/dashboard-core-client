import React from 'react';
import { components } from 'react-select';

const MultiSelectDropdownIndicatorComponent = props => {
    return (
        <div className="d-flex justify-content-between align-items-center flex-column align-self-stretch">
            <components.DropdownIndicator {...props} />
        </div>
    );
};
/* TODO: Figure ou whether this is useful
const stateDropdownIndicatorComponent = (props) => {
  const stateValues = props.selectProps.value;
  return (
    <div className="d-flex justify-content-between align-items-center flex-column align-self-stretch">
      <components.DropdownIndicator {...props} />
      {stateValues && stateValues.length > 6 ? (
        <div
          style={{
            ...customFontStyles({
              ...fontStyles,
              fontSize: "10px",
              lineHeight: "14px",
              color: "#636E72",
            }),
            padding: "4px",
          }}
        >
          {`${stateValues.length - 6} +`}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
*/
export default MultiSelectDropdownIndicatorComponent;
