import {
    getDataOrientationOptionsForCases,
    getDataOrientationOptionsForDeaths,
    getDataOrientationOptionsForTests,
    getSubCategoryOptionsForVaccines,
    getDataOrientationOptionsForVaccines,
    getDataOrientationOptionsForPoliceShootings,
    getSecondaryCategoriesForCovidBehindBars
} from '../common/options';
import {getListOfStates, getRaceEthnicityCategories} from '../common/services';

const geographyDropdown = {
    id: 'states',
    label: 'Geography',
    optionsPromise: getListOfStates,
    isMulti: true
};

const raceEthnicityDropdown = {
    id: 'ethnicity',
    label: 'Race / ethnicity',
    optionsPromise: getRaceEthnicityCategories,
    isMulti: true
};

const createDuplicate = color => {
    return thisItem => ({
        ...thisItem,
        color,
        id: duplicateId(thisItem.id)
    })
};

export const duplicateId = id => `${id}-duplicated`;

export default [
    {
        id: 'cases',
        name: 'cases',
        label: 'Cases',
        color: 'hot-pink',
        dropdowns: [
            {
                id: 'orientation',
                label: 'Data orientation',
                options: getDataOrientationOptionsForCases
            },
            raceEthnicityDropdown,
            geographyDropdown
        ],
        duplicated: thisItem => ({
            ...thisItem,
            color: 'blue-1',
            id: duplicateId(thisItem.id)
        })
    },
    {
        id: 'deaths',
        name: 'deaths',
        label: 'Deaths',
        color: 'purple',
        dropdowns: [
            {
                id: 'orientation',
                label: 'Data orientation',
                options: getDataOrientationOptionsForDeaths
            },
            raceEthnicityDropdown,
            geographyDropdown
        ],
        duplicated: thisItem => ({
            ...thisItem,
            color: 'red',
            id: duplicateId(thisItem.id)
        })
    },
    {
        id: 'tests',
        name: 'tests',
        label: 'Tests',
        color: 'yellow',
        dropdowns: [
            {
                id: 'orientation',
                label: 'Data orientation',
                options: getDataOrientationOptionsForTests
            },
            geographyDropdown
        ],
        duplicated: thisItem => ({
            ...thisItem,
            color: 'grey-1',
            id: duplicateId(thisItem.id)
        })
    },
    {
        id: 'vaccinations',
        name: 'vaccinations',
        label: 'Vaccinations',
        color: 'green-1',
        dropdowns: [
            {
                id: 'subCategory',
                label: 'Sub-category',
                options: getSubCategoryOptionsForVaccines,
                onChange: dropdowns => dropdowns.set('orientation', null)
            },
            {
                id: 'orientation',
                label: 'Data orientation',
                disabled: dropdowns => !dropdowns.get('subCategory'),
                options: dropdowns => getDataOrientationOptionsForVaccines(dropdowns.get('subCategory')),
            },
            geographyDropdown
        ],
        duplicated: thisItem => ({
            ...thisItem,
            color: 'grey-1',
            id: duplicateId(thisItem.id)
        })
    },
    {
        id: 'shootings',
        name: 'shootings',
        label: 'Police shootings',
        color: 'orange',
        dropdowns: [
            {
                id: 'orientation',
                label: 'Data orientation',
                options: getDataOrientationOptionsForPoliceShootings
            },
            geographyDropdown,
            raceEthnicityDropdown
        ],
        duplicated: thisItem => ({
            ...thisItem,
            color: 'grey-3',
            id: duplicateId(thisItem.id)
        })
    },
    {
        id: 'racismDeclarations',
        name: 'racismDeclarations',
        label: 'Places that have declared racism a public health crisis',
        color: 'grey-2',
        dropdowns: [
            {
                id: 'orientation',
                label: 'Data orientation',
                options: [
                    { label: 'Cumulative declarations', value: 'cumulative'}
                ]
            },
            geographyDropdown
        ],
        duplicated: thisItem => ({
            ...thisItem,
            color: 'blue-3',
            id: duplicateId(thisItem.id)
        })
    },
    {
        id: 'covidBehindBars',
        name: 'covidBehindBars',
        label: 'Covid behind bars',
        color: 'blue-2',
        dropdowns: [
            {
                id: 'primaryCategory',
                name: 'primaryCategory',
                label: 'Personnel',
                options: [
                    { label: 'Residents', value: 'residents' },
                    { label: 'Staff', value: 'staff' }
                ]
            },
            {
                id: 'secondaryCategory',
                name: 'secondaryCategory',
                label: 'Metric',
                disabled: dropdowns => !dropdowns.get('primaryCategory'),
                options: dropdowns => getSecondaryCategoriesForCovidBehindBars(dropdowns.get('primaryCategory')),
            },
            {
                id: 'orientation',
                name: 'orientation',
                label: 'Data orientation',
                disabled: dropdowns => !dropdowns.get('secondaryCategory'),
                options: [
                    { label: 'Cumulative', value: 'cumulative' },
                    { label: 'Daily', value: 'daily' },
                    { label: 'Daily 7-day average', value: 'daily7DayAvg' },
                    { label: 'Daily 14-day average', value: 'daily14DayAvg' }
                ]
            },
            geographyDropdown
        ],
        duplicated: createDuplicate('blue-4')
    },
    {
        id: 'oshaComplaints',
        name: 'oshaComplaints',
        label: 'Osha complaints',
        color: 'black',
        dropdowns: [
            {
                id: 'orientation',
                label: 'Data orientation',
                options: [
                    { label: 'Cumulative', value: 'cumulative' }
                ]
            },
            geographyDropdown
        ],
        duplicated: createDuplicate('green-2')
    }
];
