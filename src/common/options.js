const getBaseDataOrientationOptions = id => ([
    { label: `Cumulative ${id}`, value: 'cumulative' },
    { label: `Daily ${id}`, value: 'daily' },
    { label: `Daily ${id} per 100k population`, value: 'dailyPer100K' },
    { label: `Daily ${id} 7-day rolling average`, value: 'daily7DayAvg' },
    { label: `Daily ${id} 14-day rolling average`, value: 'daily14DayAvg' },
    { label: `Percent change in daily ${id}`, value: 'percentChangeInDaily' },
    { label: `Percent change in daily ${id} over 7 days`, value: 'percentChangeInDailyOver7' },
    { label: `Percent change in daily ${id} over 14 days`, value: 'percentChangeInDailyOver14' }
]);

export const getDataOrientationOptionsForCases = () =>
    getBaseDataOrientationOptions('cases');

export const getDataOrientationOptionsForDeaths = () =>
    getBaseDataOrientationOptions('deaths').concat([
        { label: 'Mortality rate (death rate)', value: 'mortalityRate' },
        { label: 'Percent change in mortality rate', value: 'percentChangeInMortalityRate' },
        { label: 'Percent change in mortality rate over 7 days', value: 'percentChangeInMortalityRateOver7' },
        { label: 'Percent change in mortality rate over 14 days', value: 'percentChangeInMortalityRateOver14' }
    ]);

export const getDataOrientationOptionsForTests = () =>
    getBaseDataOrientationOptions('tests').concat([
        { label: 'Positivity rate', value: 'positivityRate' },
        { label: 'Positivity rate 7-day rolling average', value: 'positivityRate7DayAvg' },
        { label: 'Positivity rate 14-day rolling average', value: 'positivityRate14DayAvg' },
        { label: 'Percent change in positivity rate', value: 'percentChangeInPositivityRate' },
        { label: 'Percent change in positivity rate over 7 days', value: 'percentChangeInPositivityRateOver7' },
        { label: 'Percent change in positivity rate over 14 days', value: 'percentChangeInPositivityRateOver14' }
    ]);

export const getSubCategoryOptionsForVaccines = () => ([
    { label: 'Distributed vaccines', value: 'distributed', category: 'distributed vaccines' },
    { label: 'Administered vaccines', value: 'administered', category: 'administered vaccines' },
    { label: 'Administered One dose vaccines', value: 'administeredOneDose', category: 'one dose administered vaccines' },
    { label: 'Administered Two dose vaccines', value: 'administeredTwoDose', category: 'two dose administered vaccines' }
]);

export const getDataOrientationOptionsForVaccines = ({ category: id, value }) =>
    getBaseDataOrientationOptions(id).concat(
        ['administered vaccines', 'one dose administered vaccines', 'two dose administered vaccines'].includes(id)
            ? [{ label: `Percent of population with ${id}`, value: `${value}PercentOfPopulation`}]
            : []
    );

export const getDataOrientationOptionsForPoliceShootings = () => ([
    { label: 'Cumulative shootings', value: 'cumulative' },
    { label: 'Daily shootings', value: 'daily' }
]);
