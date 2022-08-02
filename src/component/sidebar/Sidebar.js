import React, { useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
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
];

const Sidebar = ({ setCategories, categories }) => {
  const [listOptions, setListOptions] = useState(ListGroupOptions);
  const [isDuplicate, setIsDuplicate] = useState("");

  const handleCollapseToggle = (type) => {
    if (
      (categories.length === 2 &&
        categories.some((value) => {
          return value.categoryName === type;
        })) ||
      categories.length < 2
    ) {
      setListOptions(
        listOptions.map((listItem) => {
          const showCollapse = !listItem.showCollapse;

          if (listItem.key === type) {
            setCategories(
              showCollapse
                ? [
                    ...categories,
                    {
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

            return { ...listItem, showCollapse: !listItem.showCollapse };
          }
          return listItem;
        })
      );
    } else alert("Maximum categories are at 2. Over the limit");
  };

  const handleSameCategory = (type, changeType) => {
    let res;
    if (changeType === "add") {
      res = [
        ...categories,
        {
          categoryName: `${type}1`,
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

  const handleDataOrientationChange = (type, value) => {
    setCategoryData(type, { dataOrientation: value });
  };

  const handleRaceChange = (type, value) => {
    setCategoryData(type, { race: value });
  };

  const handleGeographyChange = (type, value) => {
    setCategoryData(type, { geography: value });
  };

  function setCategoryData(type, objectData) {
    setCategories(
      categories.map((category) => {
        if (category.categoryName === type)
          return { ...category, ...objectData };

        return category;
      })
    );
  }

  return (
    <ListGroup id="sidebarNavigation" className="overflow-hidden">
      <ListGroup.Item className="category-info-select-max-list-group-item">
        Select max. 2 categories
      </ListGroup.Item>
      {listOptions.map((listGroupItem) => {
        return (
          <ListGroup.Item
            key={listGroupItem.key}
            variant={listGroupItem.showCollapse ? `light` : `secondary`}
            className={`${
              listGroupItem.showCollapse
                ? `border-left-${listGroupItem.borderLeftColor}`
                : ``
            }`}
          >
            {/* sidebar collapse toggle */}
            <CollapseToggle
              handleCollapseToggle={handleCollapseToggle}
              showCollapse={listGroupItem.showCollapse}
              type={listGroupItem.key}
              label={listGroupItem.label}
              length={categories.length}
              categories={categories}
              handleIsDuplicate={() => {
                const len = categories.length;
                if (len < 2) {
                  setIsDuplicate(listGroupItem.key);
                  handleSameCategory(listGroupItem.key, "add");
                }
              }}
              isDuplicate={isDuplicate}
              handleSameCategory={handleSameCategory}
            />

            {/* sidebar collapse content */}
            <CollapseContent
              showCollapse={listGroupItem.showCollapse}
              type={listGroupItem.key}
              handleDataOrientationChange={handleDataOrientationChange}
              handleRaceChange={handleRaceChange}
              handleGeographyChange={handleGeographyChange}
            />
            {/* sidebar duplicate toggle */}
            {isDuplicate === listGroupItem.key && (
              <>
                <CollapseToggle
                  handleCollapseToggle={handleCollapseToggle}
                  showCollapse={listGroupItem.showCollapse}
                  type={listGroupItem.key}
                  label={listGroupItem.label}
                  length={categories.length}
                  categories={categories}
                  isDuplicate={isDuplicate}
                  ctType="second"
                  handleIsDuplicate={() => {
                    // Different function for original category and duplicate
                    // only has remove button for duplicate category
                    const len = categories.length;
                    if (len === 2) {
                      setIsDuplicate(ListGroupItem.key);
                      handleSameCategory(listGroupItem.key, "remove");
                    }
                  }}
                />

                {/* sidebar collapse content */}
                <CollapseContent
                  showCollapse={listGroupItem.showCollapse}
                  type={listGroupItem.key}
                  handleDataOrientationChange={handleDataOrientationChange}
                  handleRaceChange={handleRaceChange}
                  handleGeographyChange={handleGeographyChange}
                />
              </>
            )}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default Sidebar;
