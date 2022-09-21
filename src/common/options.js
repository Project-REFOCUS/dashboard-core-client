const sortOrder = (a, b) => a.order - b.order;
const mappedOrientation = ({ label, value }) => ({ label, value });

const getBaseDataOrientationOptions = id => ([
    { label: `Cumulative ${id}`, value: 'cumulative', order: 5 },
    { label: `Daily ${id}`, value: 'daily', order: 10 },
    { label: `Daily ${id} 7-day rolling average`, value: 'daily7DayAvg', order: 15 },
    { label: `Daily ${id} 14-day rolling average`, value: 'daily14DayAvg', order: 20 },
    { label: `Percent change in daily ${id} over 7 days`, value: 'percentChangeInDailyOver7', order: 25 },
    { label: `Percent change in daily ${id} over 14 days`, value: 'percentChangeInDailyOver14', order: 30 }
]);

export const getDataOrientationOptionsForCases = () =>
    getBaseDataOrientationOptions('cases').concat([
        { label: 'Daily cases 7-day rolling average per 100K population', value: 'daily7DayAvgPer100K', order: 21 },
        { label: 'Daily cases 14-day rolling average per 100K population', value: 'daily14DayAvgPer100K', order: 22 }
    ]).sort(sortOrder).map(mappedOrientation);

export const getDataOrientationOptionsForDeaths = () =>
    getBaseDataOrientationOptions('deaths').concat([
        { label: 'Mortality rate (death rate)', value: 'mortalityRate', order: 31 },
        { label: 'Mortality rate over 7 days', value: 'mortalityRateOver7Days', order: 32 },
        { label: 'Mortality rate over 14 days', value: 'mortalityRateOver14Days', order: 33 },
        // { label: 'Percent change in mortality rate', value: 'percentChangeInMortalityRate', order: 34 },
        // { label: 'Percent change in mortality rate over 7 days', value: 'percentChangeInMortalityRateOver7', order: 35 },
        // { label: 'Percent change in mortality rate over 14 days', value: 'percentChangeInMortalityRateOver14', order: 36 }
    ]).sort(sortOrder).map(mappedOrientation);

export const getDataOrientationOptionsForTests = () =>
    getBaseDataOrientationOptions('tests').concat([
        { label: 'Positivity rate', value: 'positivityRate', order: 31 },
        { label: 'Positivity rate 7-day rolling average', value: 'positivityRate7DayAvg', order: 32 },
        { label: 'Positivity rate 14-day rolling average', value: 'positivityRate14DayAvg', order: 33 },
        { label: 'Percent change in positivity rate', value: 'percentChangeInPositivityRate', order: 34 },
        { label: 'Percent change in positivity rate over 7 days', value: 'percentChangeInPositivityRateOver7', order: 35 },
        { label: 'Percent change in positivity rate over 14 days', value: 'percentChangeInPositivityRateOver14', order: 36 }
    ]).sort(sortOrder).map(mappedOrientation);

export const getSubCategoryOptionsForVaccines = () => ([
    { label: 'Distributed vaccines', value: 'distributed', category: 'distributed vaccines' },
    { label: 'Administered vaccines', value: 'administered', category: 'administered vaccines' },
    { label: 'Administered One dose vaccines', value: 'administeredOneDose', category: 'one dose administered vaccines' },
    { label: 'Administered Two dose vaccines', value: 'administeredTwoDose', category: 'two dose administered vaccines' }
]);

export const getDataOrientationOptionsForVaccines = ({ category: id, value }) =>
    getBaseDataOrientationOptions(id).concat([
        { label: `Daily ${id} vaccinations 7-day rolling average per 100K population`, value: 'daily7DayAvgPer100K', order: 21 },
        { label: `Daily ${id} vaccinations 14-day rolling average per 100K population`, value: 'daily14DayAvgPer100K', order: 22 }
    ]).concat(
        ['administered vaccines', 'one dose administered vaccines', 'two dose administered vaccines'].includes(id)
            ? [{ label: `Percent of population with ${id}`, value: `${value}PercentOfPopulation`, order: 31 }]
            : []
    ).sort(sortOrder).map(mappedOrientation);

export const getDataOrientationOptionsForPoliceShootings = () => ([
    { label: 'Cumulative shootings', value: 'cumulative' }
]);
