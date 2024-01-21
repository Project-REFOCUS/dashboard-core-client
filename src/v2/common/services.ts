import { GeographyEnum } from "./enum";
import { Category, GeoCategory, GeoFilterType, Geography } from "./types";
import { mockCategories, mockCounties, mockFilterOptions, mockGeoCategories } from "./mockData";

export  const getIndicatorCategories : () => Promise<Category[]> = () => {
    return new Promise((resolve) => {
        resolve(mockCategories);
    });
};

export const getListOfStatesWithCategory : () => Promise<GeoCategory[]> = () =>
    new Promise<GeoCategory[]> ((resolve) => {
        resolve(mockGeoCategories);
    });


export const getListOfCounties : (state : Geography) => Promise<Geography[]> = (state) => {
    return new Promise<Geography[]>((resolve) => {
        const counties : Geography[] = [
            { id: "2", name: "Westchester", type: GeographyEnum.COUNTY},
            { id: "4", name: "Brooklyn", type: GeographyEnum.COUNTY},
            { id: "6", name: "Manhattan", type: GeographyEnum.COUNTY},
            { id: "8", name: "Albany", type: GeographyEnum.COUNTY}
        ];
        resolve(counties);
    });
};

export const getSubGeographiesByGeographyAndType : (state: Geography, geography : Geography, type : GeographyEnum) => Promise<Geography[]> = 
    (state, geography, type) => {
    return new Promise((resolve) => {
        resolve(mockCounties);
    });
};


export const getGeographyDropdownOptions = (geoType : GeographyEnum) => {
    // find by id
    const foundItem = mockFilterOptions.find(item => item.type === geoType);
    return foundItem ? foundItem.subTypes : [];
}
