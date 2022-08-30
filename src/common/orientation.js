export const getDataOrientationOptions = name => ([
    {
        value: 'daily' + name,
        label: 'Daily ' + name
    },
    {
        value: 'daily' + name + 'Per100k',
        label: 'Daily ' + name + ' per 100K population'
    },
    {
        value: 'daily' + name + '7dayAvg',
        label: 'Daily ' + name + ' 7 day rolling average'
    },
    {
        value: 'daily' + name + '14dayAvg',
        label: 'Daily ' + name + ' 14 day rolling average'
    },
    {
        value: 'cumulative' + name,
        label: 'Cumulative ' + name
    }
]);
