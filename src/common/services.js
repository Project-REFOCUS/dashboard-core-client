const handleJsonResponse = response => response.json();

export const getListOfStates = () =>
    window.fetch('/dashboard-service/geography/states')
        .then(handleJsonResponse)
        .then(results => results.map(state => ({ label: state.name, value: state.shortName })));

export const getRaceEthnicityCategories = () =>
    window.fetch('/dashboard-service/ethnicity')
        .then(handleJsonResponse)
        .then(results => results.map(ethnicity => ({ label: ethnicity.name, value: ethnicity.id })));
