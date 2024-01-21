import { GeographyEnum } from "./enum";
import { Category, GeoCategory, GeoFilterType, Geography } from "./types";

export const mockCategories: Category[] = [
    {
      id: "b904a165-e6c7-46ee-9277-73d4a7b82e24",
      name: "Supplemental Nutrition Assistance Program"
    },
    {
      id: "fb8454a3-890a-4af6-adb4-bed396e5e233",
      name: "Population Estimates"
    },
    {
      id: "8d19ffef-d222-4950-bae2-9bd8e51c8724",
      name: "Employment Status"
    },
    {
      id: "8b51331f-b746-44dd-913e-06e31ef74801",
      name: "COVID 19 Deaths"
    }
];



export const mockGeoCategories : GeoCategory[] = [
    { 
        geography: {id: "2", name: "New York", shortName: "NY", type: GeographyEnum.STATE }, 
        categories: [ mockCategories[1], mockCategories[3]] 
    },
    { 
        geography: {id: "4", name: "Texas", shortName: "TX", type: GeographyEnum.STATE }, 
        categories: [ mockCategories[0], mockCategories[1]] 
    },
    { 
        geography: {id: "6", name: "California", shortName: "CA", type: GeographyEnum.STATE }, 
        categories: [ mockCategories[0], mockCategories[1], mockCategories[2]] 
    },
    { 
        geography: {id: "8", name: "Florida", shortName: "FL", type: GeographyEnum.STATE }, 
        categories: [ mockCategories[1], mockCategories[2], mockCategories[3]] 
    }
];

export const mockCounties : Geography[] = [
    { id: "2", name: "Flushing", type: GeographyEnum.CITY},
    { id: "4", name: "Astoria", type: GeographyEnum.CITY},
    { id: "6", name: "Forest Hills", type: GeographyEnum.CITY},
    { id: "8", name: "Kew Gardens", type: GeographyEnum.CITY}
];

export const mockFilterOptions: GeoFilterType[] = [
    { type: GeographyEnum.COUNTY, subTypes: [GeographyEnum.CITY, GeographyEnum.COUNTY_SUBDIVISION, GeographyEnum.CENSUS_TRACT] },
    { type: GeographyEnum.CITY, subTypes: [GeographyEnum.ZIPCODE] },
    { type: GeographyEnum.COUNTY_SUBDIVISION, subTypes: [GeographyEnum.CENSUS_TRACT, GeographyEnum.ZIPCODE] },
    { type: GeographyEnum.CENSUS_TRACT, subTypes: [GeographyEnum.ZIPCODE] },
];