const handleJsonResponse = response => response.json();

export const getListOfStates = () =>
    window.fetch('/dashboard-service/geography/states')
        .then(handleJsonResponse)
        .then(results => results.map(state => ({ label: state.name, value: state.shortName })));

export const getRaceEthnicityCategories = () =>
    window.fetch('/dashboard-service/ethnicity')
        .then(handleJsonResponse)
        .then(results => results.map(ethnicity => ({ label: ethnicity.name, value: ethnicity.id })));

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
