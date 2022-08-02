import React from "react";
import { Form } from "react-bootstrap";
import { PlusLg } from "react-bootstrap-icons";

import "../customStyles.scss";

const CollapseToggle = ({
  handleCollapseToggle,
  showCollapse,
  type,
  label,
  length,
  categories,
  handleIsDuplicate,
  isDuplicate,
  ctType = "first",
}) => {
  const disabledCategory =
    (categories.length === 2 &&
      categories.some((value) => {
        return value.categoryName === type;
      })) ||
    categories.length < 2;

  return (
    <div className="d-flex justify-content-between align-items-center">
      <div
        className="d-flex align-items-center flex-grow-1"
        onClick={() => handleCollapseToggle(type)}
      >
        <Form.Check>
          <Form.Check.Input
            id={label}
            type="checkbox"
            checked={showCollapse}
            disabled={disabledCategory ? false : true}
            onChange={() => handleCollapseToggle(type)}
          />
          <Form.Check.Label className={showCollapse ? `text-blue-3` : ``}>
            {label}
          </Form.Check.Label>
        </Form.Check>
      </div>
      {showCollapse && !isDuplicate ? (
        <PlusLg
          className="icon-style-1"
          color={`${length < 2 ? "#636E72" : "#B2BEC3"}`}
          onClick={handleIsDuplicate}
        />
      ) : null}
      {showCollapse && ctType === "second" && (
        <TrashIcon handleIsDuplicate={handleIsDuplicate} />
      )}
    </div>
  );
};

const TrashIcon = ({ handleIsDuplicate }) => (
  <div className="trash-icon-svg" onClick={handleIsDuplicate}>
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.6125 1.75L4.49375 0.514062C4.72188 0.194277 5.12187 0 5.55312 0H8.44687C8.87812 0 9.27813 0.194277 9.50625 0.514062L10.3875 1.75H13.75C13.8875 1.75 14 1.84789 14 1.96875C14 2.08961 13.8875 2.1875 13.75 2.1875H0.25C0.111937 2.1875 0 2.08961 0 1.96875C0 1.84789 0.111937 1.75 0.25 1.75H3.6125ZM4.2 1.75H9.8L9.08125 0.745938C8.94375 0.553984 8.70312 0.4375 8.44687 0.4375H5.55312C5.29687 0.4375 5.05625 0.553984 4.91875 0.745938L4.2 1.75ZM1.25 3.0625C1.38813 3.0625 1.5 3.16094 1.5 3.28125V12.0312C1.5 12.8762 2.28344 13.5625 3.25 13.5625H10.75C11.7156 13.5625 12.5 12.8762 12.5 12.0312V3.28125C12.5 3.16094 12.6125 3.0625 12.75 3.0625C12.8875 3.0625 13 3.16094 13 3.28125V12.0312C13 13.1195 11.9937 14 10.75 14H3.25C2.0075 14 1 13.1195 1 12.0312V3.28125C1 3.16094 1.11187 3.0625 1.25 3.0625ZM4.25 11.375C4.25 11.4953 4.1375 11.5938 4 11.5938C3.8625 11.5938 3.75 11.4953 3.75 11.375V4.375C3.75 4.25469 3.8625 4.15625 4 4.15625C4.1375 4.15625 4.25 4.25469 4.25 4.375V11.375ZM7.25 11.375C7.25 11.4953 7.1375 11.5938 7 11.5938C6.8625 11.5938 6.75 11.4953 6.75 11.375V4.375C6.75 4.25469 6.8625 4.15625 7 4.15625C7.1375 4.15625 7.25 4.25469 7.25 4.375V11.375ZM10.25 11.375C10.25 11.4953 10.1375 11.5938 10 11.5938C9.8625 11.5938 9.75 11.4953 9.75 11.375V4.375C9.75 4.25469 9.8625 4.15625 10 4.15625C10.1375 4.15625 10.25 4.25469 10.25 4.375V11.375Z"
        fill="black"
      />
    </svg>
  </div>
);

export default CollapseToggle;
