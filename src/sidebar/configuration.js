import {
    getDataOrientationOptionsForCases,
    getDataOrientationOptionsForDeaths,
    getDataOrientationOptionsForTests,
    getSubCategoryOptionsForVaccines,
    getDataOrientationOptionsForVaccines,
    getDataOrientationOptionsForPoliceShootings
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
    /* *
    {
        id: 'police_shootings',
        name: 'police_shootings',
        label: 'Police shootings',
        color: 'orange',
        dropdowns: [
            {
                id: 'orientation',
                label: 'Data orientation',
                options: getDataOrientationOptionsForPoliceShootings
            },
            raceEthnicityDropdown
        ],
        duplicated: thisItem => ({
            ...thisItem,
            color: 'grey-3',
            id: duplicateId(thisItem.id)
        })
    }
    /* */
];
