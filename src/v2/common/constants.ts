import { GeographyEnum } from './enum';
import { DateDelta, GeoFilterType } from './types';

export const dateRanges : DateDelta[] = [
    { x: {month: 'January', year: '2023'}, y: {month: 'December', year: '2023'}},
    { x: {month: 'January', year: '2022'}, y: {month: 'December', year: '2022'}},
    { x: {month: 'January', year: '2021'}, y: {month: 'December', year: '2021'}},
    { x: {month: 'January', year: '2020'}, y: {month: 'December', year: '2020'}},
]

export const filterOptionsMenu: GeoFilterType[] = [
    { type: GeographyEnum.COUNTY, subTypes: [GeographyEnum.CITY, GeographyEnum.CENSUS_TRACT] },
    { type: GeographyEnum.CITY, subTypes: [GeographyEnum.ZIPCODE] },
    { type: GeographyEnum.CENSUS_TRACT, subTypes: [GeographyEnum.BLOCK_GROUP] },
];

export const filterOptionsMap = new Map([
    [GeographyEnum.COUNTY, [GeographyEnum.CITY, GeographyEnum.CENSUS_TRACT]],
    [GeographyEnum.CITY, [GeographyEnum.ZIPCODE]],
    [GeographyEnum.CENSUS_TRACT, [GeographyEnum.BLOCK_GROUP]],
]);