import { GeographyEnum, GraphTypeEnum } from "./enum";
import { Category, Geography, GraphResource } from "./types";
import { mockCounties } from "./mockData";
import { API_BASE_URL } from '../config/appConfig';
import axios from 'axios';
import { nameSort, toCamelCase } from "./utils";
import { filterOptionsMenu } from "./constants";

export const fetchIndicatorCategories = async() : Promise<Category[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/dashboard-service/categories`);
        const formattedData = response.data.sort(nameSort);
        return formattedData;
    } catch (error) {
        console.error('Error fetching all categories:', error);
        throw error;
    }
};

export const fetchCategoriesByState  = async(state : Geography) : Promise<Category[]> => {
    
    try {
        const response = await axios.get(`${API_BASE_URL}/dashboard-service/categories?stateIds=${deconstructStateId(state.id)}`);
        const formattedData = response.data.sort(nameSort);
        return formattedData;
    } catch (error) {
        console.error('Error fetching categories with given state id: ' + state.id, error);
        throw error;
    }
};

const deconstructStateId = (id : string) : string => {
    const stateIdIndex = 0;
    const subStrings = id.split('.');
    return subStrings[stateIdIndex];
}

export const fetchStatesByCategory = async(categoryId: string) : Promise<Geography[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/dashboard-service/geography?categoryId=${categoryId}`);
        const formattedData = response.data.sort(nameSort);
        return formattedData;
    } catch (error) {
        console.error('Error fetching states with given category id: ' + categoryId, error);
        throw error;
    }
};

export const fetchAllStates = async() : Promise<Geography[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/dashboard-service/geography/states`);
        const formattedData = response.data.sort(nameSort);

        const geographies = formattedData.map((state : Geography) => {
            state.type = GeographyEnum.STATE;
            return state
        })

        return geographies;
    } catch (error) {
        console.error('Error fetching all states', error);
        throw error;
    }
};

export const fetchSubGeographies = async(categoryId: string | null, parentId: string, childType: GeographyEnum) : Promise<Geography[]> => {
    try {
        if(!categoryId){
            throw new Error();
        }
        const response = await axios.get(`${API_BASE_URL}/dashboard-service/geography?categoryId=${categoryId}&geographyId=${parentId}&geographyType=${toCamelCase(childType)}`);
        const formattedData = response.data.sort(nameSort);

        const geographies = formattedData.map((geography : Geography) => {
            geography.type = childType;
            return geography
        })
        return geographies;
    } catch (error) {
        console.error(`Error fetching ${childType}'s with parentId: {${parentId}} and categoryId: {${categoryId}}`, error);
        throw error;
    }
};

export const fetchSubGeographiesLegendMap = async(categoryId: string | null, parentId: string, parentType: GeographyEnum) : Promise<Map<GeographyEnum,Geography[]>> => {
    try {

        if(!categoryId){
            throw new Error();
        }

        const childTypes : GeographyEnum[] = await getGeographyDropdownOptions(parentType);
        const legendMap : Map<GeographyEnum,Geography[]> = new Map();

        for (const type of childTypes) {
            const subGeographyList = await fetchSubGeographies(categoryId, parentId, type);
            if(subGeographyList.length > 0) {
                legendMap.set(type, subGeographyList);
            }
        }

        console.log("Legend map contains: " + JSON.stringify(legendMap));
        return legendMap;

    } catch (error) {
        console.error(`Error creating SubGeographiesLegendMap for parent ${parentType}'s with parentId: {${parentId}} and categoryId: {${categoryId}}`, error);
        throw error;
    }
};

export const fetchGraphDashboardUrl = async(categoryId: string | undefined, type?: GeographyEnum) : Promise<GraphResource[]> => {
    try {
        if(!categoryId){
            throw new Error();
        }
        const response = await axios.get(`${API_BASE_URL}/dashboard-service/graph?categoryId=${categoryId}${type ? `&geographyType=${toCamelCase(type)}` : "" }`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching graph dashboard url with categoryId: {${categoryId}}`, error);
        throw error;
    }
};

export const fetchGraphUrl = async(dashboardUrl: string, targets: Geography[]) : Promise<string> => {
    try {
        if(!dashboardUrl || dashboardUrl.length === 0){
            throw new Error();
        }
        const targetIdArray : string[] = targets.map((target => target.id));
        const targetIdsFormatted = targetIdArray.join("|");

        return `${dashboardUrl}&$VP_All3Levels=${targetIdsFormatted}`;

    } catch (error) {
        console.error(`Error fetching graph url for iframe with url: {${dashboardUrl}} and targets: ${JSON.stringify(targets)}`, error);
        throw error;
    }
};

// export const fetchGraphUrl = async(dashboardUrl: string, targets: Geography[]) : Promise<string> => {
//     try {
//         if(!dashboardUrl || dashboardUrl.length === 0){
//             throw new Error();
//         }

//         const targetIdArray : string[] = targets.map((target => target.id));
//         const targetIdsFormatted = targetIdArray.join("|");

//         const response = await axios.get(`${dashboardUrl}&$VP_All3Levels=${targetIdsFormatted}`);
//         return response.data;
//     } catch (error) {
//         console.error(`Error fetching graph url for iframe with url: {${dashboardUrl}} and targets: ${JSON.stringify(targets)}`, error);
//         throw error;
//     }
// };

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
    const foundItem = filterOptionsMenu.find(item => item.type === geoType);
    return foundItem ? foundItem.subTypes : [];
}