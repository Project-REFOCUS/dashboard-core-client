import { GeographyEnum } from "./enum";
import { Category, Geography, GraphResource } from "./types";
import axios from 'axios';
import { nameSort, toCamelCase } from "./utils";
import { filterOptionsMenu } from "./constants";

export const fetchIndicatorCategories = async() : Promise<Category[]> => {
    try {
        const response = await axios.get(`/dashboard-service/categories`);
        const formattedData = response.data.sort(nameSort);
        return formattedData;
    } catch (error) {
        console.error('Error fetching all categories:', error);
        throw error;
    }
};

export const fetchCategoriesByState  = async(state : Geography) : Promise<Category[]> => {
    
    try {
        const response = await axios.get(`/dashboard-service/categories?stateIds=${deconstructStateId(state.id)}`);
        console.debug(`DEbugging response: ${JSON.stringify(response)}`);
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
        const response = await axios.get(`/dashboard-service/geography?categoryId=${categoryId}`);
        const formattedData = response.data.sort(nameSort);
        return formattedData;
    } catch (error) {
        console.error('Error fetching states with given category id: ' + categoryId, error);
        throw error;
    }
};

export const fetchAllStates = async() : Promise<Geography[]> => {
    try {
        const response = await axios.get(`/dashboard-service/geography/states`);
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
        const response = await axios.get(`/dashboard-service/geography?categoryId=${categoryId}&geographyId=${parentId}&geographyType=${toCamelCase(childType)}`);
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

        // console.log("Legend map contains: " + JSON.stringify(legendMap));
        return legendMap;

    } catch (error) {
        console.error(`Error creating SubGeographiesLegendMap for parent ${parentType}'s with parentId: {${parentId}} and categoryId: {${categoryId}}`, error);
        throw error;
    }
};

export const fetchGraphUrl = async(categoryId: string | undefined, type: GeographyEnum | undefined, targets: Geography[]) : Promise<GraphResource[]> => {
    try {
        if(!categoryId || !type){
            throw new Error();
        }
        const targetIdArray : string[] = targets.map((target => target.id));
        const targetIdsFormatted = targetIdArray.join(",");

        const response = await axios.get(`/dashboard-service/graph?categoryId=${categoryId}&geographyType=${toCamelCase(type)}&geographyIds=${targetIdsFormatted}`);
        // console.log("Graph response looks like"+JSON.stringify(response));
        return response.data;
        
    } catch (error) {
        console.error(`Error fetching graph dashboard url with categoryId: {${categoryId}} type: ${type} and targets: ${JSON.stringify(targets)}`, error);
        throw error;
    }
};

export const getGeographyDropdownOptions = (geoType : GeographyEnum) => {
    const foundItem = filterOptionsMenu.find(item => item.type === geoType);
    return foundItem ? foundItem.subTypes : [];
}