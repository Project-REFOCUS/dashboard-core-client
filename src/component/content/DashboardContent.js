import React, { useEffect, useState } from 'react';
import { Row, Col, Stack, Image, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import { ChevronRight } from 'react-bootstrap-icons';
import ReactSelect, { components } from 'react-select';

import Sidebar from '../sidebar/Sidebar';
import EmptyDataImg from '../../empty_data_img.png';

import { fontStyles, customFontStyles } from '../customFontStyleHelper';

import './DashboardContentStyles.scss';
import '../customStyles.scss';


const selectPeriod = [ 
  {
    value: "last30days",
    label: "Last 30 days"
  },
  {
    value: "last90days",
    label: "Last 90 days"
  },
  {
    value: "last365days",
    label: "Last 365 days"
  },
  {
    value: "fromJanuary2020",
    label: "From January 2020"
  }
];

const PeriodMenuListComponent = ({ selectProps, ...props }) => {
  return(
    <>
      <components.MenuList {...props} selectProps={selectProps}>
        { props.children }
      </components.MenuList>
    </>
  )
}

const DashboardContent = ({ setTabData, tabData, tabDataAll }) => {
  const [ categories, setCategories ] = useState([]);
  const [ messageText, setMessageText ] = useState("");
  
  const handlePeriodChange = (selected) => {
    setTabData(
      tabDataAll.map((tab) => {
        if(tab.tabKey === tabData.tabKey){
          return { ...tab, dataPeriod: selected.value }
        }

        return tab;
      })
    );
  };

  useEffect(
    () => {
      setTabData(
        tabDataAll.map((tab) => {
          if(tab.tabKey === tabData.tabKey){
            return { ...tab, categories: categories }
          }

          return tab;
        })
      );
    }
    ,[ categories ]
  );

  useEffect(
    () => {
      console.log("Tab data --- ", JSON.stringify(tabData));
      setMessageText(JSON.stringify(tabData));
    }
    , [tabData]
  );

  function dataPeriodText(dataPeriod){
    switch(dataPeriod){
      case 'last30days': return 'in the last 30 days.';
      case 'last90days': return 'in the last 90 days.';
      case 'last365days': return 'in the last 365 days.';
      case 'fromJanuary2020': return 'from January 2020';
    }

    return '';
  }

  function dataCategoryText(dataCategory){
    let text = '';

    dataCategory.map(
      (dataCategory) => {

    });
  }

  function dataOrientationText(dataOrientation){
    switch(dataOrientation){
      case 'dailyPer100k': return 'daily per 100,000';
      case 'weeklyPer100k': return 'weekly per 100,000';
      case 'monthlyPer1M': return 'monthly per 1,000,000';
    }

    return '';
  }

  function raceText(race){
    switch(race){
      case 'all': return 'in all races';
      case 'race1': return 'to race 1';
      case 'race2': return 'to race 2';
    }
    
    return '';
  }

  return(
    <>
      <div className="container-fluid g-sm-0 py-lg-0 py-sm-2 py-md-2">
        <Row id="dataInfoContainer"
          className="g-0 d-flex justify-content-md-center align-items-md-center flex-md-row">
          <Col xl={ 9 } 
            lg={ 8 }
            md={ 7 }
            xs={ 12 }
            className="mb-sm-2">
            <div id="dataInfoText" className="text-wrap text-break">{ messageText }</div>
          </Col>
          <Col 
            xl={ 3 }
            lg={ 4 }
            md={ 5 }
            xs={ 12 }
            className="g-0">
            <div className="pl-lg-0 pe-lg-3">
              <Form.Label className="mb-0">Period: </Form.Label>
              <ReactSelect
                options={ selectPeriod }
                defaultValue={ selectPeriod[0] }
                isDisabled={ categories.length === 0 }
                isSearchable={ false }
                components={{
                  MenuList: PeriodMenuListComponent
                }}
                styles={{
                  control: (base, state) => ({
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
                    padding: "0px 8px"
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
                    ...customFontStyles({ ...fontStyles, color: "#B2BEC3" }),
                  })
                }}
                onChange={ handlePeriodChange }
                placeholder="Period: "
              />
            </div>
          </Col>
        </Row>
      </div>
      <Row className="g-0">
        <Col id="sidebar-container"
          className="mb-sm-4 mb-4 mb-lg-0"
          xl={ 2 }
          lg={ 3 }>
          <Sidebar
            setCategories={ setCategories }
            categories={ categories }
          />
        </Col>
        <Col className="mb-sm-4 mb-4" 
          xl={ 10 }
          lg={ 9 }>
          <div className="px-lg-3">
            <Stack 
              className="d-flex justify-content-center align-items-center"
              style={{
                height: "540px",
                border: "1px solid #DFE6E9",
                borderRadius: "4px"
              }}>
              <div className="d-flex justify-content-center align-items-center ellipse-style-1">
                <Image
                src={ EmptyDataImg }
                alt="empty-data-pic"
                className="m-auto d-block" />
              </div>
              <p className="mt-2 paragraph-style-1">Select COVID-19 category to start</p>
            </Stack>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default DashboardContent;