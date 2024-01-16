import { GeographyEnum } from "./enum";
import { Category, GeoCategory, GeoFilterType, Geography } from "./types";

const categories : Category[] = [
    { id: "2341", name: "OSHA Complaints"},
    { id: "2342", name: "Covid Death"},
    { id: "2343", name: "Covid Test"},
    { id: "2344", name: "Covid Vaccination"}
];

export  const getIndicatorCategories : () => Promise<Category[]> = () => {
    // window.fetch("/dashboard-service/dundas/categories")
    //     .then(response => response.json());
    return new Promise((resolve) => {
        resolve(categories);
    });
};

export const getListOfStatesWithCategory : () => Promise<GeoCategory[]> = () =>
    new Promise<GeoCategory[]> ((resolve) => {
        const states : GeoCategory[] = [
            { geography: {id: "2", name: "New York", shortName: "NY", type: GeographyEnum.STATE }, categories: [ categories[1], categories[3]] },
            { geography: {id: "4", name: "Texas", shortName: "TX", type: GeographyEnum.STATE }, categories: [ categories[0], categories[1]] },
            { geography: {id: "6", name: "California", shortName: "CA", type: GeographyEnum.STATE }, categories: [ categories[0], categories[1], categories[2]] },
            { geography: {id: "8", name: "Florida", shortName: "FL", type: GeographyEnum.STATE }, categories: [ categories[1], categories[2], categories[3]] },
        ];
        resolve(states);
    });


export const getListOfCounties : (state : Geography) => Promise<Geography[]> = (state) => {
    return new Promise<Geography[]>((resolve) => {
        const states : Geography[] = [
            { id: "2", name: "Westchester", type: GeographyEnum.COUNTY},
            { id: "4", name: "Brooklyn", type: GeographyEnum.COUNTY},
            { id: "6", name: "Manhattan", type: GeographyEnum.COUNTY},
            { id: "8", name: "Albany", type: GeographyEnum.COUNTY}
        ];
        resolve(states);
    });
};

//location should be a list each narrowing down location.
//New York, Manhattan, Hell"s Kitchen, 11213
//state, county, filter{city, county subdiv, census tract}
//state, county, county subdiv, filter{zipcode, census tract}
export const getSubGeographiesByGeographyAndType : (geography : Geography, type : GeographyEnum) => Promise<Geography[]> = 
(geography, type) => {
    return new Promise((resolve) => {
        const cities : Geography[] = [
            { id: "2", name: "Flushing", type: GeographyEnum.CITY},
            { id: "4", name: "Astoria", type: GeographyEnum.CITY},
            { id: "6", name: "Forest Hills", type: GeographyEnum.CITY},
            { id: "8", name: "Kew Gardens", type: GeographyEnum.CITY}
        ];
        resolve(cities);
    });
};

//this will get replaced with a api call that gets the available options for a
//given geography and type
const filterOptions: GeoFilterType[] = [
    { type: GeographyEnum.COUNTY, subTypes: [GeographyEnum.CITY, GeographyEnum.COUNTY_SUBDIVISION, GeographyEnum.CENSUS_TRACT] },
    { type: GeographyEnum.CITY, subTypes: [GeographyEnum.ZIPCODE] },
    { type: GeographyEnum.COUNTY_SUBDIVISION, subTypes: [GeographyEnum.CENSUS_TRACT, GeographyEnum.ZIPCODE] },
    { type: GeographyEnum.CENSUS_TRACT, subTypes: [GeographyEnum.ZIPCODE] },
];

export const getGeographyDropdownOptions = (geoType : GeographyEnum) => {
    // find by id
    const foundItem = filterOptions.find(item => item.type === geoType);
    return foundItem ? foundItem.subTypes : [];
}
