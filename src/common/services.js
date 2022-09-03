import { PERIOD_MAP } from './constants';
import { getDateNDaysAgo } from './utils';

const handleJsonResponse = response => response.json();

export const getListOfStates = () =>
    window.fetch('/dashboard-service/geography/states')
        .then(handleJsonResponse)
        .then(results => results.map(state => ({ label: state.name, value: state.shortName })));

export const getRaceEthnicityCategories = () =>
    window.fetch('/dashboard-service/ethnicity')
        .then(handleJsonResponse)
        .then(results => results.map(ethnicity => ({ label: ethnicity.name, value: ethnicity.id })));

const getCovidCasesData = ({ startDate, orientation }) =>
    window.console.log(`/dashboard-service/covid/cases?startDate=${startDate}&orientation=${orientation}`);

const getCovidDeathsData = ({ startDate, orientation }) =>
    window.console.log(`/dashboard-service/covid/deaths?startDate=${startDate}&orientation=${orientation}`);

const getCovidTestsData = ({ startDate, orientation }) =>
    window.console.log(`/dashboard-service/covid/tests?startDate=${startDate}&orientation=${orientation}`);

const getCovidVaccinationsData = ({ startDate, subCategory, orientation }) =>
    window.console.log(`/dashboard-service/covid/vaccinations?startDate=${startDate}&orientation=${orientation}&subCategory${subCategory}`);

const categoryServicesMap = {
    cases: getCovidCasesData,
    deaths: getCovidDeathsData,
    tests: getCovidTestsData,
    vaccinations: getCovidVaccinationsData
};

export const getDataFromQuery = query => {
    const { period } = query;
    const startDate = getDateNDaysAgo(PERIOD_MAP[period.value]);
    query.categories.forEach(category => {
        const { name, orientation } = category;
        categoryServicesMap[name]({ startDate, orientation });
    });
};

export const getDailyCasesByState = states => {
    window.fetch('/dashboard-service/covid/cases?states=' + states)
        .then(handleJsonResponse)
        .then(results => {
            const dailyCasesByDate = results.reduce((casesByDate, value) => {
                if (casesByDate.get(value.date)) {
                    casesByDate.set(value.date, 0);
                }
                casesByDate.set(value.date, casesByDate.get(value.date) + value.cases);

                return casesByDate;
            });
            return [...dailyCasesByDate].map(([date, value]) => ({ date, value }));
        });
};
