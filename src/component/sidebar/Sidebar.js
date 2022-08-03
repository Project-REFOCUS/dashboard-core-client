import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import CollapseToggle from "./CollapseToggle";
import CollapseContent from "./CollapseContent";

import "./SidebarStyle.scss";

const ListGroupOptions = [
  {
    key: "Cases",
    label: "Cases",
    borderLeftColor: "hotPink",
    showCollapse: false,
  },
  {
    key: "Deaths",
    label: "Deaths",
    borderLeftColor: "purple",
    showCollapse: false,
  },
  {
    key: "Tests",
    label: "Tests",
    borderLeftColor: "yellow",
    showCollapse: false,
  },
  {
    key: "Vaccinations",
    label: "Vaccinations",
    borderLeftColor: "green-1",
    showCollapse: false,
  },
  {
    key: "Police shootings",
    label: "Police shootings",
    borderLeftColor: "green-2",
    showCollapse: false,
  },
  {
    key: "Population estimates",
    label: (
      <div className="d-inline-block">
        <span className="d-block">Population estimates</span>
        <span
          className="d-block"
          style={{
            fontSize: "14px",
          }}
        >
          ( 1 year estimates )
        </span>
      </div>
    ),
    borderLeftColor: "orange",
    showCollapse: false,
  },
  {
    key: "Twitter",
    label: "Twitter",
    borderLeftColor: "blue",
    showCollapse: false,
  },
];

const Sidebar = ({ setCategories, categories }) => {
  const [listOptions, setListOptions] = useState(ListGroupOptions);
  const [isDuplicate, setIsDuplicate] = useState("");

  const handleCollapseToggle = (type) => {
    if (categories.length <= 2) {
      let index = -1;

      const mapShowCollapse = (listItem, idx) => {
        const { showCollapse, key } = listItem;
        if (key === type) {
          index = idx;
          listItem.showCollapse = !showCollapse;
        }
        return listItem;
      };

      setListOptions(listOptions.map(mapShowCollapse));

      const { showCollapse } = listOptions[index];
      setCategories(
        showCollapse
          ? [
              ...categories,
              {
                id: categories.length,
                categoryName: type,
                dataOrientation: "",
                race: "",
                geography: [],
              },
            ]
          : categories.filter((category) => {
              return category.categoryName !== type;
            })
      );
      setIsDuplicate(""); // reset any duplication if category is untoggled
    } else alert("Maximum categories are at 2. Over the limit");
  };

  const handleSameCategory = (type, changeType) => {
    let res;
    if (changeType === "add") {
      res = [
        ...categories,
        {
          categoryName: `${type}`,
          dataOrientation: "",
          race: "",
          geography: [],
        },
      ];
    } else if (changeType === "remove") {
      res = categories.slice(0, -1); // returns an array
    }
    setCategories(res);
  };

  const handleContentChange = (type, payload, ctType = "first") => {
    let newCategories = [...categories];
    // same categories and diff categories
    if (categories.length === 0) throw new Error("Modifying empty categories");

    if (isDuplicate !== "") {
      // there is duplication
      const dupIndex = ctType === "first" ? 0 : 1; // ctType if content change is from first or 2nd same category content

      newCategories[dupIndex] = {
        ...newCategories[dupIndex],
        ...payload,
      };
    } else {
      // payload be the {property: value} object
      const catMapFunction = (cat) =>
        cat.categoryName === type ? { ...cat, ...payload } : cat;
      newCategories = categories.map(catMapFunction);
    }

    setCategories(newCategories);
  };

  return (
    <ListGroup id="sidebarNavigation" key="List-Group">
      <ListGroup.Item
        key="label-1"
        className="category-info-select-max-list-group-item"
      >
        Select max. 2 categories
      </ListGroup.Item>
      {listOptions.map(
        ({ key, showCollapse, label, borderLeftColor }, keyIdx) => {
          return (
            <React.Fragment key={key}>
              <ListGroup.Item
                variant={showCollapse ? `light` : `secondary`}
                className={`${
                  showCollapse ? `border-left-${borderLeftColor}` : ``
                }`}
              >
                {/* sidebar collapse toggle */}
                <CollapseToggle
                  handleCollapseToggle={handleCollapseToggle}
                  showCollapse={showCollapse}
                  type={key}
                  label={label}
                  length={categories.length}
                  categories={categories}
                  handleIsDuplicate={() => {
                    const len = categories.length;
                    if (len < 2) {
                      setIsDuplicate(key);
                      handleSameCategory(key, "add");
                    }
                  }}
                  isDuplicate={isDuplicate}
                  handleSameCategory={handleSameCategory}
                />
                {/* sidebar collapse content */}
                <CollapseContent
                  showCollapse={showCollapse}
                  type={key}
                  handleContentChange={handleContentChange}
                />
              </ListGroup.Item>
              {isDuplicate === key && (
                <ListGroup.Item
                  variant={showCollapse ? `light` : `secondary`}
                  className={`${
                    showCollapse ? `border-left-${borderLeftColor}` : ``
                  }`}
                >
                  <CollapseToggle
                    handleCollapseToggle={handleCollapseToggle}
                    showCollapse={showCollapse}
                    type={key}
                    label={label}
                    length={categories.length}
                    categories={categories}
                    isDuplicate={isDuplicate}
                    ctType="second"
                    handleIsDuplicate={() => {
                      // Different function for original category and duplicate
                      // only has remove button for duplicate category
                      const len = categories.length;
                      if (len === 2) {
                        setIsDuplicate(""); // empty string -> no more duplicates
                        handleSameCategory(key, "remove");
                      }
                    }}
                  />

                  {/* sidebar collapse content */}
                  <CollapseContent
                    showCollapse={showCollapse}
                    type={key}
                    handleContentChange={handleContentChange}
                    ctType="second"
                  />
                </ListGroup.Item>
              )}
            </React.Fragment>
          );
        }
      )}
    </ListGroup>
  );
};

export default Sidebar;
