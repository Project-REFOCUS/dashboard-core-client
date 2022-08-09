import React, { useEffect, useState } from "react";
import { Row, Col, Stack, Image, Form } from "react-bootstrap";
import ReactSelect, { components } from "react-select";

import Sidebar from "../sidebar/Sidebar";
import EmptyDataImg from "../../empty_data_img.png";

import { fontStyles, customFontStyles } from "../customFontStyleHelper";
import {
  isEmptyKeyObject,
  isEqualValue,
  isEmptyString,
} from "../../utility_helpers";
import { stateOptions } from "../../data";
import "react-datepicker/dist/react-datepicker.css";

import "./DashboardContentStyles.scss";
import "../customStyles.scss";

const selectPeriod = [
  {
    value: "last7days",
    label: "Last 7 days",
  },
  {
    value: "last30days",
    label: "Last 30 days",
  },
  {
    value: "last90days",
    label: "Last 90 days",
  },
  {
    value: "last365days",
    label: "Last 365 days",
  },
];

const PeriodMenuComponent = ({ selectProps, ...props }) => {
  return (
    <>
      <components.Menu {...props} selectProps={selectProps}>
        {props.children}
      </components.Menu>
    </>
  );
};
const PeriodOptionComponent = ({ selectProps, ...props }) => {
  return <components.Option {...props} selectProps={selectProps} />;
};

const DashboardContent = ({ setTabData, tabData, tabDataAll }) => {
  const [categories, setCategories] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [periodValue, setPeriodValue] = useState({});

  const handlePeriodChange = (selected) => {
    setPeriodValue(selected);
    setTabData(
      tabDataAll.map((tab) => {
        if (tab.tabKey === tabData.tabKey)
          return { ...tab, dataPeriod: selected.value };

        return tab;
      })
    );
  };

  useEffect(() => {
    setTabData(
      tabDataAll.map((tab) => {
        if (tab.tabKey === tabData.tabKey)
          return { ...tab, categories: categories };

        return tab;
      })
    );
  }, [categories]);

  useEffect(() => {
    let textContainer = null;

    const tabCategories = tabData.categories;

    const { dataPeriod } = tabData;

    if (tabCategories.length === 1) {
      let text = "";

      const { dataOrientation, geography } = tabData.categories[0];

      // text for period, category name, data orientation and race
      text = text + dataTextString(tabData.categories[0]);

      text = text + textGeography(geography); // text for geography

      text = trimText(text);

      textContainer = (
        <>
          {textInfoContainer(text, geography.length)}
          {!isEmptyString(dataPeriod) && ` ${dataPeriodText(dataPeriod)}`}
          {!isEmptyString(dataOrientation) && `.`}
        </>
      );
    } // tabCategories.length === 1
    else if (tabCategories.length === 2) {
      let textContainerInfo = null;

      //if the 2 categories are equal;
      if (isEqualObjects(tabData.categories[0], tabData.categories[1])) {
        let text = "";

        // text for period, category name, data orientation and race
        text = text + dataTextString(tabData.categories[0], 2, true);

        const { geography } = tabData.categories[0];

        text = text + textGeography(geography); // text for geography

        text = trimText(text);
        textContainerInfo = (
          <>
            {textInfoContainer(text, geography.length)}
            {text !== "" &&
              !isEmptyString(dataPeriod) &&
              ` ${dataPeriodText(dataPeriod)}`}
            {text !== "" && `.`}
          </>
        );
      } else {
        let text1 = "";
        let text2 = "";

        const geo1 = tabData.categories[0].geography;
        const geo2 = tabData.categories[1].geography;

        // first tabData category
        text1 = text1 + dataTextString(tabData.categories[0], 2, false);

        text1 = text1 + textGeography(geo1); // text for geography
        text1 = trimText(text1);

        // second tabData category
        text2 = text2 + dataTextString(tabData.categories[1], 2, false);

        text2 = text2 + textGeography(geo2); // text for geography
        text2 = trimText(text2, false);

        textContainerInfo = (
          <>
            {textInfoContainer(text1, geo1.length)}
            {text2 !== "" && ` and `}
            {textInfoContainer(text2, geo2.length)}
            {text1 !== "" &&
              !isEmptyString(dataPeriod) &&
              ` ${dataPeriodText(dataPeriod)}`}
            {text1 !== "" && `.`}
          </>
        );
      }

      textContainer = <>{textContainerInfo}</>;
    }

    setMessageText(textContainer);
  }, [tabData]);

  function textGeography(geography) {
    let text = "";
    if (geography.length > 0) {
      text = text + "in ";
      const tempGeography = getSameLabelGeography(geography, stateOptions);

      text =
        text +
        tempGeography
          .slice(0, geography.length > 8 ? 8 : geography.length)
          .join(", ") +
        " ";
    }

    return text;
  }

  function textInfoContainer(text, length) {
    return (
      <>
        {text}
        {length > 8 && (
          <>
            {` and `}
            <b className="text-decoration-underline text-blue-3">
              ({`${length - 8} more`})
            </b>
          </>
        )}
      </>
    );
  }

  function isEqualObjects(object1, object2) {
    for (let x in object1) {
      if (x === "geography") {
        if (object1[x].length !== object2[x].length) return false;
        else {
          for (let i = 0; i < object1[x].length; ) {
            if (!object2[x].includes(object1[x][i++])) return false;
          }
        }
      } else if (x !== "categoryName") {
        if (!isEqualValue(object1[x], object2[x])) return false;
      }
    }

    return true;
  }

  function getSameLabelGeography(array1, array2) {
    return array1.map((arr1) => {
      let labelVal = "";

      if (
        array2.some((arr2) => {
          if (isEqualValue(arr1, arr2.value)) {
            labelVal = arr2.label;
            return arr2.label;
          }
        }) //some
      ) {
        return labelVal;
      }
    }); // map;
  }

  function dataPeriodText(dataPeriod) {
    switch (dataPeriod) {
      case "last7days":
        return "in the last 7 days";
      case "last30days":
        return "in the last 30 days";
      case "last90days":
        return "in the last 90 days";
      case "last365days":
        return "in the last 365 days";
      case "fromJanuary2020":
        return "from January 2020";
    }

    return "";
  }

  function dataOrientationText(dataOrientation) {
    switch (dataOrientation) {
      case "dailyPer100k":
        return "daily per 100,000";
      case "weeklyPer100k":
        return "weekly per 100,000";
      case "monthlyPer1M":
        return "monthly per 1,000,000";
    }

    return "";
  }

  function raceText(race) {
    switch (race) {
      case "All":
        return "in all races";
      case "race1":
        return "to race 1";
      case "race2":
        return "to race 2";
    }

    return "";
  }

  function dataTextString(
    tabData1,
    tabDataCategoriesLength = 1,
    isEqualObject = false
  ) {
    let text = "";
    const { dataOrientation, race, categoryName } = tabData1;

    let categoryText =
      tabDataCategoriesLength === 2 && isEqualObject
        ? tabData.categories
            .map((cat) => cat.categoryName)
            .join(" and ")
            .toLowerCase()
        : categoryName.toLowerCase();

    if (!isEmptyString(dataOrientation)) {
      text = text + dataOrientationText(dataOrientation) + " ";
      text = text + raceText(race) + " ";
      text = text + categoryText + " ";
    }

    return text;
  }

  function trimText(text, firstPhrase = true) {
    return text !== "" && firstPhrase
      ? (text.charAt(0).toUpperCase() + text.slice(1)).trim()
      : text.trim();
  }

  return (
    <>
      <div className="container-fluid g-sm-0 py-lg-0 py-sm-2 py-md-2">
        <Row
          id="dataInfoContainer"
          className="g-0 d-flex justify-content-md-center align-items-md-center flex-md-row"
        >
          <Col xl={9} lg={8} md={7} xs={12} className="mb-sm-2">
            <div id="dataInfoText" className="text-wrap text-break">
              {messageText}
            </div>
          </Col>
          <Col xl={3} lg={4} md={5} xs={12} className="g-0">
            <div className="pl-lg-0 pe-lg-3">
              <Form.Label className="mb-0">Period: </Form.Label>
              <ReactSelect
                options={selectPeriod}
                isDisabled={categories.length === 0}
                isSearchable={false}
                components={{
                  Menu: PeriodMenuComponent,
                  Option: PeriodOptionComponent,
                }}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    "&:hover": {
                      backgroundColor: "#D3ECFF",
                      cursor: "pointer",
                    },
                    minHeight: "30px",
                  }),
                  indicatorSeparator: (base) => ({
                    ...base,
                    width: 0,
                  }),
                  valueContainer: (base) => ({
                    ...base,
                    padding: "0px 8px",
                  }),
                  singleValue: (base) => ({
                    ...base,
                    ...customFontStyles({ ...fontStyles, color: "#2D3436" }),
                  }),
                  option: (base, state) => ({
                    ...base,
                    ...customFontStyles({ ...fontStyles, color: "#000000" }),
                    backgroundColor: state.isSelected
                      ? "#72BBF4"
                      : base.backgroundColor,
                    "&:hover": {
                      backgroundColor: state.isSelected
                        ? "#086EBE"
                        : base.backgroundColor,
                    },
                  }),
                  placeholder: (base) => ({
                    ...base,
                    ...customFontStyles({ ...fontStyles, color: "#B2BEC3" }),
                  }),
                }}
                onChange={handlePeriodChange}
                value={isEmptyKeyObject(periodValue) ? null : periodValue}
                placeholder="Period: "
              />
            </div>
          </Col>
        </Row>
      </div>
      <Row className="g-0">
        <Col
          id="sidebar-container"
          className="mb-sm-4 mb-4 mb-lg-0"
          xl={2}
          lg={3}
        >
          <Sidebar setCategories={setCategories} categories={categories} />
        </Col>
        <Col className="mb-sm-4 mb-4" xl={10} lg={9}>
          <div className="px-lg-3">
            <Stack
              id="data-content-container"
              className="d-flex justify-content-center align-items-center"
            >
              <div className="d-flex justify-content-center align-items-center ellipse-style-1">
                <Image
                  src={EmptyDataImg}
                  alt="empty-data-pic"
                  className="m-auto d-block"
                />
              </div>
              <p className="mt-2 paragraph-style-1">
                Select COVID-19 category to start
              </p>
            </Stack>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default DashboardContent;
