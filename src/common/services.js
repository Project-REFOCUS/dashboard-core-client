import { PERIOD_MAP } from './constants';
import { getDateNDaysAgo, toStatesParam } from './utils';

const handleJsonResponse = response => response.json();

export const getListOfStates = () =>
    window.fetch('/dashboard-service/geography/states')
        .then(handleJsonResponse)
        .then(results => results.map(state => ({ label: state.name, value: state.shortName })));

export const getRaceEthnicityCategories = () =>
    window.fetch('/dashboard-service/ethnicity')
        .then(handleJsonResponse)
        .then(results => results.map(ethnicity => ({ label: ethnicity.name, value: ethnicity.id })));

const getCovidCasesData = ({ startDate, orientation, states }) =>
    window.fetch(`/dashboard-service/covid/cases?startDate=${startDate}&orientation=${orientation}&states=${toStatesParam(states)}`)
        .then(handleJsonResponse);

const getCovidDeathsData = ({ startDate, orientation }) =>
    window.fetch(`/dashboard-service/covid/deaths?startDate=${startDate}&orientation=${orientation}&states`)
        .then(handleJsonResponse);

const getCovidTestsData = ({ startDate, orientation }) =>
    window.fetch(`/dashboard-service/covid/tests?startDate=${startDate}&orientation=${orientation}&states`)
        .then(handleJsonResponse);

const getCovidVaccinationsData = ({ startDate, subCategory, orientation }) =>
    window.console.log(`/dashboard-service/covid/vaccinations?startDate=${startDate}&orientation=${orientation}&subCategory=${subCategory}`);

const categoryServicesMap = {
    cases: getCovidCasesData,
    deaths: getCovidDeathsData,
    tests: getCovidTestsData,
    vaccinations: getCovidVaccinationsData
};

export const getDataFromQuery = query => {
    const { period } = query;
    const startDate = /^last\d{1,3}Days$/.test(period.value) ? getDateNDaysAgo(PERIOD_MAP[period.value]) : period.value;
    return Promise.all(query.categories.map(category => {
        const { name, ...data } = category;
        return categoryServicesMap[name]({ startDate, ...data});
    }));
};
